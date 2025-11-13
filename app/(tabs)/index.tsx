import { View, Text, StyleSheet, Pressable, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useState } from 'react';
import { colors, typography, spacing } from '@/constants/theme';
import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import TaskFlat from '@/components/TaskFlat';
import { useTasks } from '@/hooks/useTasks';
import { useAuth } from '@/hooks/useAuth';
import { LinearGradient } from 'expo-linear-gradient';
import Gradient from '@/components/Gradient';

export default function Home() {
  const { user, loading } = useAuth();
  const { tasks, fetchTasks } = useTasks(user?.id);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  };

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
      <Gradient />
      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskFlat {...item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
            progressBackgroundColor={colors.background}
          />
        }
        ListHeaderComponent={
          <>
            <Text style={styles.heading}>Home Screen</Text>
            <Text style={styles.body}>Welcome to your task manager</Text>
          </>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <Pressable style={styles.button} onPress={() => router.push('/task/create-task')}>
        <Text style={styles.buttonText}>New Task{'  '}+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryDark,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center'
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%'
  },
  listContent: {
    paddingBottom: spacing.lg
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
    color: colors.primaryDark,
    marginBottom: spacing.lg
  },
  separator: {
    height: 10
  },
  button: {
    backgroundColor: colors.warm1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    borderRadius: 12,
    width: '100%'
  },
  buttonText: {
    ...typography.button,
    color: colors.white,
    textAlign: 'center'
  }
});
