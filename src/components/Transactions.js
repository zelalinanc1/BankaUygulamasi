import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {AuthContext} from '../navigation/AuthProvider';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Transactions = props => {
  const {getTransactionsByIban} = useContext(AuthContext);

  const route = useRoute();

  const params = route.params;

  let {ibanVal, firstVal} =
    typeof props.item == 'undefined' ? params : props.item;

  // console.log(firstVal)

  //  console.log(chooseData.accountCurrencyFromChoise)

  //ibanVal.length != 0 ? console.log("bos degul") : console.log("bos" )

  return (
    
    <View>
      <Text>Transactions </Text>
      {ibanVal.length != 0 ? (
       
        <FlatList
          data={ibanVal}
          style={{height: Dimensions.get('window').height}}
          ItemSeparatorComponent={() => (
            <View style={{marginVertical: 8}}></View>
          )}
          renderItem={({item}) => (
            <View>
              {/* <Text>{item.currencyToAmount}</Text>
            <Text>{item.currencyFromAmount}</Text>
            <Text>{item.accountCurrencyFromChoise}</Text>
            <Text>{item.accountCurrencyToChoise}</Text>
            <Text>{item.date}</Text>  */}
              <TouchableOpacity style={styles.accountList_item}>
                  <View>
                    <Text style={styles.account_libelle}>İşlem</Text>
                    <Text>{item.currencyFromAmount}</Text>
                  </View>
                <AntDesign name="arrowright" size={20} color="#153ee7" />
              </TouchableOpacity>
            </View>
          )}
        />
     ) : (
        <Text>Boşşş</Text>
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
    color: '#000',
  },
});
