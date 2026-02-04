import Caffeine from '../../assets/img/RP/caffeine.svg';
import Sleeping from '../../assets/img/RP/sleeping.svg';
import Cellphone from '../../assets/img/RP/cellphone.svg';
import Sick from '../../assets/img/RP/sick.svg';
import Bgm from '../../assets/img/RP/bgm.svg';
import Noise from '../../assets/img/RP/noise.svg';
import Medicine from '../../assets/img/RP/medicine.svg';
import Others from '../../assets/img/RP/others.svg';

import DisturbCaffeine from '../../assets/img/TM/disturbImage/caffeine.svg';
import DisturbSleeping from '../../assets/img/TM/disturbImage/sleeping.svg';
import DisturbCellphone from '../../assets/img/TM/disturbImage/cellphone.svg';
import DisturbSick from '../../assets/img/TM/disturbImage/sick.svg';
import DisturbBgm from '../../assets/img/TM/disturbImage/bgm.svg';
import DisturbNoise from '../../assets/img/TM/disturbImage/noise.svg';
import DisturbMedicine from '../../assets/img/TM/disturbImage/medicine.svg';
import DisturbOthers from '../../assets/img/TM/disturbImage/others.svg';

import DisabledCaffeine from '../../assets/img/TM/disturbImage/disabledCaffeine.svg';
import DisabledSleeping from '../../assets/img/TM/disturbImage/disabledSleeping.svg';
import DisabledCellphone from '../../assets/img/TM/disturbImage/disabledCellphone.svg';
import DisabledSick from '../../assets/img/TM/disturbImage/disabledSick.svg';
import DisabledBgm from '../../assets/img/TM/disturbImage/disabledBgm.svg';
import DisabledNoise from '../../assets/img/TM/disturbImage/disabledNoise.svg';
import DisabledMedicine from '../../assets/img/TM/disturbImage/disabledMedicine.svg';
import DisabledOthers from '../../assets/img/TM/disturbImage/disabledOthers.svg';

export const REASON_CONFIG = {
  CAFFEINE: { label: '카페인', Icon: Caffeine, width: 28, height: 37 },
  SLEEPY: { label: '수면 부족', Icon: Sleeping, width: 40, height: 48 },
  PHONE: { label: '스마트폰', Icon: Cellphone, width: 24, height: 38 },
  SICK: { label: '컨디션 난조', Icon: Sick, width: 40, height: 48 },
  BGM: { label: 'BGM', Icon: Bgm, width: 40, height: 48 },
  NOISE: { label: '소음', Icon: Noise, width: 40, height: 48 },
  MEDICINE: { label: '질병', Icon: Medicine, width: 40, height: 48 },
  OTHERS: { label: '기타', Icon: Others, width: 40, height: 48 },
};

export const DisturbConfig = {
  CAFFEINE: {
    id: 1,
    label: '카페인',
    IconOn: DisturbCaffeine,
    IconOff: DisabledCaffeine,
  },
  SLEEPY: {
    id: 2,
    label: '수면 부족',
    IconOn: DisturbSleeping,
    IconOff: DisabledSleeping,
  },
  PHONE: {
    id: 3,
    label: '스마트폰',
    IconOn: DisturbCellphone,
    IconOff: DisabledCellphone,
  },
  SICK: {
    id: 4,
    label: '컨디션 난조',
    IconOn: DisturbSick,
    IconOff: DisabledSick,
  },
  BGM: {
    id: 5,
    label: 'BGM',
    IconOn: DisturbBgm,
    IconOff: DisabledBgm,
  },
  NOISE: {
    id: 6,
    label: '소음',
    IconOn: DisturbNoise,
    IconOff: DisabledNoise,
  },
  MEDICINE: {
    id: 7,
    label: '질병',
    IconOn: DisturbMedicine,
    IconOff: DisabledMedicine,
  },
  OTHERS: {
    id: 8,
    label: '기타',
    IconOn: DisturbOthers,
    IconOff: DisabledOthers,
  },
};
