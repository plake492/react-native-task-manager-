import { Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { spacing, typography, colors } from '@/constants/theme';

export default function BackButton() {
  const router = useRouter();

  return (
    <Pressable style={styles.backButton} onPress={() => router.back()}>
      <Text style={styles.backButtonText}>← Back</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    marginTop: spacing.md,
    paddingTop: spacing.md,
    zIndex: 10
  },
  backButtonText: {
    ...typography.body,
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600'
  }
});
