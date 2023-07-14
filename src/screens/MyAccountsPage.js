import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useContext,useEffect} from 'react';
import wallet from '../images/wallet.png';
import { useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../navigation/AuthProvider';
import {LIGHTGREY, LIGHTBLACK} from '../constants/Colors';
import imgPlaceHolder from '../images/avatar.jpg';
import WalletCoinCard from '../components/WalletCoinCard';

const MyAccountsPage = props => {
  const {userImage,getUserDetail,userAccounts} = useContext(AuthContext);

  const navigation = useNavigation();

  useEffect(() => {
    getUserDetail();
  
  }, []);

  let firstAccountDetail = userAccounts[0].accountNumber + " - " + userAccounts[0].branchName;

  let accountCount = userAccounts[0].currencyCount;

  console.log(userAccounts != null ? "bos degul" : "bos");
 
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
          <View style={{width: '50%'}}>
            <Image
              source={userImage ? {uri: userImage} : imgPlaceHolder}
              style={{height: 40, width: 40, borderRadius: 40}}
            />
          </View>
        </View>
      </View>
      <View style={{marginHorizontal:20,marginTop: -55}}>
      <View>
        {userAccounts != null ? 
          (<WalletCoinCard item={{name:firstAccountDetail,accountCount:accountCount}}/>)
        
        : (<Text>Selammmmm</Text>) }

    
      </View>
      </View>
    </View>
  );
};

export default MyAccountsPage;
const styles = StyleSheet.create({
  
  col:{
    flexDirection:'row',
    marginTop:25,
    marginHorizontal:20,
    alignItems:'center',
    backgroundColor: '#009142',
},
});
