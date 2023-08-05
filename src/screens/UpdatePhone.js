import { View, Text } from 'react-native'
import React from 'react'

const UpdatePhone = ({route}) => {

    
  const {userPhone} = route.params;

  return (
    <View>
      <Text>UpdatePhone {userPhone}</Text>
    </View>
  )
}

export default UpdatePhone