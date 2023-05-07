
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AccountRegisterScreen from '../screens/AccountRegisterScreen';
import AccountDetailsScreen from '../screens/AccountDetailsScreen';
import UserWalletPage from '../screens/UserWalletPage';
import WalletDetails from '../screens/WalletDetails';
import {Provider} from 'react-redux'
import store from '../components/store'


const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Provider store={store}>
   <Stack.Navigator>
    <Stack.Screen name='Home' component={HomeScreen}/>
    <Stack.Screen name='AccountRegisterScreen' component={AccountRegisterScreen}/>
    <Stack.Screen name='AccountDetailsScreen' component={AccountDetailsScreen}/>
    <Stack.Screen name='UserWalletPage' component={UserWalletPage}/>
    <Stack.Screen name='WalletDetails' component={WalletDetails}/>
    
  
   </Stack.Navigator>
   </Provider>
  );
}

export default AppStack