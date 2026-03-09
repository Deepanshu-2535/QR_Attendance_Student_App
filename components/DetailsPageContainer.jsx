import { colors } from '../constants/colors'
import { Text, View } from 'react-native'
import React from 'react'
import Divider from './Divider'
import { formatDate } from '../util/dateFormat'
import { CircleCheck, CircleX } from 'lucide-react-native'

const detailsPageContainer = ({ leftSideDetails, status, index, length }) => {
    return (
        <View>
            <View className="flex-row justify-between">
                <Text className="font-semibold">{leftSideDetails}</Text>
                <View>
                    {status === 'PRESENT' ? (
                        <View className="flex-row">
                            <CircleCheck size={20} color={colors.success} />
                            <Text className="ml-3 text-muted">PRESENT</Text>
                        </View>
                    ) : (
                        <View className="flex-row">
                            <CircleX size={20} color={colors.danger} />
                            <Text className="ml-5 text-danger">ABSENT</Text>
                        </View>
                    )}
                </View>
            </View>
            {index !== length - 1 ? <Divider margin={10} /> : <View></View>}
        </View>
    )
}
export default detailsPageContainer
