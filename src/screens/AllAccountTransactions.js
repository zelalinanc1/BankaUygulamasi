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
  const {
    getTransactionsByIban,
    getTransactions1ByIban,
    getTransactionsByFromName,
    getTransactionsByToName,
  } = useContext(AuthContext);

  const route = useRoute();

  const params = route.params;

  let {currName} = typeof props.item == 'undefined' ? params : props.item;

  let fromTransaction = getTransactionsByFromName(currName);

  let toTransaction = getTransactionsByToName(currName);

  return (
    <View style={StyleSheet.root}>
      <View style={{marginTop: 10}} />

      <TransactionsDetail
        item={{fromTransaction: fromTransaction, toTransaction: toTransaction}}
      />
    </View>
  );
};

export default AllAccountTransactions;
const styles = StyleSheet.create({
  root: {
    backgroundColor: '#edf1f2',
  },
  header: {
    backgroundColor: '#009142',
    height: windowHeight * 0.1,
    marginTop: 10,
    borderRadius: 10,
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
