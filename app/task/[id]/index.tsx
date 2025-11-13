import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTasks } from '@/hooks/useTasks';
import { useAuth } from '@/hooks/useAuth';
import { daysUntilDue } from '@/utils/helpers';
import FormLayout from '@/components/FormLayout';
import BackButton from '@/components/BackButton';

export default function TaskDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const { tasks, deleteTask } = useTasks(user?.id);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Task not found</Text>
        <Pressable style={styles.updateButton} onPress={() => router.push('/(tabs)')}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </Pressable>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteTask(task.id);
          router.push('/(tabs)');
        }
      }
    ]);
  };

  const daysDue = task.due_date ? daysUntilDue(task.due_date) : null;
  const dueDateText = daysDue === null ? 'No due date' : daysDue === 0 ? 'Due today' : daysDue > 0 ? `Due in ${daysDue} days` : `Overdue by ${Math.abs(daysDue)} days`;

  return (
    <>
      <FormLayout
        layoutWrapper={{ flex: 1, backgroundColor: colors.background }}
        buttons={
          <>
            <Pressable style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
            <Pressable style={styles.updateButton} onPress={() => router.push(`/task/${id}/update`)}>
              <Text style={styles.buttonText}>Update</Text>
            </Pressable>
          </>
        }
      >
        <View style={styles.container}>
          <BackButton />
          <Text style={styles.title}>{task.title}</Text>

          <View style={styles.section}>
            <Text style={styles.label}>Status</Text>
            <View style={[styles.statusPill, task.status === 'completed' && styles.completedPill, task.status === 'in_progress' && styles.inProgressPill]}>
              <Text style={styles.statusText}>{task.status === 'todo' ? 'To Do' : task.status === 'in_progress' ? 'In Progress' : 'Completed'}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Due Date</Text>
            <Text style={styles.value}>{task.due_date}</Text>
            <Text style={[styles.dueText, daysDue !== null && daysDue < 0 && styles.overdueText]}>{dueDateText}</Text>
          </View>

          {task.description && (
            <View style={styles.section}>
              <Text style={styles.label}>Description</Text>
              <Text style={styles.value}>{task.description}</Text>
            </View>
          )}
        </View>
        {/* </BackButton> */}
      </FormLayout>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    marginTop: spacing.xl,
    flex: 1
  },
  title: {
    ...typography.h1,
    color: colors.text
  },
  section: {
    marginBottom: spacing.xl
  },
  label: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.sm
  },
  value: {
    ...typography.body,
    color: colors.text,
    fontSize: 16
  },
  statusPill: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    backgroundColor: colors.cardBackground,
    alignSelf: 'flex-start'
  },
  completedPill: {
    backgroundColor: colors.success
  },
  inProgressPill: {
    backgroundColor: colors.primary
  },
  statusText: {
    ...typography.button,
    color: colors.text,
    fontSize: 14
  },
  dueText: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: spacing.xs
  },
  overdueText: {
    color: colors.error
  },
  updateButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center'
  },
  deleteButton: {
    flex: 1,
    backgroundColor: colors.error,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center'
  },
  buttonText: {
    ...typography.button,
    color: colors.white
  }
});
