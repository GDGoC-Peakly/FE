import client from './client';

const SESSION_ERROR_CODES = {
  START_DUPLICATE: 'SESSION_409_001',

  PAUSE_ALREADY_PAUSED: 'SESSION_409_001',
  PAUSE_ALREADY_ENDED: 'SESSION_409_002',

  RESUME_ALREADY_ACTIVE: 'SESSION_409_001',
  RESUME_ALREADY_ENDED: 'SESSION_409_002',
  RESUME_NO_OPEN_INTERVAL: 'SESSION_409_003',

  END_SESSION_ID_MISMATCH: 'SESSION_400_001',
  END_INVALID_FOCUS_TIME: 'SESSION_400_002',
  END_ALREADY_ENDED: 'SESSION_409_001',

  EVALUATE_MISSING_SCORE: 'FEEDBACK400_001',
  EVALUATE_INVALID_SCORE: 'FEEDBACK400_002',
  EVALUATE_NOT_ENDED: 'SESSION_409_001',
  EVALUATE_ALREADY_EVALUATED: 'FEEDBACK409_001',

  DISRUPTION_MISSING_BODY: 'FEEDBACK400_001',
  DISRUPTION_EMPTY_LIST: 'FEEDBACK400_002',
  DISRUPTION_INVALID_ID: 'FEEDBACK400_003',
  DISRUPTION_INACTIVE: 'FEEDBACK400_004',
  DISRUPTION_NO_FEEDBACK: 'FEEDBACK404_001',
  DISRUPTION_ALREADY_REGISTERED: 'FEEDBACK409_001',
  DISRUPTION_SCORE_TOO_HIGH: 'FEEDBACK409_003',

  PEAKTIME_NOT_FOUND: 'PeakTime404_001',
  SESSION_NOT_ENDED_PEAKTIME: 'SESSION409_001',
  SESSION_NOT_ENDED_RESULT: 'SESSION_409_001',
};

