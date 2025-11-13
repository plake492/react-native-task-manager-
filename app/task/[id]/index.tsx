import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTasks } from '@/hooks/useTasks';
import { useAuth } from '@/hooks/useAuth';
import { daysUntilDue } from '@/utils/helpers';
import FormLayout from '@/components/FormLayout';
import Gradient from '@/components/Gradient';

export default function TaskDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const { tasks, deleteTask, updateTask } = useTasks(user?.id);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<'todo' | 'in_progress' | 'completed'>('todo');

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <View>
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

  const handleEditStatus = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedStatus(task.status);
    setIsEditingStatus(true);
  };

  const handleSaveStatus = async () => {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await updateTask(task.id, { status: selectedStatus });
      setIsEditingStatus(false);
    } catch (error) {
      console.error(error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Error', 'Failed to update task status');
    }
  };

  const handleCancelEdit = () => {
    setIsEditingStatus(false);
    setSelectedStatus(task.status);
  };

  const daysDue = task.due_date ? daysUntilDue(task.due_date) : null;
  const dueDateText =
    daysDue === null
      ? 'No due date'
      : daysDue === 0
        ? 'Due today'
        : daysDue > 0
          ? `Due in ${daysDue} days`
          : `Overdue by ${Math.abs(daysDue)} days`;

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <Gradient />
      <FormLayout
        layoutWrapper={{ flex: 1 }}
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
        <Pressable style={styles.contentWrapper} onPress={isEditingStatus ? handleCancelEdit : undefined}>
          <View>
            <Text style={styles.title}>{task.title}</Text>

            <View style={styles.section}>
              <Text style={styles.label}>Status</Text>
              {!isEditingStatus ? (
                <Pressable
                  onPress={handleEditStatus}
                  style={[
                    styles.statusPill,
                    task.status === 'completed' && styles.completedPill,
                    task.status === 'in_progress' && styles.inProgressPill
                  ]}
                >
                  <Text style={styles.statusText}>
                    {task.status === 'todo' ? 'To Do' : task.status === 'in_progress' ? 'In Progress' : 'Completed'}
                  </Text>
                </Pressable>
              ) : (
                <Pressable onPress={(e) => e.stopPropagation()}>
                  <View style={styles.statusEditContainer}>
                    <View style={styles.statusOptions}>
                      <Pressable
                        style={[styles.statusOption, selectedStatus === 'todo' && styles.statusOptionActive]}
                        onPress={() => setSelectedStatus('todo')}
                      >
                        <Text style={[styles.statusOptionText, selectedStatus === 'todo' && styles.statusOptionTextActive]}>To Do</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.statusOption, selectedStatus === 'in_progress' && styles.statusOptionActive]}
                        onPress={() => setSelectedStatus('in_progress')}
                      >
                        <Text style={[styles.statusOptionText, selectedStatus === 'in_progress' && styles.statusOptionTextActive]}>
                          In Progress
                        </Text>
                      </Pressable>
                      <Pressable
                        style={[styles.statusOption, selectedStatus === 'completed' && styles.statusOptionActive]}
                        onPress={() => setSelectedStatus('completed')}
                      >
                        <Text style={[styles.statusOptionText, selectedStatus === 'completed' && styles.statusOptionTextActive]}>
                          Completed
                        </Text>
                      </Pressable>
                    </View>
                    <View style={styles.statusEditButtons}>
                      <Pressable style={styles.cancelButton} onPress={handleCancelEdit}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.saveButton, selectedStatus === task.status && styles.saveButtonDisabled]}
                        onPress={handleSaveStatus}
                        disabled={selectedStatus === task.status}
                      >
                        <Text style={[styles.saveButtonText, selectedStatus === task.status && styles.saveButtonTextDisabled]}>Save</Text>
                      </Pressable>
                    </View>
                  </View>
                </Pressable>
              )}
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
        </Pressable>
      </FormLayout>
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing.lg
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
  statusEditContainer: {
    gap: spacing.md
  },
  statusOptions: {
    flexDirection: 'row',
    gap: spacing.sm
  },
  statusOption: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  statusOptionActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  statusOptionText: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 14
  },
  statusOptionTextActive: {
    color: colors.white,
    fontWeight: '600'
  },
  statusEditButtons: {
    flexDirection: 'row',
    gap: spacing.sm
  },
  cancelButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  cancelButtonText: {
    ...typography.button,
    color: colors.text,
    fontSize: 14
  },
  saveButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    alignItems: 'center'
  },
  saveButtonDisabled: {
    backgroundColor: colors.border,
    opacity: 0.5
  },
  saveButtonText: {
    ...typography.button,
    color: colors.white,
    fontSize: 14
  },
  saveButtonTextDisabled: {
    color: colors.textSecondary
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
