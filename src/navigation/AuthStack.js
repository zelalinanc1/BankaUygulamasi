import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import UpdatedProfileImage from '../screens/UpdatedProfileImage';
import SignUpPage from '../screens/SignUpPage';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={SplashScreen}>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{header: () => null}}
      />

      <Stack.Screen
        name="UpdatedProfileImage"
        component={UpdatedProfileImage}
      />
      <Stack.Screen name="SignUpPage" component={SignUpPage} options={{header: () => null}}/>
    </Stack.Navigator>
  );
};

export default AuthStack;
