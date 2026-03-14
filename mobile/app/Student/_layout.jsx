import {View, Text} from 'react-native'
import React from 'react'
import {Tabs} from "expo-router";
import {Image, ImageBackground} from "react-native";
import {ChartPie, History, House, ScanQrCode, UserRound} from "lucide-react-native"
import home from "../../assets/images/home.png"
import {colors} from "../../constants/colors";

const TabIcon = ({focused,icon,highlighted,text}) =>{
    if(focused){
        return(
            <ImageBackground className="flex w-full h-full justify-center items-center bg-background rounded-full ">
                {highlighted}
                <Text className="text-primary text-sm">{text}</Text>
            </ImageBackground>
        )
    }
    return(
        <ImageBackground className="flex-1 justify-center items-center">
            {icon}
            <Text className="text-muted text-sm">{text}</Text>
        </ImageBackground>
    )
}

const tabsLayout = () => {
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle:{
                width:'100%',
                height:'100%',
                justifyContent:'center',
                alignItems:'center',
                marginBottom:0
            },
            tabBarIconStyle:{
                margin:0,
                height:'100%',
                width:'100%',
            },
            tabBarStyle:{
                paddingBottom:0,
                position:'absolute',
                shadowColor: colors.text,
                shadowRadius : 7,
                shadowOpacity: 0.1,
                borderRadius : 50,
                marginHorizontal : 20,
                marginBottom : 30,
                height:70,
            }
        }}>
            <Tabs.Screen name="index" options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} text="Home" icon={<House size={25} />} highlighted={<House size={25} color={colors.primary} />} />
                )
            }}/>
            <Tabs.Screen name="scan" options={{
                title: "Scan" ,
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} text="Scan" icon={<ScanQrCode size={25} />} highlighted={<ScanQrCode size={25} color={colors.primary} />} />
                )
            }}/>
            <Tabs.Screen name="profile" options={{
                title: "Profile",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} text="Profile" icon={<UserRound size={25}/>} highlighted={<UserRound size={25} color={colors.primary} />} />
                )
            }}/>
        </Tabs>
    )
}
export default tabsLayout
