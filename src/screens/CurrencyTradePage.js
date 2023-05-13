import {Modal, Text, TouchableHighlight, View,StyleSheet,TouchableOpacity} from 'react-native';
import React, {useState,useContext,useEffect} from 'react';
import CoinCard from '../components/CoinCard';
import {Dropdown} from 'react-native-element-dropdown';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import { useRoute,useNavigation } from '@react-navigation/native';
import {AuthContext} from '../navigation/AuthProvider';

const CurrencyTradePage = (props) => {

  const [accountCurrencyChoise, setAccountCurencyChoise] = useState(null);

  const [isFocus, setIsFocus] = useState(false);

  

  const route = useRoute();
  const nav = useNavigation();

  let {name} = route.params;

 

  const {userAccounts,getUserAccountsCurrencyType} = useContext(AuthContext);

  let datas=getUserAccountsCurrencyType(name);


 


  return (
    <View style={styles.container}>
     
     <Text>Denemeess {accountCurrencyChoise}</Text>

     <TouchableOpacity style={styles.forgotButton} onPress={() => getUserAccountsCurrencyType(name)}>
        <Text style={styles.navButtonText}> Yap</Text>
      </TouchableOpacity>

     
    
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={datas}
        search
        maxHeight={300}
        labelField="branchName"
        valueField="currencyType"
        placeholder={!isFocus ? 'Hesap Türü Seçiniz' : '...'}
        searchPlaceholder="Ara..."
        value={accountCurrencyChoise}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setAccountCurencyChoise(item.value);
          //setAccountCurencyChoise(item.currencyType);
          console.log(item.branchName);
          setIsFocus(false);
        }}
      />

     

     
      

     

    

     
    </View>
  )
}

export default CurrencyTradePage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
    alignSelf: 'center',
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
});