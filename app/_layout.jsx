import { Stack } from 'expo-router'
import './global.css'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Home } from 'lucide-react-native'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerBackTitleVisible: false }}>
        <Stack.Screen
          name="index"
          options={{ headerBackTitleVisible: false, headerShown: false }}
        />
        <Stack.Screen name="Student" options={{ title: '', headerShown: false }} />
        <Stack.Screen name="Teacher" options={{ title: '', headerShown: false }} />
        <Stack.Screen
          name="about"
          options={{ title: '', headerBackTitleVisible: false, headerTransparent: true }}
        />
        <Stack.Screen
          name="changePassword"
          options={{
            title: '',
            headerBackTitleVisible: false,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="StudentDetails/[id]"
          options={{ title: 'Details', headerShown: true }}
        />
        <Stack.Screen
          name="TeacherDetails/[id]"
          options={{ title: 'Details', headerShown: true }}
        />
      </Stack>
    </SafeAreaProvider>
  )
}
