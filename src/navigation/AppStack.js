import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



const MyAccounts = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="MyAccountsPage" component={MyAccountsPage} options={{headerShown: false}} />
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
  </Stack.Navigator>
);
const Deneme = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="DenemePage" component={DenemePage} options={{headerShown: false}} />
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
      name="NewAccountsScreen"
      component={NewAccountsScreen}
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
    <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
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
    
  </Stack.Navigator>
);

const AppStack = () => {
  return (
    
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#2e64e5',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={({route}) => ({
          tabBarLabel: 'Home',
          headerShown: false,
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
        name="MyAccounts"
        component={MyAccounts}
        options={({route}) => ({
          tabBarLabel: 'Hesaplar',
          headerShown: false,
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
        options={{
           tabBarLabel: 'İşlemler',
           headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
};

export default AppStack;
