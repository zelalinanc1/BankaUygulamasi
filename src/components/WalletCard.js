import {
  View,
  StyleSheet,
  Text,
  Modal,
} from 'react-native';
import React, {useContext,  useState} from 'react';
import CustomCard from './CustomCard';
import {GREEN, LIGHTGREY, LIGHTBLACK} from '../constants/Colors';
import {useRoute, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import ModalPicker from './ModalPicker';
import {AuthContext} from '../navigation/AuthProvider';
import Transactions from './Transactions';
import TopCard from './TopCard';

const WalletCard = props => {
  const nav = useNavigation();

  const {
    userAccounts,
    getTransactionsByIban,
    accountTransactions,
    getLastTransactionsByIban,
  } = useContext(AuthContext);

  const route = useRoute();

  const params = route.params;

  let {name, accountCount, iban} =
    typeof props.item == 'undefined' ? params : props.item;

  const [chooseData, setchooseData] = useState('');

  const [isModalVisible, setisModalVisible] = useState(false);

  const changeModalVisibility = bool => {
    setisModalVisible(bool);
  };

  const setData = option => {
    setchooseData(option);
  };

  return (
    <View>
      <CustomCard style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: 'bold',
                marginLeft: 10,
                fontFamily: 'ArchivoNarrow-Medium',
              }}>
              {chooseData.length == 0 ? name : chooseData.accountNumber} -{' '}
              {chooseData.branchName}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="ellipsis1"
              size={40}
              color={LIGHTGREY}
              onPress={() => changeModalVisibility(true)}
            />

            <Modal
              transparent={true}
              animationType="fade"
              visible={isModalVisible}
              nRequestClose={() => changeModalVisibility(false)}>
              <ModalPicker
                changeModalVisibility={changeModalVisibility}
                setData={setData}
              />
            </Modal>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 13,
              marginLeft: 10,
              color: LIGHTBLACK,
             
            }}>
            Kullanılabilir Bakiye
          </Text>
          <Text
            style={{
              marginLeft: 40,
              marginTop: 5,
              color: LIGHTGREY,
              fontSize: 12,
              
            }}>
            {chooseData.length == 0
              ? accountCount 
              : chooseData.currencyCount.toFixed(2) +
                ' ' +
                chooseData.currencyType?.split('-')[1]}
          </Text>
        </View>

        <TopCard />
      </CustomCard>
      <View>
        {accountTransactions != null ? (
          <Transactions item={{ibanNo: chooseData.accountIban,currName: chooseData.currencyType?.split('-')[0]}} />
        ) : (
          <View style={{marginTop: 30}}>
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
                Bu hesabınızda henüz hareketiniz bulunmuyor.
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default WalletCard;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    // height:300,
  },
});
