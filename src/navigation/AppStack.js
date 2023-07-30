
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AccountRegisterScreen from '../screens/AccountRegisterScreen';
import AllUserAccounts from '../screens/AllUserAccounts';
import AllCurrencyPage from '../screens/AllCurrencyPage';
import WalletDetails from '../screens/WalletDetails';
import FavoriteCurrencyPageScreen from '../screens/FavoriteCurrencyPageScreen';
import DenemePage from '../screens/DenemePage';
import CurrencyBuyPage from '../screens/CurrencyBuyPage';
import AllAccountTransactions from '../screens/AllAccountTransactions';
import MyAccountsPage from '../screens/MyAccountsPage';
import NewAccountsScreen from '../screens/NewAccountsScreen';
import {Provider} from 'react-redux'
import store from '../components/store'


const Stack = createNativeStackNavigator();
//options={{headerShown: false}}

const AppStack = () => {
  return (
    <Provider store={store}>
   <Stack.Navigator  screenOptions={{
    headerShown: false
  }}>
    
    <Stack.Screen name='Home' component={HomeScreen} />
    <Stack.Screen name='AccountRegisterScreen' component={AccountRegisterScreen} options={{title:'Hesap Açılışı',headerShown: true,headerTintColor: 'white',headerStyle: {backgroundColor: '#009142'}}}/>
    <Stack.Screen name='AllUserAccounts' component={AllUserAccounts}/>
    <Stack.Screen name='DenemePage' component={DenemePage}/>
    <Stack.Screen name='AllCurrencyPage' component={AllCurrencyPage}/>
    <Stack.Screen name='WalletDetails' component={WalletDetails}/>
    <Stack.Screen name='FavoriteCurrencyPageScreen' component={FavoriteCurrencyPageScreen}/>
    <Stack.Screen name='CurrencyBuyPage' component={CurrencyBuyPage}/>
    <Stack.Screen name='MyAccountsPage' component={MyAccountsPage}/>
    <Stack.Screen name='AllAccountTransactions' component={AllAccountTransactions}/>
    <Stack.Screen name='NewAccountsScreen' component={NewAccountsScreen} options={{title:'Alış/Satış',headerShown: true,headerTintColor: 'white',headerStyle: {backgroundColor: '#009142'}}}/>
    
    


    
    
  
   </Stack.Navigator>
   </Provider>
  );
}

export default AppStack