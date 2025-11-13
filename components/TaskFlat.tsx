import { Text, StyleSheet, Pressable } from 'react-native';
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
      <Text style={{ ...styles.body, width: '25%', maxWidth: '25%' }}>{clipText(title, 10)}</Text>
      <Text style={{ textAlign: 'center', ...styles.pill, backgroundColor: colors.primary }}>
        {`Due in ${daysUntilDue(due_date)} days`}
      </Text>
      <Text style={{ textAlign: 'center', ...styles.pill, backgroundColor: colors.warm1 }}>{status}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.secondaryDark,
    boxShadow: '1px 1px 7px 1px rgb(0,0,0,0.09)'
  },
  h3: {
    ...typography.h3
  },
  body: {
    ...typography.body
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
