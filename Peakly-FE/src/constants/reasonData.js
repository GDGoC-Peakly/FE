import Caffeine from '../../assets/img/RP/caffeine.svg';
import Sleeping from '../../assets/img/RP/sleeping.svg';
import Cellphone from '../../assets/img/RP/cellphone.svg';
import Sick from '../../assets/img/RP/sick.svg';
import Bgm from '../../assets/img/RP/bgm.svg';
import Noise from '../../assets/img/RP/noise.svg';
import Medicine from '../../assets/img/RP/medicine.svg';
import Others from '../../assets/img/RP/others.svg';

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
