import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { colors } from '../../constants/colors'
import { sessionDetailedAttendanceArray } from '../../mocks/mockdata'
import CircularFillBar from '../../components/CircularFillBar'
import Divider from '../../components/Divider'
import DetailsPageContainer from '../../components/DetailsPageContainer'
import { SafeAreaView } from 'react-native-safe-area-context'

const DetailsPage = () => {
  const { id } = useLocalSearchParams()
  const sessionDetailedAttendance = sessionDetailedAttendanceArray.find(
    (session) => session.sessionId === id,
  )
  const percentage =
    (sessionDetailedAttendance.present /
      (sessionDetailedAttendance.present + sessionDetailedAttendance.absent)) *
    100
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Stack.Screen
          options={{
            title: '',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: 'transparent', elevation: 0 },
            headerTransparent: true,
          }}
        />
        <View style={{ minHeight: 40 }}></View>
        <View style={styles.container}>
          <View className="flex-row">
            <View className="w-[65%] pr-3">
              <Text className="font-bold text-4xl mb-1 text-text">
                {sessionDetailedAttendance.subjectName}
              </Text>
              <View className="justify-center mt-3">
                <Text className="font-semibold text-xl text-text">Date:</Text>
                <Text className="text-muted text-xl">{sessionDetailedAttendance.sessionDate}</Text>
              </View>
            </View>
            <View className="w-[35%] items-end">
              <CircularFillBar size={100} fill={percentage} color={colors.primary} />
            </View>
          </View>
          <Divider />
          <View className="flex-row">
            <View className="flex-row items-center justify-between flex-1">
              <Text className="text-lg font-semibold">Present</Text>
              <Text className="text-success font-semibold text-lg">
                {sessionDetailedAttendance.present}
              </Text>
            </View>
            <Divider orientation="vertical" margin={10} />
            <View className="flex-1 flex-row items-center justify-between">
              <Text className="text-lg font-semibold">Absent</Text>
              <Text className="text-danger font-semibold text-lg">
                {sessionDetailedAttendance.absent}
              </Text>
            </View>
          </View>
        </View>
        <Text className="text-muted text-xl mx-8 font-semibold">Attendance</Text>
        <View style={[styles.container, { marginTop: 10 }]}>
          {sessionDetailedAttendance.attendanceDetails.map((attendance, index) => (
            <DetailsPageContainer
              key={attendance.rollNo}
              leftSideDetails={
                attendance.rollNo + '.\t' + attendance.firstName + ' ' + attendance.lastName
              }
              status={attendance.status}
              index={index}
              length={sessionDetailedAttendance.attendanceDetails.length}
            />
          ))}
        </View>
        <View style={{ minHeight: 20 }}></View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 30,
    shadowColor: colors.muted,
    shadowRadius: 8,
    shadowOpacity: 0.2,
    padding: 20,
  },
})

export default DetailsPage
