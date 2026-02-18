import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {student} from "../../mocks/mockdata";
import {ChevronRight, Info, LockKeyhole, UserRoundPen} from "lucide-react-native";
import {useNavigation, useRouter} from "expo-router";

const Profile = () => {
    const router  = useRouter();
    return (
        <SafeAreaView>
            <View className="items-center">
                <View className="mt-10 bg-gray-600/20 h-28 w-28 rounded-full items-center justify-center">
                    <UserRoundPen color="#666666" size={40}/>
                </View>
                <Text className="mx-8 mb-3 mt-5 text-4xl font-bold">{student.firstName + " "+ student.lastName}</Text>
            </View>
            <View style={styles.container}>
                <View>
                    <Text className="text-xl font-semibold text-gray-500">Department</Text>
                    <Text className="text-gray-500">School of Computer Science</Text>
                </View>
                <View className="w-full bg-gray-600/40 h-[1px] rounded-full my-3"></View>
                <View className="flex-row justify-between gap-x-3">
                    <View className="flex-1 flex-row items-center justify-between">
                        <Text className="font-semibold text-gray-500">Semester</Text>
                        <Text className="text-gray-500">{student.semester}</Text>
                    </View>
                    <View className="bg-gray-600/40 w-0.5 rounded-full"></View>
                    <View className="flex-1 flex-row items-center justify-between ml-5">
                        <Text className="font-semibold text-gray-500 ml-5">Roll.no</Text>
                        <Text className="text-gray-500 mr-5">{student.rollNo}</Text>
                    </View>
                </View>
            </View>
            <Text className="mx-8 font-bold text-xl text-gray-500 mt-5">Settings</Text>
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>router.push('/changePassword')} className="flex-row items-center justify-between">
                    <View className="flex-row">
                        <LockKeyhole color="#666666" size={20}/>
                        <Text style={{marginLeft: 10,marginTop:2}} className="text-gray-500 font-semibold">Change Password</Text>
                    </View>
                    <View>
                        <ChevronRight color="#666666" size={20}/>
                    </View>
                </TouchableOpacity>
                <View className="w-full bg-gray-600/40 h-[1px] rounded-full my-3"></View>
                <TouchableOpacity onPress={()=>router.push('/about')} className="flex-row items-center justify-between">
                    <View className="flex-row">
                        <Info color="#666666" size={20}/>
                        <Text style={{marginLeft: 10,marginTop:2}} className="text-gray-500 font-semibold">About App</Text>
                    </View>
                    <View>
                        <ChevronRight color="#666666" size={20}/>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{backgroundColor:"#dc2626",marginHorizontal:20,height:50}} className="items-center justify-center rounded-2xl my-5">
                <Text className="text-white font-semibold text-xl">Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
export default Profile
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius : 20,
        marginHorizontal : 20,
        marginVertical : 15,
        shadowColor : "gray",
        shadowRadius : 8,
        shadowOpacity : 0.2,
        padding : 20
    }
})
