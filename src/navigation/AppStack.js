
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AccountRegisterScreen from '../screens/AccountRegisterScreen';
import AccountDetailsScreen from '../screens/AccountDetailsScreen';
import AllCurrencyPage from '../screens/AllCurrencyPage';
import WalletDetails from '../screens/WalletDetails';
import FavoriteCurrencyPageScreen from '../screens/FavoriteCurrencyPageScreen';
import CurrencyTradePage from '../screens/CurrencyTradePage';
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
    <Stack.Screen name='AllCurrencyPage' component={AllCurrencyPage}/>
    <Stack.Screen name='WalletDetails' component={WalletDetails}/>
    <Stack.Screen name='FavoriteCurrencyPageScreen' component={FavoriteCurrencyPageScreen}/>
    <Stack.Screen name='CurrencyTradePage' component={CurrencyTradePage}/>


    
    
  
   </Stack.Navigator>
   </Provider>
  );
}

export default AppStack