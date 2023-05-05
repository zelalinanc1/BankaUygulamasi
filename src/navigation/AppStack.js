
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AccountRegisterScreen from '../screens/AccountRegisterScreen';
import AccountDetailsScreen from '../screens/AccountDetailsScreen';
import SocketPage from '../screens/SocketPage';



const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
   <Stack.Navigator>
    <Stack.Screen name='Home' component={HomeScreen}/>
    <Stack.Screen name='AccountRegisterScreen' component={AccountRegisterScreen}/>
    <Stack.Screen name='AccountDetailsScreen' component={AccountDetailsScreen}/>
    <Stack.Screen name='SocketPage' component={SocketPage}/>
    
  
   </Stack.Navigator>
  );
}

export default AppStack