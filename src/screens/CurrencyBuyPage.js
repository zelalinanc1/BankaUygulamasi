import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  TextInput,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import CoinCard from '../components/CoinCard';
import {Dropdown} from 'react-native-element-dropdown';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {useRoute, useNavigation} from '@react-navigation/native';
import {AuthContext} from '../navigation/AuthProvider';
import FormInput from '../components/FormInput';

const CurrencyTradePage = props => {
  const route = useRoute();

  const {
    getUserAccountsCurrencyType,
    getToCurrencyTransaction,
    getFromCurrencyTransaction,
    addAccountTransactions,
    getUserDetail,
    
    
  } = useContext(AuthContext);

  const nav = useNavigation();

  const [isFocus, setIsFocus] = useState(false);

  const [accountCurrencyToChoise, setAccountCurencyToChoise] = useState(null);

  const [accountCurrencyFromChoise, setAccountCurencyFromChoise] =
    useState(null);

  const [currencyFromAmount, setCurrencyFromAmount] = useState('');

  const [currencyCountToAmount, setCurrencyCountToAmount] = useState('');

  const [currencyCountFromAmount, setCurrencyCountFromAmount] = useState('');

  const [currencyToAmount, setCurrencyToAmount] = useState('');

  let {name, price, toCurrency, fromCurrency} = route.params;

  let valueOfFromCurrency = getUserAccountsCurrencyType(fromCurrency);

  let valueOfToCurrency = getUserAccountsCurrencyType(toCurrency);

  const convertCurrencyTransaction = () => {
    if (currencyToAmount === 0) {
      console.log('Girdiğiniz değer 0 olamaz');
    } else if (accountCurrencyToChoise < currencyToAmount) {
      console.log('yetersiz bakiye');
    } else {
      işlemYap();
    }
  };


  const işlemYap = () => {
    console.log('işlem yapılabilir');
    console.log('accountCurrencyToChoise  ' + accountCurrencyToChoise); //iban
    console.log('accountCurrencyFromChoise  ' + accountCurrencyFromChoise); //iban
    console.log('currencyToAmount  ' + currencyToAmount);
    console.log('currencyFromAmount  ' + currencyFromAmount);
    console.log('***************************');

    //to eksi from artı

      getToCurrencyTransaction(accountCurrencyToChoise, currencyToAmount);
      getFromCurrencyTransaction(accountCurrencyFromChoise, currencyFromAmount);
      addAccountTransactions(accountCurrencyToChoise, currencyToAmount,accountCurrencyFromChoise, currencyFromAmount,fromCurrency,toCurrency);
     nav.navigate("Home");
   // await addAccountTransactions(accountCurrencyToChoise, currencyToAmount,accountCurrencyFromChoise, currencyFromAmount);
  };

 

  useEffect(() => {
    getUserDetail();
    
  
  }, []);

 // console.log(parseFloat(currencyCountToAmount));
 

  const handleCalculation = currencyAmount => {
    const multiplication = (num1, num2) => {
      return num1 * num2;
    };
    setCurrencyFromAmount(currencyAmount);
    let resulmultiplication = multiplication(price, currencyAmount);
    setCurrencyToAmount(resulmultiplication);
  };
  

  return (
    <View style={styles.container}>
      <Text>Denemeess Alış Sayfası</Text>

      <Text>
        1 {fromCurrency} = {price} {toCurrency}{' '}
      </Text>

      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={valueOfToCurrency}
        search
        maxHeight={300}
        labelField="accountDetailName"
        valueField="accountIban"
        placeholder={
          !isFocus ? toCurrency + ' Tutarının Çekileceği Hesap' : '...'
        }
        searchPlaceholder="Ara..."
        value={accountCurrencyToChoise}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setAccountCurencyToChoise(item.accountIban);
          setCurrencyCountToAmount(item.currencyCount);
          setIsFocus(false);
        }}
      />

      <Text>accountCurrencyToChoise {currencyCountToAmount}</Text>

      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={valueOfFromCurrency}
        search
        maxHeight={300}
        labelField="accountDetailName"
        valueField="accountIban"
        placeholder={
          !isFocus ? fromCurrency + ' Tutarının Aktarılacağı Hesap' : '...'
        }
        searchPlaceholder="Ara..."
        value={accountCurrencyFromChoise}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setAccountCurencyFromChoise(item.accountIban);
          setCurrencyCountFromAmount(item.currencyCount);
          setIsFocus(false);
        }}
      />
     
     
      <Text>accountCurrencyFromChoise {currencyCountFromAmount}</Text>
    

      <TextInput
        name="currAmountTo"
        autoCorrect={false}
        placeholder="USD Miktar"
        onChangeText={handleCalculation}
      />
      <Text>TL Tutar</Text>
      <Text>{currencyToAmount}</Text>

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={convertCurrencyTransaction}>
        <Text style={styles.navButtonText}>İşlem Yap</Text>
      </TouchableOpacity>


     
    </View>
  );
};

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
