import { View, Text } from 'react-native'
import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../navigation/AuthProvider';

const DenemePage = (route) => {

    const {userName,userLastName,getUserDetail} = useContext(AuthContext);

    

    useEffect(() => {
      getUserDetail();
    }, [])
    
    

  
  return (
    <View>
      <Text>DenemePage {userName}</Text>
      <Text>DenemePage {userLastName}</Text>
     
    </View>
  )
}

export default DenemePage