import { colors } from '../styles/colors';

export const getProgressData = (value) => [
  { value: value, color: colors.primary[500] },
  { value: 100 - value, color: colors.grayscale[900] },
];
