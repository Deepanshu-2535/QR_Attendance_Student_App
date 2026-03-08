import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { detailedAttendance } from '../../mocks/mockdata'
import CircularFillBar from '../../components/CircularFillBar'
import Divider from '../../components/Divider'
import { colors } from '../../constants/colors'
import { CircleCheck, CircleX } from 'lucide-react-native'
import { formatDate } from '../../util/dateFormat'
import { ViewSlot } from 'expo-router/build/ui/common'

const Id = () => {
  const { id } = useLocalSearchParams()
  const attendanceDetails = detailedAttendance.find((subject) => subject.subjectId == id)
  const percentage = Math.round(
    (attendanceDetails.summary.attended / attendanceDetails.summary.total) * 100,
  )
  const fillcolor =
    percentage > 75 ? colors.success : percentage < 25 ? colors.danger : colors.primary
  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.background, elevation: 0 },
        }}
      />
      <View style={styles.container}>
        <View className="flex-row">
          <View className="w-[65%] pr-3">
            <Text className="font-bold text-4xl mb-1 text-text">
              {attendanceDetails.subjectName}
            </Text>
            <View className="justify-center mt-3">
              <Text className="font-semibold text-xl text-text">Total Classes</Text>
              <Text className="text-muted text-xl">{attendanceDetails.summary.total}</Text>
            </View>
          </View>
          <View className="w-[35%] items-end">
            <CircularFillBar size={100} fill={percentage} color={fillcolor} />
          </View>
        </View>
        <Divider />
        <View className="flex-row">
          <View className="flex-row items-center justify-between flex-1">
            <Text className="text-lg font-semibold">Attended</Text>
            <Text className="text-success font-semibold text-lg">
              {attendanceDetails.summary.attended}
            </Text>
          </View>
          <Divider orientation="vertical" margin={10} />
          <View className="flex-1 flex-row items-center justify-between">
            <Text className="text-lg font-semibold">Missed</Text>
            <Text className="text-danger font-semibold text-lg">
              {attendanceDetails.summary.total - attendanceDetails.summary.attended}
            </Text>
          </View>
        </View>
      </View>
      <Text className="text-muted text-xl mx-8 font-semibold">History</Text>
      <View style={[styles.container, { marginTop: 10 }]}>
        {attendanceDetails.history.map((history, index) => {
          return (
            <View key={history.date}>
              <View className="flex-row justify-between">
                <Text className="font-semibold">{formatDate(history.date)}</Text>
                <View>
                  {history.status === 'PRESENT' ? (
                    <View className="flex-row">
                      <CircleCheck size={20} color={colors.success} />
                      <Text className="ml-3 text-muted">PRESENT</Text>
                    </View>
                  ) : (
                    <View className="flex-row">
                      <CircleX size={20} color={colors.danger} />
                      <Text className="ml-5 text-danger">ABSENT</Text>
                    </View>
                  )}
                </View>
              </View>
              {index !== attendanceDetails.history.length - 1 ? (
                <Divider margin={10} />
              ) : (
                <View></View>
              )}
            </View>
          )
        })}
      </View>
    </>
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
    padding: 20,
  },
})
