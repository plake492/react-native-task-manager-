import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '@/constants/theme';

export default function TaskDetail() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Task Detail</Text>
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
  text: {
    ...typography.h1,
    color: colors.text
  }
});
