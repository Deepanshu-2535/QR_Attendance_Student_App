import {View, Text} from 'react-native'
import React from 'react'
import {Tabs} from "expo-router";

const tabsLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{title: "Home", headerShown: false}}/>
            <Tabs.Screen name="reports" options={{title: "Reports" , headerShown: false}}/>
            <Tabs.Screen name="history" options={{title: "History", headerShown: false}}/>
        </Tabs>
    )
}
export default tabsLayout
