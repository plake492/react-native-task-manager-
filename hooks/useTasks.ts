import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { Task, TaskInsert, TaskUpdate } from '../types';

export const useTasks = (userId: string | undefined) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    if (!userId) return;

    setLoading(true);
    const { data, error } = await supabase.from('tasks').select('*').eq('user_id', userId).order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tasks:', error);
    } else {
      setTasks(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  const createTask = async (task: TaskInsert) => {
    if (!userId) return;

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ ...task, user_id: userId }])
      .select()
      .single();

    if (error) throw error;
    setTasks([data, ...tasks]);
    return data;
  };

  const updateTask = async (id: string, updates: TaskUpdate) => {
    const { data, error } = await supabase.from('tasks').update(updates).eq('id', id).select().single();

    if (error) throw error;
    setTasks(tasks.map((t) => (t.id === id ? data : t)));
    return data;
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);

    if (error) throw error;
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleComplete = async (task: Task) => {
    const newStatus = task.status === 'completed' ? 'todo' : 'completed';
    const completed_at = newStatus === 'completed' ? new Date().toISOString() : undefined;

    return updateTask(task.id, { status: newStatus, completed_at });
  };

  return {
    tasks,
    loading,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete
  };
};
