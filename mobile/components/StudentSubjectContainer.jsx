import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import HorizontalFillBar from './HorizontalFillBar'
import { ChevronRight } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import { colors } from '../constants/colors'

const StudentSubjectContainer = ({ subjectCode, subjectName, totalClasses, attended }) => {
  const [totalAttendance, setTotalAttendance] = useState(
    Math.round((attended / totalClasses) * 100),
  )
  const router = useRouter()
  let fillColor
  if (totalAttendance > 75) {
    fillColor = colors.success
  } else if (totalAttendance < 25) {
    fillColor = colors.danger
  } else {
    fillColor = colors.primary
  }

  return (
    <TouchableOpacity
      onPress={() => router.push(`/StudentDetails/${subjectCode}`)}
      style={styles.container}
    >
      <View className="flex-row">
        <View className="flex-1 justify-center">
          <Text className="text-2xl font-bold">{subjectName}</Text>
          <Text className="text-muted font-semibold">
            Attendance: {attended} / {totalClasses}
          </Text>
        </View>
        <View className="flex-1 justify-center">
          <Text className="text-right text-4xl font-bold">{totalAttendance}%</Text>
        </View>
        <View className="justify-center ml-2">
          <ChevronRight color={colors.muted} />
        </View>
      </View>
      <View className="mt-5">
        <HorizontalFillBar fill={totalAttendance} fillStyle={{ backgroundColor: fillColor }} />
      </View>
    </TouchableOpacity>
  )
}
export default StudentSubjectContainer
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: colors.muted,
    shadowRadius: 8,
    shadowOpacity: 0.2,
    padding: 20,
  },
})
