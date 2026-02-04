import { timeToMinutes } from '../utils/dateUtils';

const CHART_HEIGHT = 240;
const OVERLAP_BUFFER = 20;

export const useTimeChartLogic = (apiResult, actualSession) => {
  const isValid =
    apiResult &&
    apiResult.windows &&
    apiResult.windows.length > 0 &&
    actualSession &&
    actualSession.startAt &&
    actualSession.endAt;

  if (!isValid) {
    return { isValid: false };
  }

  const expectedWindow = apiResult.windows[0];
  const chartStartTime = timeToMinutes(expectedWindow.startAt);
  const chartEndTime = timeToMinutes(expectedWindow.endAt);
  const totalChartDuration = chartEndTime - chartStartTime;

  const actualStartMin = timeToMinutes(actualSession.startAt);
  const actualEndMin = timeToMinutes(actualSession.endAt);

  const hasOverlap = actualStartMin < chartEndTime && actualEndMin > chartStartTime;
  const shouldBadgeBeAtBottom = actualStartMin <= chartStartTime + OVERLAP_BUFFER;

  let layout = {
    top: 0,
    height: 0,
    labelTop: 0,
  };
  let showLabel = false;

  if (hasOverlap) {
    const clampedStart = Math.max(chartStartTime, actualStartMin);
    const clampedEnd = Math.min(chartEndTime, actualEndMin);

    const visualDuration = clampedEnd - clampedStart;
    const topRatio = (clampedStart - chartStartTime) / totalChartDuration;
    const heightRatio = visualDuration / totalChartDuration;
    const originalTopRatio = (actualStartMin - chartStartTime) / totalChartDuration;

    layout = {
      top: topRatio * CHART_HEIGHT,
      height: heightRatio * CHART_HEIGHT,
      labelTop: originalTopRatio * CHART_HEIGHT,
    };

    showLabel = originalTopRatio >= 0 && originalTopRatio <= 1;
  }

  return {
    isValid: true,
    data: {
      expectedStart: expectedWindow.startAt,
      expectedEnd: expectedWindow.endAt,
      actualStart: actualSession.startAt,
    },
    state: {
      hasOverlap,
      shouldBadgeBeAtBottom,
      showLabel,
    },
    layout,
    constants: {
      CHART_HEIGHT,
    },
  };
};
