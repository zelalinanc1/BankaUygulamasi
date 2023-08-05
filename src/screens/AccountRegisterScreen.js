import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useContext, useState, Context, useEffect} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

import Icon from 'react-native-vector-icons/Fontisto';
import turkishlira from '../images/turkishlira.jpg';

const accountTypeData = [
  {label: 'vadeli', value: 'vadeli'},
  {label: 'vadesiz', value: 'vadesiz'},
];

const currencyData = [
  {label: 'TRY-Türk Lirası', value: 'TRY-Türk Lirası'},
  {label: 'USD-Amerikan Doları', value: 'USD-Amerikan Doları'},
  {label: 'EUR-Euro', value: 'EUR-Euro'},
  {label: 'GBP-İngiliz Sterlini', value: 'GBP-İngiliz Sterlini'},
  {label: 'CHF-İsviçre Frangı', value: 'CHF-İsviçre Frangı'},
  {label: 'JPY-Japon Yeni', value: 'JPY-Japon Yeni'},
];

const branchNameData = [
  {label: '19 GALATA/IST', value: '19 GALATA/IST'},
  {label: '21 KADIKOY/IST', value: '21 KADIKOY/IST'},
  {label: '1257 SERDİVAN/SAK', value: '1257 SERDİVAN/SAK'},
];

const AccountRegisterScreen = ({navigation, route}) => {
  const [accountType, setAccountType] = useState(null);

  const [accountNumber, setAccountNumber] = useState(null);

  const [accountIban, setAccountIban] = useState(null);

  const [currencyType, setCurrencyType] = useState(null);

  const [currencyCount, setCurrencyCount] = useState(null);

  const [branchName, setBranchName] = useState(null);


  const {addCollectionAccounts} = useContext(AuthContext);

  const [error, setError] = useState('');

  const [isFocus, setIsFocus] = useState(false);

  const updateError = (error, stateUpdater) => {
    stateUpdater(error);

    setTimeout(() => {
      stateUpdater('');
    }, 2500);
  };

  const isValidForm = () => {
    if (!accountType || !branchName || !currencyType || !currencyCount)
      return updateError('Lütfen tüm alanları doldurunuz!', setError);

    return true;
  };

  const onAccountSubmitForm = () => {
    if (isValidForm()) {
      addCollectionAccounts(
        accountType,
        currencyType,
        branchName,
        accountNumber,
        accountIban,
        currencyCount,
        
      );
    }
    navigation.navigate("HomeScreen")
  };

  useEffect(() => {
    randomAccount();
  }, []);

  const randomAccount = () => {
    setAccountNumber(Math.floor(100000 + Math.random() * 900000));
    var Tr = 'TR';
    var Iban = Math.floor(100000 + Math.random() * 900000).toString();
    var deger = Tr.concat('', Iban);
    setAccountIban(deger);
  };

  return (
    <View style={styles.container}>
      {error ? <Text style={{color: '#2e64e5',paddingHorizontal:10}}>{error}</Text> : null}
    
      <Dropdown
        style={[styles.dropdown, isFocus ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={accountTypeData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Hesap Türü Seçiniz' : '...'}
        searchPlaceholder="Ara..."
        value={accountType}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setAccountType(item.value);
          setIsFocus(false);
        }}
        
      />
      <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={currencyData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Döviz Tipi Seçiniz' : '...'}
        searchPlaceholder="Ara..."
        value={currencyType}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setCurrencyType(item.value);
          setIsFocus(false);
        }}
      />
      <Dropdown
        style={[styles.dropdown, isFocus]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={branchNameData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Şube Seçiniz' : '...'}
        searchPlaceholder="Ara..."
        value={branchName}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setBranchName(item.value);
          setIsFocus(false);
        }}
      />
     <View style={styles.searchSection}>
      <FormInput
        labelValue={currencyCount}
        keyboardType = 'numeric'
        onChangeText={userCurrencyCount => setCurrencyCount(userCurrencyCount.replace(/[^0-9]/g, ''))}
        placeholderText="Miktar"
        secureTextEntry={false}
        
      />
        <FormButton buttonTitle="Onay" onPress={onAccountSubmitForm} />
      </View>
      
    
    </View>
  );
};

export default AccountRegisterScreen;

const styles = StyleSheet.create({
  container: {
    //backgroundColor: 'white',
    padding: 16,
  },
  searchSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft:9
    
},
searchIcon: {
  padding: 10,
},
  dropdown: {
    margin:10,
    height: 50,
    backgroundColor: 'white',
    borderColor: 'white',
    borderBottomColor:'gray',
    borderWidth: 0.5,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
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
