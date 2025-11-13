import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
// Based on iPhone 8 width as baseline (375)
const scale = SCREEN_WIDTH / 375;

export const colors = {
  // Brand colors
  primary: '#7F7EFF',
  primaryDark: '#5F5ECC',
  secondary: '#A390E4',
  secondaryDark: '#7D6BB3',
  accent: '#C69DD2',
  accentDark: '#9B77A8',
  warm1: '#CC8B8C',
  warm1Dark: '#A06D6E',
  warm2: '#C68866',
  warm2Dark: '#9D6A4F',

  // Dark mode backgrounds
  background: '#121212',
  surface: '#1E1E1E',
  card: '#2C2C2C',
  headerBackground: '#1E1E1E',
  tabBarBackground: '#1E1E1E',
  cardBackground: '#2C2C2C',

  // Text colors for dark mode
  text: '#FFFFFF',
  textSecondary: '#B3B3B3',
  textDisabled: '#666666',

  // Base colors
  black: '#000000',
  white: '#FFFFFF',
  offWhite: '#FAFAFA',

  // UI elements for dark mode
  disabled: '#666666',
  border: '#333333',
  inputBackground: '#2C2C2C',
  inputBorder: '#444444',

  // Semantic colors
  error: '#FF5252',
  success: '#4CAF50'
};

function normalize(size: number) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export const typography = {
  h1: { fontSize: normalize(32), fontWeight: 700 as const, lineHeight: normalize(40) },
  h2: { fontSize: normalize(28), fontWeight: 600 as const, lineHeight: normalize(34) },
  h3: { fontSize: normalize(24), fontWeight: 600 as const, lineHeight: normalize(30) },
  body: { fontSize: normalize(16), fontWeight: 400 as const, lineHeight: normalize(22) },
  small: { fontSize: normalize(14), fontWeight: 400 as const, lineHeight: normalize(20) },
  button: { fontSize: normalize(18), fontWeight: 600 as const, lineHeight: normalize(22) },
  label: { fontSize: normalize(14), fontWeight: 600 as const, lineHeight: normalize(18) }
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  full: 999
};
