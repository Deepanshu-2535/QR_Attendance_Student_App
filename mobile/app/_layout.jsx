import { Stack, useRouter, useSegments } from 'expo-router'
import './global.css'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../components/Loading'
import Toast from 'react-native-toast-message'

export default function RootLayout() {
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [authRole, setAuthRole] = useState(null)
  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    let isMounted = true
    let timeoutId
    async function checkExistingSession() {
      try {
        timeoutId = setTimeout(() => {
          if (isMounted) setCheckingAuth(false)
        }, 2500)

        const [token, role] = await Promise.all([
          AsyncStorage.getItem('authToken'),
          AsyncStorage.getItem('userRole')
        ])
        if (isMounted) {
          setAuthRole(token && role ? role : null)
        }
      } finally {
        if (timeoutId) clearTimeout(timeoutId)
        if (isMounted) setCheckingAuth(false)
      }
    }

    checkExistingSession()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (checkingAuth) return
    let isMounted = true
    async function enforceRoleRoute() {
      const [token, role] = await Promise.all([
        AsyncStorage.getItem('authToken'),
        AsyncStorage.getItem('userRole')
      ])
      if (!isMounted) return
      const resolvedRole = token && role ? role : null
      if (resolvedRole !== authRole) setAuthRole(resolvedRole)
      if (!resolvedRole) return
      const topRoute = segments[0]
      const isStudentRoute = topRoute === 'Student' || topRoute === 'StudentDetails'
      const isTeacherRoute = topRoute === 'Teacher' || topRoute === 'TeacherDetails'
      const isSharedRoute = topRoute === 'about' || topRoute === 'changePassword'
      if (resolvedRole === 'STUDENT' && !isStudentRoute) {
        if (isSharedRoute) return
        router.replace('/Student')
      }
      if (resolvedRole === 'TEACHER' && !isTeacherRoute) {
        if (isSharedRoute) return
        router.replace('/Teacher')
      }
    }
    enforceRoleRoute()
    return () => {
      isMounted = false
    }
  }, [checkingAuth, authRole, segments, router])

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
      {checkingAuth ? (
        <Loading
          message="Checking session..."
          style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
        />
      ) : null}
      <Toast position={'bottom'}/>
    </SafeAreaProvider>
  )
}
