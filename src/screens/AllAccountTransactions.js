import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useRoute, useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TransactionsDetail from '../components/TransactionsDetail';
import {AuthContext} from '../navigation/AuthProvider';

const windowHeight = Dimensions.get('window').height;
const AllAccountTransactions = props => {

  const {getTransactionsByIban} = useContext(AuthContext);

  const route = useRoute();

  const params = route.params;
  let {ibanNo} = typeof props.item == 'undefined' ? params : props.item;

  let transactions =getTransactionsByIban(ibanNo)

  console.log(transactions)

  return (
    <View style={StyleSheet.root}>
      <View style={styles.header}>
        <View style={styles.headerItems}>
        <TouchableOpacity style={styles.headerItems_item_inactive}>
            <AntDesign
              name="wallet"
              size={20}
              color="#fff"
              style={{marginRight: 5}}
            />
            <Text style={styles.headerItems__text_unactive}>İşlemler </Text>
          </TouchableOpacity>
          </View>
          </View>
          <View style={{marginTop:10}}/>
          <TransactionsDetail item={{transactions:transactions}}/>
     

    </View>
  )
}

export default AllAccountTransactions;
const styles = StyleSheet.create({
  root: {
    backgroundColor: '#edf1f2',
  },
  header: {
    backgroundColor: '#009142',
    height: windowHeight * 0.18,
    marginTop:10,
    borderRadius:10
  },
  headerItems: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerItems_item: {
    flexDirection: 'row',
    backgroundColor: '#1d50b1',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginRight: 5,
    borderRadius: 15,
  },
  headerItems_item_inactive: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginRight: 5,
    borderRadius: 15,
  },
  headerItems__text: {
    color: '#fff',
    fontFamily: 'OpenSans-Bold',
  },
  headerItems__text_unactive: {
    color: '#eee',
    fontFamily: 'OpenSans-Bold',
  },

  accountView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 15,
  },
  accountValue: {
    color: '#fff',
    fontFamily: 'OpenSans-Regular',
    fontSize: 18,
  },
  accountValue_Icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});