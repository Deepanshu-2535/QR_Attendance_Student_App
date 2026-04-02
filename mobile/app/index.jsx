import { ScrollView, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, withOpacity } from '../constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import api from '../util/apiClient'
import { ENDPOINTS } from '../constants/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'

const Index = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(()=>{

  },[])

  async function handleLogin() {
    setLoading(true)
    try {
      const data = await api.post(ENDPOINTS.AUTH, {
        email,
        password
      })
      await AsyncStorage.setItem('authToken', data.token)
      await AsyncStorage.setItem('userRole', data.role)
      if (data.role === 'STUDENT') {
        router.replace('/Student')
      } else if (data.role === 'TEACHER') {
        router.replace('/Teacher')
      }
    }
    catch(e){
      Toast.show({type:'error',text1:"Error in logging in",text2:e.message});
    }
    finally {
      setLoading(false)
    }

  }

  return (
    <View style={styles.page}>
      <View style={styles.pageAccentTop} />
      <View style={styles.pageAccentBottom} />
      <View style={styles.pageAccentSide} />
      <SafeAreaView className="flex-1">
        <ScrollView
          className="flex-1 min-w-full"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.appHeader}>
            <View style={styles.appIconPlaceholder}>
              <Text style={styles.appIconText}>APP</Text>
            </View>
            <Text style={styles.appName}>App Name</Text>
          </View>

          <Text className="mx-8 mb-3 mt-6 text-4xl font-bold">Welcome Back</Text>
          <Text className="mx-8 text-xl text-muted">
            Sign in with your college email ID to continue.
          </Text>

          <View style={styles.card}>
            <Text className="text-2xl font-semibold mb-1">Sign In</Text>
            <Text className="text-muted mb-4">Enter your credentials.</Text>
            <Text className="text-muted font-semibold mt-2 mb-2">College Email</Text>
            <TextInput
              placeholder="name@college.edu"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              className="bg-background rounded-xl px-4 py-3 text-base text-text"
              style={styles.input}
              value={email}
              onChangeText={email => setEmail(email)}
            />

            <Text className="text-muted font-semibold mt-4 mb-2">Password</Text>
            <TextInput
              placeholder="Enter your password"
              secureTextEntry
              className="bg-background rounded-xl px-4 py-3 text-base text-text"
              style={styles.input}
              value={password}
              onChangeText={password => setPassword(password)}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text className="text-surface font-semibold text-xl">Log In</Text>
          </TouchableOpacity>

          <Text className="mx-8 mt-4 text-muted">
            Need help? Contact your department or campus admin.
          </Text>
          <View style={{ height: 120 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background
  },
  pageAccentTop: {
    position: 'absolute',
    top: -120,
    right: -60,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: withOpacity(colors.primary, 0.1)
  },
  pageAccentBottom: {
    position: 'absolute',
    bottom: -160,
    left: -80,
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: withOpacity(colors.primary, 0.08)
  },
  pageAccentSide: {
    position: 'absolute',
    top: 220,
    left: -120,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: withOpacity(colors.primary, 0.06)
  },
  appHeader: {
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  appIconPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: withOpacity(colors.primary, 0.25),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.muted,
    shadowRadius: 10,
    shadowOpacity: 0.2
  },
  appIconText: {
    color: colors.primary,
    fontWeight: '700',
    letterSpacing: 0.6
  },
  appName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 16,
    shadowColor: colors.muted,
    shadowRadius: 8,
    shadowOpacity: 0.2,
    padding: 20,
    paddingBottom: 40
  },
  button: {
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    marginTop: 10,
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 12,
    textAlignVertical: 'center'
  }
})
