import {View, Text} from 'react-native'
import React from 'react'

const NotificationItem = ({dateTime, message}) => {
    return (
        <View className='bg-secondaryGray my-2 rounded-lg p-2'>
            <Text className={"text-lg font-bold"}>{dateTime}</Text>
            <Text className={"text-xl"}>{message}</Text>
        </View>
    )
}
export default NotificationItem
