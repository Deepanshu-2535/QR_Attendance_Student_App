import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { teacherDetails, teacherInfoPanelData, teacherSessionHistory } from '../../mocks/mockdata'
import TeacherInfoPanelContainer from '../../components/TeacherInfoPanelContainer'
import TeacherSessionContainer from '../../components/TeacherSessionContainer'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../constants/colors'
import { useFocusEffect, useRouter } from 'expo-router'
import { QrCode } from 'lucide-react-native'
import api from '../../util/apiClient'
import { ENDPOINTS } from '../../constants/api'
import Loading from '../../components/Loading'
import Toast from 'react-native-toast-message'

const Index = () => {
  const router = useRouter()
  const [teacherDetails, setTeacherDetails] = useState({
    title : '',
    firstName: '',
    lastName: '',
    noOfSubjects:0,
    totalStudents:0,
    averageAttendancePercentage: 0,
    sessionHistory: []
  })
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function loadTeacherDetails() {
        try{
          const data = await api.get(ENDPOINTS.TEACHER.DASHBOARD);
          setTeacherDetails(data);
        }
        catch(error){
          Toast.show({type:'error',text1:"Cannot load Teacher Details",text2:error.message});
          console.error(error)
        }
        finally {
          setLoading(false);
        }
      }
      loadTeacherDetails();
    }, [])
  )

  if(loading){
    return <Loading />
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="flex-1 min-w-full"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="mx-8 mt-10 text-4xl font-bold">Welcome,</Text>
        <Text className="mx-8 mb-3 text-4xl font-bold">
          {teacherDetails.title} {teacherDetails.firstName} {teacherDetails.lastName}
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
              value={teacherDetails.noOfSubjects}
              heading="Subjects"
            />
          </View>
          <View className="w-1/3 p-2">
            <TeacherInfoPanelContainer
              icon={<Ionicons name="people" size={24} color={colors.primary} />}
              value={teacherDetails.totalStudents}
              heading="Total Students"
            />
          </View>
          <View className="w-1/3 p-2">
            <TeacherInfoPanelContainer
              icon={<FontAwesome name="check-circle" size={24} color={colors.primary} />}
              value={teacherDetails.averageAttendancePercentage + '%'}
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
            {teacherDetails.sessionHistory.map((session) => (
              <TeacherSessionContainer
                key={session.sessionId}
                sessionId={session.sessionId}
                subjectName={session.subjectName}
                sessionDate={session.sessionDate}
                present={session.noOfStudentsPresent}
                absent={session.totalNoOfStudents - session.noOfStudentsPresent}
              />
            ))}
          </View>
        </View>
        <View style={{height:50}}/>
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
