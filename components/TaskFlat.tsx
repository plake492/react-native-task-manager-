import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors, typography, spacing } from '@/constants/theme';
import { clipText, daysUntilDue } from '@/utils/helpers';
import { useRouter } from 'expo-router';

export default function TaskFlat({ id, title, status, due_date }: any) {
  const router = useRouter();

  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        router.push(`/task/${id}`);
      }}
    >
      <Text style={{ ...styles.body, width: '33%' }}>{clipText(title, 10)}</Text>
      <View style={{ ...styles.pill, backgroundColor: colors.primary }}>
        <Text style={{ textAlign: 'center' }}>{`Due in ${daysUntilDue(due_date)} days`}</Text>
      </View>
      <View style={styles.pill}>
        <Text style={{ textAlign: 'center' }}>{status}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: colors.secondary,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    paddingLeft: spacing.lg,
    paddingRight: spacing.sm,
    borderRadius: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  h3: {
    ...typography.h3
  },
  body: {
    ...typography.body
    // marginBottom: spacing.lg
  },
  pill: {
    backgroundColor: colors.warm2,
    padding: spacing.sm,
    alignSelf: 'center',
    marginLeft: 'auto',
    borderRadius: 40,
    width: '33%'
  }
});
