import {StyleSheet, Text, View} from 'react-native'
import React, {useState} from 'react'
import HorizontalFillBar from "./HorizontalFillBar";
import {ChevronRight} from "lucide-react-native";

const SubjectContainer = ({subjectName,totalClasses,attended}) => {
    const [totalAttendance,setTotalAttendance] = useState(Math.round((attended/totalClasses)*100));
    let fillColor;
    if(totalAttendance>75){
        fillColor = "#22C55E"
    }
    else if(totalAttendance<25){
        fillColor = "#F56260"
    }
    else{
        fillColor = "#40a5e6"
    }

    return (
        <View style = {styles.container}>
            <View className="flex-row">
                <View className="flex-1 justify-center">
                    <Text className="text-2xl font-bold">{subjectName}</Text>
                    <Text className="text-gray-500 font-semibold">Attendance: {attended} / {totalClasses}</Text>
                </View>
                <View className="flex-1 justify-center">
                    <Text className="text-right text-4xl font-bold">{totalAttendance}%</Text>
                </View>
                <View className="justify-center ml-2">
                    <ChevronRight color="#a6a6a6" />
                </View>
            </View>
            <View className="mt-5">
                <HorizontalFillBar fill={totalAttendance} fillStyle={{backgroundColor:fillColor}}/>
            </View>
        </View>
    )
}
export default SubjectContainer
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius : 20,
        marginHorizontal : 20,
        marginVertical : 10,
        shadowColor : "gray",
        shadowRadius : 8,
        shadowOpacity : 0.2,
        padding : 20
    }
})
