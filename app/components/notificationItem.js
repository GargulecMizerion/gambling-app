import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/FontAwesome";

const NotificationItem = ({dateTime, message, itemId, deleteItem}) => {
    return (
        <View className='bg-secondaryGray my-2 rounded-lg p-2'>
            <View className="flex-row justify-between  pb-5">
            <Text className={"text-lg font-bold"}>{dateTime}</Text>
                <TouchableOpacity onPress={async () => await deleteItem(itemId)}>
                <Icon name={'trash'} size={20} />
                </TouchableOpacity>
            </View>
            <Text className={"text-xl"}>{message}</Text>
        </View>
    )
}
export default NotificationItem
