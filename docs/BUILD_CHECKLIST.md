# React Native Build Checklist

## Phase 1: Setup & Foundation (30 min)

- [ ] Initialize Expo project with tabs template
- [ ] Install dependencies (zustand, axios, async-storage)
- [ ] Create folder structure (components, hooks, services, types, constants, utils)
- [ ] Set up TypeScript types for Task and User
- [ ] Create theme constants (colors, spacing, fonts)
- [ ] Test app runs on phone with `npx expo start`

## Phase 2: Authentication (1.5 hours)

- [ ] Create login screen with email/password inputs
- [ ] Create register screen
- [ ] Build useAuth hook with login/logout functions
- [ ] Set up AsyncStorage for token persistence
- [ ] Add auth state to Zustand store
- [ ] Implement protected route logic in root layout
- [ ] Test: Login redirects to tasks, logout redirects to login

## Phase 3: Task List (2 hours)

- [ ] Create Task type (id, title, description, completed, userId)
- [ ] Build TaskCard component with complete/delete buttons
- [ ] Implement FlatList on home screen
- [ ] Add pull-to-refresh functionality
- [ ] Create useTasks hook for CRUD operations
- [ ] Connect to mock API (JSONPlaceholder or Supabase)
- [ ] Show loading spinner while fetching
- [ ] Handle empty state ("No tasks yet")
- [ ] Test: List renders, pull-to-refresh works

## Phase 4: Create/Edit Tasks (1.5 hours)

- [ ] Build TaskForm component with title/description inputs
- [ ] Add validation (required fields)
- [ ] Create "Add Task" button with modal or new screen
- [ ] Implement POST request to create task
- [ ] Add task detail screen with edit functionality
- [ ] Use dynamic route: `app/task/[id].tsx`
- [ ] Test: Create new task, edit existing task

## Phase 5: Navigation & UX (1.5 hours)

- [ ] Set up bottom tabs (Home, Profile, Settings)
- [ ] Add tab icons using Expo Icons
- [ ] Implement navigation to task detail on card press
- [ ] Add back button behavior
- [ ] Use KeyboardAvoidingView for forms
- [ ] Add SafeAreaView for notch/status bar
- [ ] Test: Smooth navigation between all screens

## Phase 6: React Native Specifics (1 hour)

- [ ] Add Platform-specific code (iOS vs Android difference)
- [ ] Implement haptic feedback on button press
- [ ] Add StatusBar component with custom styling
- [ ] Use one animation (fade in list items with Reanimated)
- [ ] Test on both iOS and Android if possible

## Phase 7: Polish (1 hour)

- [ ] Add error handling with user-friendly messages
- [ ] Style all components consistently with theme
- [ ] Add loading states for all async operations
- [ ] Implement optimistic updates for better UX
- [ ] Add swipe-to-delete gesture (optional)
- [ ] Test: All features work smoothly

## Testing Checklist

### Functionality

- [ ] User can register and login
- [ ] Token persists after app restart
- [ ] Tasks load from API
- [ ] User can create a new task
- [ ] User can edit an existing task
- [ ] User can delete a task
- [ ] User can mark task as complete/incomplete
- [ ] Pull-to-refresh updates task list
- [ ] Logout clears auth and returns to login

### UX

- [ ] Keyboard doesn't cover inputs
- [ ] Loading spinners show during API calls
- [ ] Error messages display when API fails
- [ ] Empty states show helpful messages
- [ ] Navigation feels smooth and intuitive
- [ ] App works in portrait and landscape
- [ ] Status bar looks good on both platforms

### React Native Specifics

- [ ] Using View, Text, Pressable (not HTML elements)
- [ ] Using FlatList for task list (not .map)
- [ ] Using StyleSheet.create for styles
- [ ] Using TypeScript with proper types
- [ ] Using hooks (useState, useEffect, custom hooks)
- [ ] At least one platform-specific code example
- [ ] At least one animation

## Interview Talking Points

After building this, you can speak to:

- **React Native basics**: View, Text, FlatList, navigation
- **Navigation**: Expo Router, tabs, stack, dynamic routes
- **State management**: Zustand (or mention Redux if asked)
- **API integration**: Axios, loading states, error handling
- **Storage**: AsyncStorage for tokens
- **Performance**: FlatList optimization, avoid re-renders
- **Platform differences**: iOS vs Android styling
- **TypeScript**: Type safety throughout
- **UX patterns**: Pull-to-refresh, optimistic updates, keyboard handling

## Quick Commands

```bash
# Start development server
npx expo start

# Run on iOS simulator (Mac only)
npx expo start --ios

# Run on Android emulator
npx expo start --android

# Clear cache if issues
npx expo start -c

# Type check
npx tsc --noEmit
```

## Common Issues & Solutions

**Metro bundler fails**: Clear cache with `npx expo start -c`

**AsyncStorage import error**: Make sure package is installed

**Navigation not working**: Check Expo Router setup in app/\_layout.tsx

**Styles not applying**: Remember StyleSheet.create and style prop (not className)

**Keyboard covers input**: Wrap form in KeyboardAvoidingView

**FlatList not rendering**: Check data prop format and keyExtractor
