import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {colors} from "../constants/colors";

const TeacherInfoPanelContainer = ({icon,value,heading}) => {
    return (
        <View style={styles.container} className="items-center justify-center flex-1">
            <View className="items-center justify-center">
                {icon}
            </View>
            <Text className="font-semibold my-1 text-2xl text-center">{value}</Text>
            <Text style={{color: colors.muted, textAlign:'center'}}>{heading}</Text>
        </View>
    )
}
export default TeacherInfoPanelContainer
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        borderRadius : 20,
        shadowColor : colors.muted,
        shadowRadius : 8,
        shadowOpacity : 0.2,
        padding : 15
    }
})
