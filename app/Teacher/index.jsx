import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { teacher, teacherInfoPanelData, teacherSubjectData } from '../../mocks/mockdata'
import TeacherInfoPanelContainer from '../../components/TeacherInfoPanelContainer'
import TeacherSubjectContainer from '../../components/TeacherSubjectContainer'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../constants/colors'
import { useRouter } from 'expo-router'
import { QrCode } from 'lucide-react-native'

const Index = () => {
  const router = useRouter()
  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="flex-1 min-w-full"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="mx-8 mt-10 text-4xl font-bold">Welcome,</Text>
        <Text className="mx-8 mb-3 text-4xl font-bold">
          {teacher.title} {teacher.firstName} {teacher.lastName}
        </Text>
        <View className="flex-row flex-wrap px-6 mt-4">
          <View className="w-1/3 p-2">
            <TeacherInfoPanelContainer
              icon={
                <MaterialCommunityIcons
                  name="book-open-page-variant"
                  size={24}
                  color={colors.primary}
                />
              }
              value={teacherInfoPanelData.noOfSubjects}
              heading="Subjects"
            />
          </View>
          <View className="w-1/3 p-2">
            <TeacherInfoPanelContainer
              icon={<Ionicons name="people" size={24} color={colors.primary} />}
              value={teacherInfoPanelData.totalStudents}
              heading="Total Students"
            />
          </View>
          <View className="w-1/3 p-2">
            <TeacherInfoPanelContainer
              icon={<FontAwesome name="check-circle" size={24} color={colors.primary} />}
              value={teacherInfoPanelData.averageAttendance + '%'}
              heading="Average Attendance"
            />
          </View>
        </View>
        <View className="px-6 mt-6">
          <TouchableOpacity
            style={styles.generateButton}
            onPress={() => router.push('/Teacher/qrcode')}
          >
            <View className="flex-row">
              <QrCode size={20} color={colors.surface} />
              <Text style={styles.generateButtonText}>Generate QR</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="px-6 mt-6">
          <Text style={styles.sectionTitle}>Recent Sessions</Text>
          <View style={styles.sectionList}>
            {teacherSubjectData.map((session) => (
              <TeacherSubjectContainer
                key={session.subjectId}
                subjectId={session.subjectId}
                subjectName={session.subjectName}
                sessionDate={session.sessionDate}
                present={session.present}
                absent={session.absent}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default Index
const styles = StyleSheet.create({
  generateButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  generateButtonText: {
    marginLeft: 2,
    color: colors.background,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  sectionList: {
    marginTop: 12,
    paddingBottom: 24,
  },
})
