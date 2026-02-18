import {ScrollView, Text, View, StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {student,subjectAttendance} from "../../mocks/mockdata.js"
import HorizontalFillBar from "../../components/HorizontalFillBar";
import {History} from "lucide-react-native";
import SubjectContainer from "../../components/SubjectContainer";
export default function Index() {
  let overAllTotalClasses = 0;
  let overAllTotalAttended = 0;
  subjectAttendance.map(subject => {
    overAllTotalClasses+=subject.totalClasses
    overAllTotalAttended += subject.attended
  })
  let overAllTotalAttendance=Math.round((overAllTotalAttended/overAllTotalClasses)*100);
  let fillColor = "";
  if (overAllTotalAttendance > 75) {
    fillColor = "#22C55E";
  } else if (overAllTotalAttendance < 25) {
    fillColor = "#F56260";
  } else {
    fillColor = "#40a5e6";
  }
  return (
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 min-w-full" contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}>
          <Text className="mx-8 mb-3 mt-10 text-4xl font-bold">Welcome, {student.firstName}</Text>
          <View className="flex flex-row mx-8">
            <Text className="mr-3 text-xl text-gray-500">Roll no: {student.rollNo}</Text>
            <Text className="text-xl text-gray-500">Semester: {student.semester}</Text>
          </View>
          <View style={styles.container}>
            <View className="flex flex-row items-center">
              <History size={45} color="#a6a6a6"/>
              <View className="ml-2">
                <Text className="text-2xl font-semibold">Overview</Text>
                <Text className="text-gray-500 my-1">Overall Attendance</Text>
              </View>
            </View>
            <Text className="min-w-full text-right mr-3 text-5xl font-bold mb-3">{overAllTotalAttendance}%</Text>
            <HorizontalFillBar
              fill={overAllTotalAttendance}
              fillStyle={{backgroundColor:fillColor}}
            />
            <View className="flex flex-row mt-5 justify-between gap-x-3">
              <View className="flex-1 flex-row justify-between">
                <Text className="text-xl">Total Classes</Text>
                <Text className="text-xl font-semibold">{overAllTotalClasses}</Text>
              </View>
              <View className="bg-gray-600/40 w-0.5 rounded-full"></View>
              <View className="flex-1 flex-row justify-between">
                <Text className="text-xl">Attended</Text>
                <Text className="text-xl font-semibold">{overAllTotalAttended}</Text>
              </View>
            </View>
          </View>
          <Text className="text-xl font-semibold text-gray-600 mx-8">Subjects</Text>
          {subjectAttendance.map((subject,index)=> <SubjectContainer key={subject.subjectId} subjectName={subject.subjectName} totalClasses={subject.totalClasses} attended={subject.attended}/>)}
          <View style={{height:80}}></View>
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius : 20,
    marginHorizontal : 20,
    marginVertical : 30,
    shadowColor : "gray",
    shadowRadius : 8,
    shadowOpacity : 0.2,
    padding : 20
  }
})
