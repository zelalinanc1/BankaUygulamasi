import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{header: () => null}}
    />
   <Stack.Screen
   name="Signup"
   component={SignUpScreen}
   
   />
  </Stack.Navigator>
  )
}

export default AuthStack