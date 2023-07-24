import { View, Text } from 'react-native'
import React from 'react'
import { useRoute,useNavigation } from '@react-navigation/native';
import {AuthContext} from '../navigation/AuthProvider';

const AccountDetails = ({route, navigation}) => {
  return (
    <View>
      <Text>AccountDetails</Text>
    </View>
  )
}

export default AccountDetails