import { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '@/hooks/useAuth';
import { useTasks } from '@/hooks/useTasks';
import { router, useLocalSearchParams } from 'expo-router';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';
import FormLayout from '@/components/FormLayout';

export default function UpdateTask() {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [status, setStatus] = useState<'todo' | 'in_progress' | 'completed'>('todo');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const { tasks, updateTask } = useTasks(user?.id);

  // Pre-fill form with existing task data
  useEffect(() => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
      if (task.due_date) {
        setDueDate(new Date(task.due_date));
      }
    }
  }, [id, tasks]);

  const handleUpdateTask = async () => {
    try {
      setError('');

      if (!title.trim()) {
        setError('Title is required');
        return;
      }

      const updates = {
        title,
        description,
        due_date: dueDate.toISOString().split('T')[0],
        status
      };

      await updateTask(id as string, updates);
      console.log('Updating task:', updates);

      // Navigate back to task detail after update
      router.push(`/task/${id}`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    // setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  return (
    <>
      <FormLayout
        layoutWrapper={{ backgroundColor: colors.background }}
        keyboardAware={true}
        buttons={
          <>
            <Pressable style={styles.cancelButton} onPress={() => router.back()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.submitButton} onPress={handleUpdateTask}>
              <Text style={styles.submitButtonText}>Update Task</Text>
            </Pressable>
          </>
        }
      >
        <View style={styles.container}>
          <Text style={styles.title}>Update Task</Text>

          <Text style={styles.label}>Title *</Text>
          <TextInput style={styles.input} placeholder="Task Title" placeholderTextColor={colors.textSecondary} value={title} onChangeText={setTitle} />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            placeholderTextColor={colors.textSecondary}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Due Date</Text>
          <DateTimePicker value={dueDate} mode="date" display="default" onChange={onDateChange} accentColor={colors.primary} themeVariant="dark" style={styles.datePicker} />

          <Text style={styles.label}>Status</Text>
          <View style={styles.statusContainer}>
            <Pressable style={[styles.statusButton, status === 'todo' && styles.statusButtonActive]} onPress={() => setStatus('todo')}>
              <Text style={[styles.statusButtonText, status === 'todo' && styles.statusButtonTextActive]}>To Do</Text>
            </Pressable>
            <Pressable style={[styles.statusButton, status === 'in_progress' && styles.statusButtonActive]} onPress={() => setStatus('in_progress')}>
              <Text style={[styles.statusButtonText, status === 'in_progress' && styles.statusButtonTextActive]}>In Progress</Text>
            </Pressable>
            <Pressable style={[styles.statusButton, status === 'completed' && styles.statusButtonActive]} onPress={() => setStatus('completed')}>
              <Text style={[styles.statusButtonText, status === 'completed' && styles.statusButtonTextActive]}>Completed</Text>
            </Pressable>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
      </FormLayout>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing.lg
  },
  label: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
    fontWeight: '600'
  },
  input: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.inputBackground,
    color: colors.text,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.md
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  statusContainer: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.md
  },
  statusButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  statusButtonText: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 14
  },
  statusButtonTextActive: {
    color: colors.white,
    fontWeight: '600'
  },
  datePicker: {
    alignSelf: 'flex-start',
    marginLeft: -14,
    color: colors.text,
    marginBottom: 8
  },
  cancelButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  cancelButtonText: {
    ...typography.button,
    color: colors.text,
    fontSize: 16
  },
  submitButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    alignItems: 'center'
  },
  submitButtonText: {
    ...typography.button,
    color: colors.white,
    fontSize: 16
  },
  error: {
    color: colors.error,
    marginBottom: spacing.sm
  }
});
