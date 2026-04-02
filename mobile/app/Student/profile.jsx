import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronRight, Info, LockKeyhole, UserRoundPen } from 'lucide-react-native'
import { useNavigation, useRouter } from 'expo-router'
import { colors } from '../../constants/colors'
import Divider from '../../components/Divider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../../util/apiClient'
import { ENDPOINTS } from '../../constants/api'
import Loading from '../../components/Loading'
import Toast from 'react-native-toast-message'

const Profile = () => {
  const router = useRouter()
  const [studentDetails, setStudentDetails] = useState({
    firstName: '',
    lastName: '',
    semester: 0,
    rollNo: 0,
    department: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStudentDetails() {
      try {
        const data = await api.get(ENDPOINTS.STUDENT.PROFILE)
        setStudentDetails(data)
      }
      catch (error) {
        Toast.show({type:"error", text1:"Cannot load Profile",text2:error.message});
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    }
    loadStudentDetails();
  }, [])

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken')
    await AsyncStorage.removeItem('userRole')
    router.replace('/')
  }

  if(loading){
    return <Loading />
  }
  return (
    <SafeAreaView>
      <View className="items-center">
        <View className="mt-10 bg-muted/20 h-28 w-28 rounded-full items-center justify-center">
          <UserRoundPen color={colors.muted} size={40} />
        </View>
        <Text className="mx-8 mb-3 mt-5 text-4xl font-bold">
          {studentDetails.firstName + ' ' + studentDetails.lastName}
        </Text>
      </View>
      <View style={styles.container}>
        <View>
          <Text className="text-xl font-semibold text-muted">Department</Text>
          <Text className="text-muted">{studentDetails.department}</Text>
        </View>
        <Divider margin={10} />
        <View className="flex-row justify-between">
          <View className="flex-1 flex-row items-center justify-between">
            <Text className="font-semibold text-muted">Semester</Text>
            <Text className="text-muted">{studentDetails.semester}</Text>
          </View>
          <Divider orientation="vertical" margin={10} />
          <View className="flex-1 flex-row items-center justify-between">
            <Text className="font-semibold text-muted">Roll.no</Text>
            <Text className="text-muted">{studentDetails.rollNo}</Text>
          </View>
        </View>
      </View>
      <Text className="mx-8 font-bold text-xl text-muted mt-5">Settings</Text>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => router.push('/changePassword')}
          className="flex-row items-center justify-between"
        >
          <View className="flex-row">
            <LockKeyhole color={colors.muted} size={20} />
            <Text style={{ marginLeft: 10, marginTop: 2 }} className="text-muted font-semibold">
              Change Password
            </Text>
          </View>
          <View>
            <ChevronRight color={colors.muted} size={20} />
          </View>
        </TouchableOpacity>
        <View className="w-full bg-muted/40 h-[1px] rounded-full my-3"></View>
        <TouchableOpacity
          onPress={() => router.push('/about')}
          className="flex-row items-center justify-between"
        >
          <View className="flex-row">
            <Info color={colors.muted} size={20} />
            <Text style={{ marginLeft: 10, marginTop: 2 }} className="text-muted font-semibold">
              About App
            </Text>
          </View>
          <View>
            <ChevronRight color={colors.muted} size={20} />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleLogout}
        style={{ backgroundColor: colors.danger, marginHorizontal: 20, height: 50 }}
        className="items-center justify-center rounded-2xl my-5"
      >
        <Text className="text-surface font-semibold text-xl">Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
export default Profile
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 15,
    shadowColor: colors.muted,
    shadowRadius: 8,
    shadowOpacity: 0.2,
    padding: 20
  }
})
