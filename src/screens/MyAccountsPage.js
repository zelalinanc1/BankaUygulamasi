import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import wallet from '../images/wallet.png';
import {useRoute, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../navigation/AuthProvider';
import {LIGHTGREY, LIGHTBLACK} from '../constants/Colors';
import imgPlaceHolder from '../images/avatar.jpg';
import WalletCard from '../components/WalletCard';
import CustomCard from '../components/CustomCard';
import AntDesign from 'react-native-vector-icons/AntDesign';
const windowHeight = Dimensions.get('window').height;
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TopCard from '../components/TopCard';


const MyAccountsPage = ({route, navigation}) => {
  
  const {getUserDetail,userName,userLastName,userImage,userAccounts} = useContext(AuthContext);

  useEffect(() => {
   getUserDetail()
  }, []);


  return (
    <View
      style={{
        backgroundColor: '#FFF',
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: '#009142',
          height: '28%',
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 15,
            width: '100%',
          }}>
          <View style={{width: '50%',flexDirection: 'row', alignItems: 'center',}}>
            <Image
              source={userImage ? {uri: userImage} : imgPlaceHolder}
              style={{height: 40, width: 40, borderRadius: 40}}
            />
             <Text style={[styles.textSign,{paddingLeft:60,color: 'white',},]}>{userName} {userLastName}</Text>
          
          </View>
        </View>
      </View>
      <View style={{marginHorizontal: 20, marginTop: -55}}>
        <View>
          {userAccounts != null ? (
            <WalletCard
              item={{
                name:
                  userAccounts[0].accountNumber +
                  ' - ' +
                  userAccounts[0].branchName,
                accountCount: userAccounts[0].currencyCount.toFixed(2)+
                ' ' +
                userAccounts[0].currencyType?.split('-')[1],
              }}
            />
          ) : (
            <View>
              <CustomCard style={styles.container}>
                <Text>Hoş Geldin!</Text>
               <TopCard/>
               <View style={{marginTop:40}}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontFamily: 'OpenSans-Regular',
                color: '#000',
              }}>
              Son Hareket{' '}
            </Text>
          </View>
          <View style={{height: 18}} />
          <View
            style={{
              marginStart: -17,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{paddingLeft: 17}}>
             Lütfen hesap oluşturunuz.
            </Text>
          </View>
          
        </View>
              </CustomCard>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default MyAccountsPage;
const styles = StyleSheet.create({
  col: {
    flexDirection: 'row',
    marginTop: 25,
    marginHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#009142',
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    height: 170,
  },
  textSign: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
