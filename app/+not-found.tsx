import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';

export default function NotFoundScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push(user ? '/(tabs)' : '/(auth)/login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.errorCode}>404</Text>
        <Text style={styles.title}>Page Not Found</Text>
        <Text style={styles.message}>The page you're looking for doesn't exist or has been moved.</Text>
        <Pressable style={styles.button} onPress={handleBackPress}>
          <Text style={styles.buttonText}>{router.canGoBack() ? 'Go Back' : user ? 'Go to Home' : 'Go to Login'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl
  },
  content: {
    alignItems: 'center',
    maxWidth: 400
  },
  errorCode: {
    fontSize: 72,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.md
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center'
  },
  message: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 24
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    minWidth: 200,
    alignItems: 'center'
  },
  buttonText: {
    ...typography.button,
    color: colors.white
  }
});
