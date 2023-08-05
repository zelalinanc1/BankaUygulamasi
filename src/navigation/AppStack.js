import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import AccountRegisterScreen from '../screens/AccountRegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import CurrencyBuyPage from '../screens/CurrencyBuyPage';
import SignUpWithImageScreen from '../screens/SignUpWithImageScreen';
import EmailPage from '../screens/EmailPage';
import UpdatePhone from '../screens/UpdatePhone';
import DenemePage from '../screens/DenemePage';
import AllAccountTransactions from '../screens/AllAccountTransactions';
import OpenAccountScreen from '../screens/OpenAccountScreen';
import MyAccountsPage from '../screens/MyAccountsPage';
import NewAccountsScreen from '../screens/NewAccountsScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



const MyAccounts = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="MyAccountsPage" component={MyAccountsPage} options={{headerShown: false}} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
    <Stack.Screen
      name="AllAccountTransactions"
      component={AllAccountTransactions}
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
    <Stack.Screen name="DenemePage" component={DenemePage} options={{headerShown: false}} />
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
const Deneme = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="DenemePage" component={DenemePage} options={{headerShown: false}} />
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
const Home = ({navigation}) => (
  <Stack.Navigator> 
    {/* <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} /> */}
     <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: false}} />
    <Stack.Screen name="SignUpWithImageScreen" component={SignUpWithImageScreen} />
    <Stack.Screen name="OpenAccountScreen" component={OpenAccountScreen} options={{headerShown: false}} /> 
    <Stack.Screen name="EmailPage" component={EmailPage}  /> 
    <Stack.Screen name="UpdatePhone" component={UpdatePhone}  /> 
  </Stack.Navigator>
);






const AppStack = () => {
  return (
    
    <Tab.Navigator screenOptions={{headerShown:false}}>
      
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        screenOptions={({route}) => ({
          tabBarLabel: 'HomeScreen',
          tabBarActiveTintColor: '#2e64e5',
          headerShown: false,
          headerLeft: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#fff"
            />
          ),
          
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={size}
            />
          ),
        })}
      />  
       <Tab.Screen
        name="MyAccounts"
        component={MyAccounts}
        screenOptions={({route}) => ({
          tabBarLabel: 'Hesaplar',
          headerShown: false,
          tabBarActiveTintColor: '#2e64e5',
          
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      
       <Tab.Screen
        name="Deneme"
        component={Deneme}
        screenOptions={{
           tabBarLabel: 'İşlemler',
           headerShown: false,
           tabBarActiveTintColor: '#2e64e5',
          
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
};

export default AppStack;
