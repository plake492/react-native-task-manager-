import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { colors, typography, spacing } from '@/constants/theme';
import { router } from 'expo-router';
import TaskFlat from '@/components/TaskFlat';
import { useTasks } from '@/hooks/useTasks';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { user, loading } = useAuth();
  const { tasks } = useTasks(user?.id);

  if (loading || !user) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.body}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Home Screen</Text>
        <Text style={styles.body}>Welcome to your task manager</Text>
        <View style={{ width: '100%', paddingTop: 50, display: 'flex', gap: 10 }}>
          {tasks.map((task) => (
            <TaskFlat key={task.id} {...task} />
          ))}
        </View>
      </View>
      <Pressable style={styles.button} onPress={() => router.push('/task/create-task')}>
        <Text style={styles.buttonText}>New Task{'  '}+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: colors.background,
    padding: spacing.md,
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%'
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing.sm
  },
  body: {
    ...typography.body,
    color: colors.secondary,
    marginBottom: spacing.lg
  },
  button: {
    backgroundColor: colors.warm1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginLeft: 'auto',
    borderRadius: 12,
    width: '100%'
  },
  buttonText: {
    ...typography.button,
    color: colors.white,
    textAlign: 'center'
  }
});
