# React Native Project Structure

## Setup Requirements

- **Node.js** (v18+)
- **Expo CLI**: `npm install -g expo-cli`
- **Expo Go app** on your phone (iOS/Android)
- **VS Code** with React Native Tools extension

## Initialize Project

```bash
npx create-expo-app my-rn-app --template tabs
cd my-rn-app
npm install zustand axios @react-native-async-storage/async-storage
```

## Folder Structure

```
my-rn-app/
├── app/
│   ├── (auth)/                   # Auth screens group
│   │   ├── login.tsx             # Login screen
│   │   └── register.tsx          # Register screen
│   ├── (tabs)/                   # Main app with bottom tabs
│   │   ├── _layout.tsx           # Tab navigator configuration
│   │   ├── index.tsx             # Home/Tasks list screen
│   │   ├── profile.tsx           # User profile screen
│   │   └── settings.tsx          # Settings screen
│   ├── task/[id].tsx             # Task detail screen (dynamic route)
│   └── _layout.tsx               # Root layout (auth check)
├── components/                   # Reusable UI components
│   ├── TaskCard.tsx              # Individual task card
│   ├── TaskForm.tsx              # Create/edit task form
│   ├── Button.tsx                # Custom button component
│   └── Input.tsx                 # Custom text input
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts                # Authentication logic
│   ├── useTasks.ts               # Task CRUD operations
│   └── useAsync.ts               # Generic async state handler
├── services/                     # External integrations
│   ├── api.ts                    # API client (axios config)
│   └── storage.ts                # AsyncStorage wrapper
├── types/                        # TypeScript definitions
│   └── index.ts                  # Task, User, etc types
├── constants/                    # App-wide constants
│   └── theme.ts                  # Colors, spacing, fonts
└── utils/                        # Helper functions
    └── validation.ts             # Form validation
```

## Key Files Explained

### `app/_layout.tsx`

Root layout that checks if user is authenticated and redirects appropriately.

### `app/(tabs)/_layout.tsx`

Configures bottom tab navigation with icons and labels.

### `components/TaskCard.tsx`

Displays a single task with title, description, and complete/delete actions.

### `hooks/useAuth.ts`

Handles login, logout, token storage, and auth state.

### `services/api.ts`

Axios instance with base URL and interceptors for auth tokens.

### `services/storage.ts`

Wrapper around AsyncStorage for saving/retrieving data locally.

## Core Libraries

- **expo-router**: File-based navigation
- **zustand**: Lightweight state management
- **axios**: HTTP client for API calls
- **@react-native-async-storage/async-storage**: Local data persistence
- **react-native-reanimated**: Smooth animations
- **react-native-gesture-handler**: Touch gestures

## React Native vs React Key Differences

- Use `<View>` instead of `<div>`
- Use `<Text>` instead of `<span>` or `<p>`
- Use `<Pressable>` or `<TouchableOpacity>` instead of `<button>`
- Use `<TextInput>` instead of `<input>`
- Use `<FlatList>` instead of `.map()` for long lists (performance)
- Use `<ScrollView>` instead of relying on overflow scroll
- Styling with JavaScript objects, not CSS files
- No className - use `style` prop
- Flexbox by default
