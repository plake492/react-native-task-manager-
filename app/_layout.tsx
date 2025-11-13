import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { colors } from '@/constants/theme';
import routes from '@/constants/stackRoutes';

export default function RootLayout() {
  const { user, loading, signOut } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [user, loading, segments]);

  if (loading) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#9198e5'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerRight: () => (
          <Pressable onPress={handleSignOut} style={{ marginRight: 0, marginBottom: 1 }}>
            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
              <Text style={{ color: colors.text, fontWeight: 'bold' }}>Logout</Text>
              <Ionicons name="log-out-outline" size={24} color={colors.text} />
            </View>
          </Pressable>
        )
      }}
    >
      {routes.map(({ name, options }) => (
        <Stack.Screen name={name} options={options} />
      ))}
    </Stack>
  );
}
