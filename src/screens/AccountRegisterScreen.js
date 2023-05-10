import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useContext, useState, Context, useEffect} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

const accountTypeData = [
  {label: 'vadeli', value: 'vadeli'},
  {label: 'vadesiz', value: 'vadesiz'},
];

const currencyData = [
  {label: 'TL-Türk Lirası', value: 'TL-Türk Lirası'},
  {label: 'USD-Amerikan Doları', value: 'USD-Amerikan Doları'},
  {label: 'EUR-Euro', value: 'EUR-Euro'},
  {label: 'GBP-İngiliz Sterlini', value: 'GBP-İngiliz Sterlini'},
  {label: 'CHF-İsviçre Frangı', value: 'CHF-İsviçre Frangı'},
];

const branchNameData = [
  {label: '19 GALATA/IST', value: '19 GALATA/IST'},
  {label: '21 KADIKOY/IST', value: '21 KADIKOY/IST'},
  {label: '1257 SERDİVAN/SAK', value: '1257 SERDİVAN/SAK'},
];

let userAccounts = [];

const AccountRegisterScreen = ({navigation, route}) => {
  const [accountType, setAccountType] = useState(null);

  const [accountNumber, setAccountNumber] = useState(null);

  const [accountIban, setAccountIban] = useState(null);

  const {user, logout} = useContext(AuthContext);

  const [currencyType, setCurrencyType] = useState(null);

  const [branchName, setBranchName] = useState(null);

  const [isFocus, setIsFocus] = useState(false);

  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    const currentUser = await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
    randomAccount();
  }, []);

  const addCollectionAccounts = async () => {
    let tempUserAccounts = userAccounts;
    tempUserAccounts.push({
      accountType: accountType,
      currencyType: currencyType,
      branchName: branchName,
      accountNumber: accountNumber,
      accountIban: accountIban,
    });

    firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        userAccounts: tempUserAccounts,
      })
      .then(ref => {
        console.log(ref);
      })
      .catch(error => {});
  };

  const getAccountsArray = async () => {
    // firestore()
    // .collection("users")
    // .where("userAccounts","array-contains",{currencyType :'TL-Türk Lirası'})
    // .get()
    // .then(ref => {
    //   console.log(ref);
    // })
    // .catch(error => {});

 

   
  };

  const randomAccount = () => {
    setAccountNumber(Math.floor(100000 + Math.random() * 900000));
    var Tr = 'TR';
    var Iban = Math.floor(100000 + Math.random() * 900000).toString();
    var deger = Tr.concat('', Iban);
    setAccountIban(deger);
  };

  return (
    <View style={styles.container}>
      <Text>{accountType}</Text>

      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
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
      <Text>{currencyType}</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
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
      <Text>{branchName}</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
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

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => addCollectionAccounts()}>
        <Text style={styles.navButtonText}>Kaydet</Text>
      </TouchableOpacity>

    

      <TouchableOpacity style={styles.forgotButton} onPress={() => logout()}>
        <Text style={styles.navButtonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountRegisterScreen;

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
