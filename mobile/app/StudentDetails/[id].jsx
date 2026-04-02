import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import CircularFillBar from '../../components/CircularFillBar'
import Divider from '../../components/Divider'
import { colors } from '../../constants/colors'
import DetailsPageContainer from '../../components/DetailsPageContainer'
import { formatDate } from '../../util/dateFormat'
import { SafeAreaView } from 'react-native-safe-area-context'
import api from '../../util/apiClient'
import { ENDPOINTS } from '../../constants/api'
import Loading from '../../components/Loading'
import Toast from 'react-native-toast-message'

const Id = () => {
  const [attendanceDetails, setAttendanceDetails] = useState({
    subjectCode: '',
    subjectName: '',
    totalClasses: 0,
    attended: 3,
    history: []
  })
  const [loading, setLoading] = useState(true)
  const { id } = useLocalSearchParams()
  useEffect(() => {
    async function loadAttendanceDetails() {
      if (!id) {
        setLoading(false)
        return
      }
      try {
        const data = await api.get(ENDPOINTS.STUDENT.SUBJECT(id))
        setAttendanceDetails(data)
      }
      catch (error) {
        Toast.show({type:'error', text1: 'Error loading details',text2:error.message});
        console.error(error)
      }
      finally {
        setLoading(false)
      }
    }
    loadAttendanceDetails()
  }, [id])

  const percentage = attendanceDetails.totalClasses
    ? Math.round((attendanceDetails.attended / attendanceDetails.totalClasses) * 100)
    : 0
  const fillColor =
    percentage > 75 ? colors.success : percentage < 25 ? colors.danger : colors.primary

  if(loading){
    return <SafeAreaView className="flex-1">
      <Stack.Screen
        options={{
          title: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: 'transparent', elevation: 0 },
          headerTransparent: true
        }}
      />
      <Loading visible={loading} />
    </SafeAreaView>
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <Stack.Screen
          options={{
            title: '',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: 'transparent', elevation: 0 },
            headerTransparent: true
          }}
        />
        <View style={{ minHeight: 40 }}></View>
        <View style={styles.container}>
          <View className="flex-row">
            <View className="w-[65%] pr-3">
              <Text className="font-bold text-4xl mb-1 text-text">
                {attendanceDetails.subjectName}
              </Text>
              <View className="justify-center mt-3">
                <Text className="font-semibold text-xl text-text">Total Classes</Text>
                <Text className="text-muted text-xl">{attendanceDetails.totalClasses}</Text>
              </View>
            </View>
            <View className="w-[35%] items-end">
              <CircularFillBar size={100} fill={percentage} color={fillColor} />
            </View>
          </View>
          <Divider />
          <View className="flex-row">
            <View className="flex-row items-center justify-between flex-1">
              <Text className="text-lg font-semibold">Attended</Text>
              <Text className="text-success font-semibold text-lg">
                {attendanceDetails.attended}
              </Text>
            </View>
            <Divider orientation="vertical" margin={10} />
            <View className="flex-1 flex-row items-center justify-between">
              <Text className="text-lg font-semibold">Missed</Text>
              <Text className="text-danger font-semibold text-lg">
                {attendanceDetails.totalClasses - attendanceDetails.attended}
              </Text>
            </View>
          </View>
        </View>
        <Text className="text-muted text-xl mx-8 font-semibold">History</Text>
        <View style={[styles.container, { marginTop: 10 }]}>
          {attendanceDetails.history.map((history, index) => (
            <DetailsPageContainer
              key={history.date}
              leftSideDetails={formatDate(history.date)}
              status={history.status}
              index={index}
              length={attendanceDetails.history.length}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default Id
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 30,
    shadowColor: colors.muted,
    shadowRadius: 8,
    shadowOpacity: 0.2,
    padding: 20
  }
})
