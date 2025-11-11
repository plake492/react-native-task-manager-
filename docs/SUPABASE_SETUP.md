# Supabase Setup & Data Structure

## Quick Setup (20 minutes)

### 1. Create Supabase Account

- Go to https://supabase.com
- Sign up (free tier)
- Create new project
- Save your project URL and anon key

### 2. Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### 3. Configure Supabase

Create `services/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## Database Schema

### Users Table

**Handled automatically by Supabase Auth** - you don't create this table.

Supabase provides `auth.users` with:

- id (UUID)
- email
- encrypted_password
- created_at
- And more auth fields

### Tasks Table

Run this SQL in Supabase SQL Editor:

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create tasks table
create table tasks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text,
  status text default 'todo' check (status in ('todo', 'in_progress', 'completed')),
  due_date timestamptz,
  completed_at timestamptz,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table tasks enable row level security;

-- Policy: Users can only see their own tasks
create policy "Users can view own tasks"
  on tasks for select
  using (auth.uid() = user_id);

-- Policy: Users can insert their own tasks
create policy "Users can insert own tasks"
  on tasks for insert
  with check (auth.uid() = user_id);

-- Policy: Users can update their own tasks
create policy "Users can update own tasks"
  on tasks for update
  using (auth.uid() = user_id);

-- Policy: Users can delete their own tasks
create policy "Users can delete own tasks"
  on tasks for delete
  using (auth.uid() = user_id);
```

---

## TypeScript Types

Create `types/index.ts`:

```typescript
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
```

---

## Authentication Implementation

### useAuth Hook

Create `hooks/useAuth.ts`:

```typescript
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    if (error) throw error;
    return data;
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return { user, loading, signUp, signIn, signOut };
};
```

---

## Task CRUD Operations

### useTasks Hook

Create `hooks/useTasks.ts`:

```typescript
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
    const completed_at = newStatus === 'completed' ? new Date().toISOString() : null;

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
```

---

## API Usage Examples

### Sign Up

```typescript
const { signUp } = useAuth();
await signUp('user@example.com', 'password123');
```

### Sign In

```typescript
const { signIn } = useAuth();
await signIn('user@example.com', 'password123');
```

### Create Task

```typescript
const { createTask } = useTasks(user?.id);
await createTask({
  title: 'Build React Native app',
  description: 'Complete demo for interview',
  status: 'in_progress'
});
```

### Update Task

```typescript
const { updateTask } = useTasks(user?.id);
await updateTask(taskId, {
  status: 'completed',
  completed_at: new Date().toISOString()
});
```

### Delete Task

```typescript
const { deleteTask } = useTasks(user?.id);
await deleteTask(taskId);
```

### Toggle Complete

```typescript
const { toggleComplete } = useTasks(user?.id);
await toggleComplete(task);
```

---

## Environment Variables

Create `.env` in project root:

```bash
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Update `services/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## Testing Checklist

- [ ] User can sign up with email/password
- [ ] User can sign in
- [ ] User can only see their own tasks (RLS working)
- [ ] User can create a task
- [ ] User can update a task
- [ ] User can delete a task
- [ ] User can toggle task completion
- [ ] Tasks persist after app restart
- [ ] Sign out clears session

---

## Common Issues

**Error: "new row violates row-level security policy"**

- Make sure RLS policies are set up correctly
- Check that `auth.uid()` matches the `user_id` in your insert

**Error: "JWT expired"**

- Session expired, user needs to sign in again
- Supabase handles refresh tokens automatically

**Tasks not showing**

- Check RLS policies
- Verify user is authenticated
- Check user_id matches auth.uid()

**Can't connect to Supabase**

- Verify URL and anon key are correct
- Check internet connection
- Ensure project is not paused (free tier)
