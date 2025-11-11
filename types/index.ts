export type User = {
  id: string;
  email: string;
  created_at: string;
};

export type Task = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: 'todo' | 'in_progress' | 'completed';
  due_date: string | null;
  completed_at: string | null;
  created_at: string;
};

export type TaskInsert = {
  title: string;
  description?: string;
  status?: 'todo' | 'in_progress' | 'completed';
  due_date?: string;
};

export type TaskUpdate = {
  title?: string;
  description?: string;
  status?: 'todo' | 'in_progress' | 'completed';
  due_date?: string;
  completed_at?: string;
};
