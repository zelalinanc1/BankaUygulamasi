import React from 'react';
import {  Text,  View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import AccountRegisterScreen from '../screens/AccountRegisterScreen';
import CurrencyBuyPage from '../screens/CurrencyBuyPage';
import CurrencySellPage from '../screens/CurrencySellPage';
import UpdatedProfileImage from '../screens/UpdatedProfileImage';
import AllUserAccounts from '../screens/AllUserAccounts';
import EmailPage from '../screens/EmailPage';
import CurrencyPage from '../screens/CurrencyPage';
import AllAccountTransactions from '../screens/AllAccountTransactions';
import OpenAccountScreen from '../screens/OpenAccountScreen';
import MyAccountsPage from '../screens/MyAccountsPage';
import NewAccountsScreen from '../screens/NewAccountsScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel:false,
  headerShown:false,
  tabBarStyle:{
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff"
  }
}

const MyAccounts = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="MyAccountsPage"
      component={MyAccountsPage}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="AllAccountTransactions"
      component={AllAccountTransactions}
      options={{
        title: 'İşlem Geçmişi',
        headerShown: true,
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#009142'},
      }}
    />
    <Stack.Screen
      name="AccountRegisterScreen"
      component={AccountRegisterScreen}
      options={{
        title: 'Hesap Açılışı',
        headerShown: true,
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#009142'},
      }}
    />
    <Stack.Screen
      name="CurrencyPage"
      component={CurrencyPage}
      options={{
        title: 'Döviz Kurları',
        headerShown: true,
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#009142'},
      }}
    />
    <Stack.Screen
      name="NewAccountsScreen"
      component={NewAccountsScreen}
      options={{
        title: 'Alış/Satış',
        headerShown: true,
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#009142'},
      }}
    />
    <Stack.Screen
      name="CurrencyBuyPage"
      component={CurrencyBuyPage}
      options={{
        title: 'Alış/Satış',
        headerShown: true,
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#009142'},
      }}
    />
     <Stack.Screen
      name="CurrencySellPage"
      component={CurrencySellPage}
      options={{
        title: 'Alış/Satış',
        headerShown: true,
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#009142'},
      }}
    />
    
  </Stack.Navigator>
);
const Kurlar = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="CurrencyPage"
      component={CurrencyPage}
      options={{
        title: 'Döviz Kurları',
        headerShown: true,
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#009142'},
      }}
    />
    <Stack.Screen
      name="CurrencyBuy"
      component={CurrencyBuyPage}
      options={{
        title: 'Alış/Satış',
        headerShown: true,
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#009142'},
      }}
    />
    <Stack.Screen
      name="CurrencySellPage"
      component={CurrencySellPage}
      options={{
        title: 'Alış/Satış',
        headerShown: true,
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#009142'},
      }}
    />
    <Stack.Screen
      name="NewAccountsScreen"
      component={NewAccountsScreen}
      options={{
        title: 'Alış/Satış',
        headerShown: true,
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#009142'},
      }}
    />
    <Stack.Screen
      name="CurrencyBuyPage"
      component={CurrencyBuyPage}
      options={{
        title: 'Alış/Satış',
        headerShown: true,
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#009142'},
      }}
    />
  
    
  </Stack.Navigator>
);
const Profil = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{
        title: 'Profil ve Ayarlar',
        headerShown: true,
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#009142'},
      }}
    />
    <Stack.Screen
      name="UpdatedProfileImage"
      component={UpdatedProfileImage}
      options={{
        title: 'Profil Resmini Değiştir',
        headerShown: true,
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#009142'},
      }}
    />
      <Stack.Screen
      name="MyAccountsPage"
      component={MyAccountsPage}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="OpenAccountScreen"
      component={OpenAccountScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen name="EmailPage" component={EmailPage}  options={{
        title: 'Email Bilgileri',
        headerShown: true,
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#009142'},
      }} />
   
  </Stack.Navigator>
);
const UserAccounts = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="AllUserAccounts"
      component={AllUserAccounts}
      options={{
        title: 'Hesaplar',
        headerShown: true,
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#009142'},
      }}
    />
    <Stack.Screen
      name="AllAccountTransactions"
      component={AllAccountTransactions}
      options={{
        title: 'İşlem Geçmişi',
        headerShown: true,
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#009142'},
      }}
    />
    <Stack.Screen
      name="AccountRegisterScreen"
      component={AccountRegisterScreen}
      options={{
        title: 'Hesap Açılışı',
        headerShown: true,
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#009142'},
      }}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  return (
    <Tab.Navigator  screenOptions={screenOptions}>
       <Tab.Screen
        name="Hesaplar"
        component={UserAccounts}
        options={{
          tabBarIcon: ({focused})=>{
            return (
              <View style={{alignItems: "center", justifyContent: "center"}}> 
                <Entypo name="wallet" size={24} color={focused ? "#05375a": "#111"} />
                <Text style={{ color: "#16247d"}}>Hesaplar</Text>
          </View>
            )
          }
        }}
      />
     <Tab.Screen
        name="Ana Sayfa"
        component={MyAccounts}
        options={{
          tabBarIcon: ({focused})=>{
            return (
              <View style={{alignItems: "center", justifyContent: "center"}}> 
                <Entypo name="home" size={20} color={focused ? "#05375a": "#111"} />
                <Text style={{color: "#16247d"}}>Ana Sayfa</Text>
          </View>
            )
          }
        }}
      />
      <Tab.Screen
        name="Kurlar"
        component={Kurlar}
        options={{
          tabBarIcon: ({focused})=>{
            return (
              <View style={{alignItems: "center", justifyContent: "center"}}> 
                 <MaterialIcons name="stacked-line-chart" size={24} color={focused ? "#05375a": "#111"} />
                <Text style={{color: "#16247d"}}>Kurlar</Text>
          </View>
            )
          }
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          tabBarIcon: ({focused})=>{
            return (
              <View style={{alignItems: "center", justifyContent: "center"}}> 
              <MaterialIcons name="account-circle" size={24} color={focused ? "#05375a": "#111"} />
                <Text style={{color: "#16247d"}}>Profil</Text>
          </View>
            )
          }
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
