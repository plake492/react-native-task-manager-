-- RUN IN SUPABASE SQL EDITOR

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
