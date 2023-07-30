import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {AuthContext} from '../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';


const Transactions =props  => {
  const {getTransactionsByIban,getLastTransactionsByIban} = useContext(AuthContext);

  const [date, setDate] = useState('');

  const route = useRoute();

  const params = route.params;

  const navigation = useNavigation();

  let {ibanNo} = typeof props.item == 'undefined' ? params : props.item;

  let val= getLastTransactionsByIban(ibanNo)

 
  


  return (
    <View>
      <View style={{height: 30, flexDirection: 'row'}} />
      {val != null ? (
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontFamily: 'OpenSans-Regular',
                color: '#000',
              }}>
              Son Hareket{' '}
            </Text>
            <Text style={{paddingLeft: 5}}>|</Text>
            <Text style={{paddingLeft: 5}}>{val.date}</Text>
          </View>
          <View
            style={{
              marginStart: -17,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon name="dot-single" size={40} />
            <Text>Para Transferi</Text>
          </View>
          <View
            style={{
              marginStart: -17,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{paddingLeft: 40}}>
              {val.accountCurrencyFromChoise}
            </Text>
            <Text style={{paddingLeft: 60}}>
              {val.currencyFromAmount} {val.fromCurrency}
            </Text>
            <Text style={{paddingLeft: 100}}>
              {val.currencyToAmount} {val.toCurrency}
            </Text>
          </View>
          <TouchableOpacity style={styles.accountList_item}  onPress={() => navigation.navigate('AllAccountTransactions',{ibanNo:ibanNo})}>
            <View>
              <Text style={styles.account_libelle}>
                Hesap Hareketlerine Git
              </Text>
              <View style={{height: 10}} />
              <View style={{flexDirection: 'row'}}></View>
            </View>
            <AntDesign name="arrowright" size={20} color="#153ee7" />
          </TouchableOpacity>
        </View>
      ) : (
        <View>
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
  );
};

export default Transactions;
const styles = StyleSheet.create({
  accountList_item: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#edf1f2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  account_libelle: {
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Regular',
    color: '#153ee7',
  },
});
