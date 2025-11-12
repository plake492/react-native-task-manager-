# Task Manager App - Product Overview

## Purpose

A mobile task management application built with React Native to demonstrate senior-level React Native development skills. This is a portfolio/interview demo project showcasing mobile app development, authentication, CRUD operations, and modern React patterns.

---

## What This App Does

Users can:

- Create an account and log in securely
- Create, view, edit, and delete tasks
- Mark tasks as todo, in progress, or completed
- View only their own tasks (multi-tenant with data isolation)
- Persist data across sessions

---

## Tech Stack

### Frontend (React Native)

- **Framework:** React Native via Expo
- **Language:** TypeScript
- **Navigation:** Expo Router (file-based routing)
- **State Management:** React Context (for auth state)
- **HTTP Client:** Axios
- **Local Storage:** @react-native-async-storage/async-storage
- **UI:** React Native core components (View, Text, FlatList, etc.)

### Backend (Supabase)

- **Database:** PostgreSQL
- **Authentication:** Supabase Auth (JWT tokens)
- **API:** Auto-generated REST API from Supabase
- **Security:** Row Level Security (RLS) policies

---

## Data Model

### User (managed by Supabase Auth)

```typescript
{
  id: string; // UUID
  email: string;
  created_at: string; // ISO timestamp
}
```

### Task

```typescript
{
  id: string; // UUID
  user_id: string; // Foreign key to auth.users
  title: string; // Task name
  description: string | null;
  status: 'todo' | 'in_progress' | 'completed';
  due_date: string | null; // ISO timestamp
  completed_at: string | null; // ISO timestamp
  created_at: string; // ISO timestamp
}
```

---

## App Structure

### Navigation Flow

```
Login/Register (Auth screens)
    ↓ (after login)
Bottom Tab Navigator:
    - Home (Task List)
    - Profile
    - Settings
    ↓ (tap on task)
Task Detail Screen (edit/delete)
```

### Folder Structure

```
app/                    # Expo Router screens
  (auth)/              # Auth group (login, register)
  (tabs)/              # Main app tabs
  task/[id].tsx        # Task detail (dynamic route)
  _layout.tsx               # Root layout (auth check)
components/            # Reusable UI components
hooks/                 # Custom React hooks (useAuth, useTasks)
services/              # API/Supabase client
types/                 # TypeScript definitions
constants/             # Theme, colors, spacing
utils/                 # Helper functions
```

---

## Key Features to Implement

### Phase 1: Authentication

- Login screen with email/password
- Register screen
- JWT token storage with AsyncStorage
- Protected routes (redirect to login if not authenticated)
- Sign out functionality

### Phase 2: Task List

- Display all user's tasks in a FlatList
- Pull-to-refresh
- Loading states
- Empty state ("No tasks yet")
- Tap task to view details

### Phase 3: CRUD Operations

- Create new task (form with title, description)
- Edit existing task
- Delete task
- Toggle task status (todo → in progress → completed)

### Phase 4: Mobile UX

- Bottom tab navigation
- KeyboardAvoidingView for forms
- SafeAreaView for notch/status bar
- Platform-specific styling (iOS vs Android)
- Haptic feedback on interactions

---

## Development Approach

### Testing Strategy

- Test on physical device via Expo Go app
- No need for Xcode/Android Studio simulators
- Live reload for fast iteration

### Time Budget

- 8-10 hours total build time
- Focus on core features over polish
- Demonstrate React Native fundamentals

---

## Success Criteria

This app successfully demonstrates:

1. **React Native basics:** View, Text, FlatList, navigation
2. **Authentication:** Secure login with JWT tokens
3. **API integration:** RESTful CRUD operations with Supabase
4. **State management:** React Context for global auth state
5. **TypeScript:** Type-safe code throughout
6. **Mobile patterns:** Pull-to-refresh, keyboard handling, native components
7. **Data security:** Row Level Security ensures users only see their own data

---

## Interview Talking Points

After building this app, you can discuss:

### Technical Depth

- React Native component lifecycle and hooks
- Difference between React and React Native (View vs div, FlatList vs map)
- File-based routing with Expo Router
- State management patterns (local state vs global state with Context)
- AsyncStorage for client-side persistence
- API integration with error handling and loading states

### Mobile-Specific Knowledge

- Platform differences (iOS vs Android)
- FlatList optimization for performance
- KeyboardAvoidingView and input handling
- SafeAreaView for device notches
- Expo vs React Native CLI tradeoffs

### Architecture & Best Practices

- Component composition and reusability
- Custom hooks for business logic
- TypeScript for type safety
- Separation of concerns (hooks, services, components)
- Row Level Security for multi-tenant data isolation

### Scalability Considerations

- Could add a more robust state management library like Redux if state gets complex
- Could add React Query for advanced caching
- Could add native modules if needed
- Could build standalone apps for App Store/Play Store
- Could add offline-first capabilities with local database

---

## Known Limitations (By Design)

This is a demo app, not a production app. Some features intentionally omitted:

- No offline mode
- No image uploads
- No push notifications
- No advanced animations
- No unit/integration tests (time constraint)
- Simple validation only

These could be added and should be mentioned as "next steps" in interviews.

---

## Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Clear cache if issues
npx expo start -c

# Type check
npx tsc --noEmit
```

---

## Environment Setup

1. Create Supabase project at https://supabase.com
2. Create `.env` file:
   ```
   EXPO_PUBLIC_SUPABASE_URL=your_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```
3. Run SQL to create tasks table (see SUPABASE_SETUP.md)
4. Install Expo Go app on phone
5. Run `npx expo start` and scan QR code

---

## For AI Agents: Important Context

When helping with this project:

1. **Always use React Native components** (View, Text, Pressable), never HTML (div, span, button)
2. **Use FlatList for lists**, not .map() (performance)
3. **StyleSheet.create for styles**, not CSS files
4. **Flexbox is default** layout system
5. **TypeScript is required** - provide proper types
6. **Expo Router syntax** for navigation (not React Navigation directly)
7. **Supabase client** is already configured in `services/supabase.ts`
8. **Auth state** comes from `useAuth` hook
9. **Task operations** come from `useTasks` hook
10. **This is a demo app** - prioritize working features over perfect architecture

### Common Pitfalls to Avoid

- Using HTML elements instead of React Native components
- Using className instead of style prop
- Forgetting KeyboardAvoidingView for forms
- Not using FlatList keyExtractor
- Missing SafeAreaView causing layout issues
- Async/await without error handling
- Hardcoding URLs instead of using environment variables

### Code Style Preferences

- Functional components with hooks (no class components)
- TypeScript for all files
- Named exports for components
- Async/await over promises
- Early returns for error states
- Descriptive variable names
- Comments for complex logic only
