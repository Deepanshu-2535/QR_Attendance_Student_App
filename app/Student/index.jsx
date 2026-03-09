import { ScrollView, Text, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { studentDetails, studentSubjectWiseAttendance } from '../../mocks/mockdata.js'
import HorizontalFillBar from '../../components/HorizontalFillBar'
import { History } from 'lucide-react-native'
import StudentSubjectContainer from '../../components/StudentSubjectContainer'
import Divider from '../../components/Divider'
import { colors } from '../../constants/colors'
export default function Index() {
  let overAllTotalClasses = 0
  let overAllTotalAttended = 0
  studentSubjectWiseAttendance.map((subject) => {
    overAllTotalClasses += subject.totalClasses
    overAllTotalAttended += subject.attended
  })
  let overAllTotalAttendance = Math.round((overAllTotalAttended / overAllTotalClasses) * 100)
  let fillColor = ''
  if (overAllTotalAttendance > 75) {
    fillColor = colors.success
  } else if (overAllTotalAttendance < 25) {
    fillColor = colors.danger
  } else {
    fillColor = colors.primary
  }
  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="flex-1 min-w-full"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="mx-8 mb-3 mt-10 text-4xl font-bold">
          Welcome, {studentDetails.firstName}
        </Text>
        <View className="flex flex-row mx-8">
          <Text className="mr-3 text-xl text-muted">Roll no: {studentDetails.rollNo}</Text>
          <Text className="text-xl text-muted">Semester: {studentDetails.semester}</Text>
        </View>
        <View style={styles.container}>
          <View className="flex flex-row items-center">
            <History size={45} color={colors.muted} />
            <View className="ml-2">
              <Text className="text-2xl font-semibold">Overview</Text>
              <Text className="text-muted my-1">Overall Attendance</Text>
            </View>
          </View>
          <Text className="min-w-full text-right mr-3 text-5xl font-bold mb-3">
            {overAllTotalAttendance}%
          </Text>
          <HorizontalFillBar
            fill={overAllTotalAttendance}
            fillStyle={{ backgroundColor: fillColor }}
          />
          <View className="flex flex-row mt-5 justify-between gap-x-3">
            <View className="flex-1 flex-row justify-between">
              <Text className="text-xl">Total Classes</Text>
              <Text className="text-xl font-semibold justify-end">{overAllTotalClasses}</Text>
            </View>
            <Divider orientation="vertical" margin={2} />
            <View className="flex-1 flex-row justify-between">
              <Text className="text-xl">Attended</Text>
              <Text className="text-xl font-semibold">{overAllTotalAttended}</Text>
            </View>
          </View>
        </View>
        <Text className="text-xl font-semibold text-muted mx-8">Subjects</Text>
        {studentSubjectWiseAttendance.map((subject, index) => (
          <StudentSubjectContainer
            key={subject.subjectId}
            subjectId={subject.subjectId}
            subjectName={subject.subjectName}
            totalClasses={subject.totalClasses}
            attended={subject.attended}
          />
        ))}
        <View style={{ height: 80 }}></View>
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
