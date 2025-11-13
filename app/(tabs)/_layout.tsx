import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { colors } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';

export default function TabLayout() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.disabled,
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.headerBackground
        },
        headerTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground,
          borderTopColor: colors.border
        },
        headerRight: () => (
          <Pressable onPress={handleSignOut} style={{ marginRight: 16, marginBottom: 1 }}>
            <Ionicons name="log-out-outline" size={24} color={colors.text} />
          </Pressable>
        )
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />
        }}
      />
    </Tabs>
  );
}
