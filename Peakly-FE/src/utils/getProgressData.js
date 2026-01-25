import { colors } from '../styles/colors';

export const getProgressData = (value) => [
  { value: value, color: colors.primary[600] },
  { value: 100 - value, color: colors.primary[100] },
];
