import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
// Based on iPhone 8 width as baseline (375)
const scale = SCREEN_WIDTH / 375;

export const colors = {
  primary: '#7F7EFF', // your palette: 7f7eff
  secondary: '#A390E4', // a390e4
  accent: '#C69DD2', // c69dd2
  warm1: '#CC8B8C', // cc8b8c
  warm2: '#C68866', // c68866
  black: '#000000',
  offWhite: '#FAFAFA',
  white: '#FFFFFF',
  // disabled / placeholder / border variants
  disabled: '#D3D3D3',
  border: '#E0E0E0'
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
  button: { fontSize: normalize(18), fontWeight: 600 as const, lineHeight: normalize(22) }
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
  lg: 12
};
