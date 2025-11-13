import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/theme';

export default function Gradient() {
  return (
    <LinearGradient
      colors={[colors.warm2, colors.secondary, colors.primaryDark]}
      start={{ x: 0, y: 0 }} // Top-left
      end={{ x: 1, y: 1 }} // Bottom-right
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%'
      }}
    />
  );
}