const handleCommonError = (error, actionName = 'API 요청') => {
  if (!error.response) {
    console.error(`🚨 [${actionName}] 네트워크 에러 발생:`, error.message);
    throw new Error('네트워크 연결이 원활하지 않습니다. 다시 시도해 주세요.');
  }

  const { status, data, config } = error.response;
  const serverMessage = data?.message;
  console.group(`🚨 [${actionName}] 에러 상세 정보`);
  console.error(`상태 코드: ${status}`);
  console.error(`요청 주소: ${config?.method?.toUpperCase()} ${config?.url}`);
  if (config?.data) console.error(`보낸 데이터(Body):`, JSON.parse(config.data));
  console.error(`서버 응답(Response):`, data);
  console.groupEnd();

  switch (status) {
    case 401:
      throw new Error(serverMessage || '인증이 필요하거나 만료되었습니다. 다시 로그인해 주세요.');
    case 403:
      throw new Error(serverMessage || '해당 세션에 대한 권한이 없습니다.');
    case 404:
      throw new Error(serverMessage || '요청하신 리소스를 찾을 수 없습니다.');
    case 500:
      throw new Error(
        serverMessage || '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      );
    default:
      if (serverMessage) throw new Error(serverMessage);
      throw error;
  }
};

export const startSession = async (data) => {
  try {
    const response = await client.post('sessions/start', data);
    return response.data;
  } catch (error) {
    if (error.response?.data?.code === SESSION_ERROR_CODES.START_DUPLICATE) {
      const activeId = error.response.data.result?.activeSessionId;
      console.warn(`⚠️ [세션 시작] 이미 진행 중인 세션 발견 (ID: ${activeId})`);
      throw new Error(`이미 진행 중인 세션(${activeId})이 있습니다.`);
    }
    handleCommonError(error, '세션 시작');
  }
};

export const pauseSession = async (sessionId) => {
  try {
    const response = await client.post(`sessions/${sessionId}/pause`);
    return response.data;
  } catch (error) {
    const code = error.response?.data?.code;

    if (code === SESSION_ERROR_CODES.PAUSE_ALREADY_PAUSED) {
      console.warn(`⚠️ [세션 일시정지] 이미 일시정지됨 (ID: ${sessionId})`);
      throw new Error('이미 일시정지 상태인 세션입니다.');
    } else if (code === SESSION_ERROR_CODES.PAUSE_ALREADY_ENDED) {
      console.warn(`⚠️ [세션 일시정지] 이미 종료된 세션 (ID: ${sessionId})`);
      throw new Error('이미 종료된 세션은 일시정지할 수 없습니다.');
    }
    handleCommonError(error, '세션 일시정지');
  }
};

export const resumeSession = async (sessionId) => {
  try {
    const response = await client.post(`sessions/${sessionId}/resume`);
    return response.data;
  } catch (error) {
    const code = error.response?.data?.code;

    if (code === SESSION_ERROR_CODES.RESUME_ALREADY_ACTIVE) {
      console.warn(`⚠️ [세션 재시작] 이미 진행 중임 (ID: ${sessionId})`);
      throw new Error('이미 진행 중인 세션입니다.');
    } else if (code === SESSION_ERROR_CODES.RESUME_ALREADY_ENDED) {
      console.warn(`⚠️ [세션 재시작] 이미 종료된 세션 (ID: ${sessionId})`);
      throw new Error('이미 종료된 세션은 재시작할 수 없습니다.');
    } else if (code === SESSION_ERROR_CODES.RESUME_NO_OPEN_INTERVAL) {
      console.error(`🚨 [세션 재시작] 열린 일시정지 구간이 없음 (ID: ${sessionId})`);
      throw new Error('세션 상태가 올바르지 않습니다. 다시 시도해 주세요.');
    }
    handleCommonError(error, '세션 재시작');
  }
};

export const endSession = async (sessionId, data) => {
  try {
    const response = await client.post(`sessions/${sessionId}/end`, data);
    return response.data;
  } catch (error) {
    const code = error.response?.data?.code;

    if (code === SESSION_ERROR_CODES.END_SESSION_ID_MISMATCH) {
      console.error(`🚨 [세션 종료] URL ID(${sessionId})와 Body ID 불일치`);
      throw new Error('요청 정보가 올바르지 않습니다.');
    } else if (code === SESSION_ERROR_CODES.END_INVALID_FOCUS_TIME) {
      console.error(`🚨 [세션 종료] 누적 집중 시간 오류`);
      throw new Error('누적 집중 시간 값이 올바르지 않습니다.');
    } else if (code === SESSION_ERROR_CODES.END_ALREADY_ENDED) {
      console.warn(`⚠️ [세션 종료] 이미 종료 처리된 세션 (ID: ${sessionId})`);
      throw new Error('이미 종료 처리된 세션입니다.');
    }
    handleCommonError(error, '세션 종료');
  }
};

export const feedbackSession = async (sessionId, data) => {
  try {
    const response = await client.post(`sessions/${sessionId}/feedback`, data);
    return response.data;
  } catch (error) {
    const code = error.response?.data?.code;

    if (code === SESSION_ERROR_CODES.EVALUATE_MISSING_SCORE) {
      console.error(`🚨 [세션 평가] focusScore 데이터 누락`);
      throw new Error('집중도 점수를 입력해 주세요.');
    } else if (code === SESSION_ERROR_CODES.EVALUATE_INVALID_SCORE) {
      console.error(`🚨 [세션 평가] 1~5 범위를 벗어난 점수 입력`);
      throw new Error('집중도 점수는 1에서 5 사이로 설정해 주세요.');
    } else if (code === SESSION_ERROR_CODES.EVALUATE_NOT_ENDED) {
      console.warn(`⚠️ [세션 평가] 종료되지 않은 세션 평가 시도 (ID: ${sessionId})`);
      throw new Error('종료된 세션만 집중도를 평가할 수 있습니다.');
    } else if (code === SESSION_ERROR_CODES.EVALUATE_ALREADY_EVALUATED) {
      console.warn(`⚠️ [세션 평가] 이미 평가된 세션 중복 평가 시도 (ID: ${sessionId})`);
      throw new Error('이미 평가가 완료된 세션입니다.');
    }
    handleCommonError(error, '세션 평가');
  }
};

export const getDisruptions = async () => {
  try {
    const response = await client.get('disruptions');
    return response.data;
  } catch (error) {
    handleCommonError(error, '방해 요소 목록 조회');
  }
};

export const postDisruptions = async (sessionId, data) => {
  try {
    const response = await client.post(`sessions/${sessionId}/disruptions`, data);
    return response.data;
  } catch (error) {
    const code = error.response?.data?.code;

    if (code === SESSION_ERROR_CODES.DISRUPTION_EMPTY_LIST) {
      console.warn(`⚠️ [방해 요소 저장] 방해 요인 미선택 (ID: ${sessionId})`);
      throw new Error('방해 요인을 1개 이상 선택해야 합니다.');
    } else if (code === SESSION_ERROR_CODES.DISRUPTION_INACTIVE) {
      console.error(`🚨 [방해 요소 저장] 비활성화된 항목 포함`);
      throw new Error('선택할 수 없는 방해 요인이 포함되어 있습니다.');
    } else if (code === SESSION_ERROR_CODES.DISRUPTION_NO_FEEDBACK) {
      console.warn(`⚠️ [방해 요소 저장] 집중도 평가 선행 안 됨 (ID: ${sessionId})`);
      throw new Error('먼저 집중도를 평가해 주세요.');
    } else if (code === SESSION_ERROR_CODES.DISRUPTION_ALREADY_REGISTERED) {
      console.warn(`⚠️ [방해 요소 저장] 중복 등록 시도 (ID: ${sessionId})`);
      throw new Error('이미 방해 요인이 등록된 세션입니다.');
    } else if (code === SESSION_ERROR_CODES.DISRUPTION_SCORE_TOO_HIGH) {
      console.warn(`⚠️ [방해 요소 저장] 조건 불충족 (점수 3점 이상)`);
      throw new Error('집중도 점수가 2점 이하인 경우에만 방해 요인을 등록할 수 있습니다.');
    }

    handleCommonError(error, '방해 요소 저장');
  }
};

export const getPeaktimeOverlaps = async (sessionId) => {
  try {
    const response = await client.get(`sessions/${sessionId}/peaktime-overlaps`);
    return response.data;
  } catch (error) {
    const code = error.response?.data?.code;

    if (code === SESSION_ERROR_CODES.SESSION_NOT_ENDED_PEAKTIME) {
      console.warn(`⚠️ [피크타임 조회] 종료되지 않은 세션 (ID: ${sessionId})`);
      throw new Error('종료된 세션만 피크타임을 조회할 수 있습니다.');
    } else if (code === SESSION_ERROR_CODES.PEAKTIME_NOT_FOUND) {
      console.warn(`⚠️ [피크타임 조회] 예측 결과 미존재 (ID: ${sessionId})`);
      throw new Error('해당 날짜의 피크타임 예측 결과가 없습니다.');
    }

    handleCommonError(error, '피크타임 교집합 조회');
  }
};

export const getSessionResult = async (sessionId) => {
  try {
    const response = await client.get(`sessions/${sessionId}/result`);
    return response.data;
  } catch (error) {
    const code = error.response?.data?.code;

    if (code === SESSION_ERROR_CODES.SESSION_NOT_ENDED_RESULT) {
      console.warn(`⚠️ [결과 조회] 종료되지 않은 세션 (ID: ${sessionId})`);
      throw new Error('종료되지 않은 세션은 결과를 조회할 수 없습니다.');
    }

    handleCommonError(error, '세션 결과 조회');
  }
};
