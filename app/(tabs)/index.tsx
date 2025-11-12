import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '@/constants/theme';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Home Screen</Text>
      <Text style={styles.body}>Welcome to your task manager</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.md
  },
  heading: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing.md
  },
  body: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.lg
  }
});
