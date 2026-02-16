import {ScrollView, Text, View, StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {student} from "../../mocks/mockdata.js"
import HorizontalFillBar from "../../components/HorizontalFillBar";
import {History} from "lucide-react-native";
export default function Index() {
  return (
      <SafeAreaView className="">
        <ScrollView className="min-h-screen min-w-screen">
          <Text className="mx-8 mb-3 mt-10 text-4xl font-bold">Welcome, {student.firstName}</Text>
          <View className="flex flex-row mx-8">
            <Text className="mr-3 text-xl text-gray-500">Roll no: {student.rollNo}</Text>
            <Text className="text-xl text-gray-500">Semester: {student.semester}</Text>
          </View>
          <View style={styles.container}>
            <View className="flex flex-row items-center">
              <History size={45} color="#525252"/>
              <View className="ml-2">
                <Text className="text-2xl font-semibold">Overview</Text>
                <Text className="text-gray-500 my-1">Overall Attendance</Text>
              </View>
            </View>
            <Text className="min-w-full text-right mr-3 text-5xl font-bold mb-3">85%</Text>
            <HorizontalFillBar fill={85}/>
          </View>
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
