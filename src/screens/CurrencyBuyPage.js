import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import CoinCard from '../components/CoinCard';
import {Dropdown} from 'react-native-element-dropdown';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {useRoute, useNavigation} from '@react-navigation/native';
import {AuthContext} from '../navigation/AuthProvider';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

const CurrencyBuyPage = props => {
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

  const [isVisible, setIsVisible] = useState(false);

  const [accountCurrencyToChoise, setAccountCurencyToChoise] = useState(null);

  const [accountCurrencyFromChoise, setAccountCurencyFromChoise] =
    useState(null);

  const [currencyFromAmount, setCurrencyFromAmount] = useState('');

  const [currencyCountToAmount, setCurrencyCountToAmount] = useState('');

  const [currencyCountFromAmount, setCurrencyCountFromAmount] = useState('');

  const [currencyToAmount, setCurrencyToAmount] = useState('');

  let { price, toCurrency, fromCurrency} = route.params;

  let valueOfFromCurrency = getUserAccountsCurrencyType(fromCurrency);

  let valueOfToCurrency = getUserAccountsCurrencyType(toCurrency);

  const convertCurrencyTransaction = () => {

   if (currencyToAmount === 0) {
    Alert.alert('Hata!', 'Girdiğiniz değer 0 olamaz!', [
      {text: 'Tamam'},
    ]);
    } else if (currencyToAmount > currencyCountToAmount) {
      Alert.alert('Hata!', 'Yetersiz Bakiye!', [
        {text: 'Tamam'},
      ]);
    } else {
      işlemYap();
    }
  };

  let yazıl =fromCurrency + ' Tutar';

  const işlemYap = () => {
   

    getToCurrencyTransaction(accountCurrencyToChoise, currencyToAmount);
    getFromCurrencyTransaction(accountCurrencyFromChoise, currencyFromAmount);
    addAccountTransactions(
      accountCurrencyToChoise,
      currencyToAmount,
      accountCurrencyFromChoise,
      currencyFromAmount,
      fromCurrency,
      toCurrency,
    );
    nav.goBack();
  };

  useEffect(() => {
    getUserDetail();
  }, []);

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
      <View style={styles.headerContainer}>
        <Text>
          1 {fromCurrency} = {price} {toCurrency}{' '}
        </Text>
        <View style={{height: 10}} />
        <Text>Size özel döviz kurunuz 30 sn. sabitlenmiştir.</Text>
        <View style={{height: 10}} />
        <CountdownCircleTimer
          isPlaying
          duration={90}
          colors="#009387"
          onComplete={() => {
            nav.goBack();
          }}
          size={150}>
          {({remainingTime}) => (
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>Kalan Süre </Text>
              <Text>{remainingTime}</Text>
            </View>
          )}
        </CountdownCircleTimer>
      </View>
      <Dropdown
        style={[styles.dropdown, isFocus]}
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
      {accountCurrencyToChoise != null ? (
        <Text style={{marginTop: -30, paddingLeft: 17}}>
          Kullanılabilir Bakiye: {parseFloat(currencyCountToAmount).toFixed(2)}{' '}
          {toCurrency}
        </Text>
      ) : (
        <Text style={{marginTop: -30, paddingLeft: 17}}></Text>
      )}

      <Dropdown
        style={[styles.dropdown, isFocus]}
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
      {accountCurrencyFromChoise != null ? (
        <Text style={{marginTop: -30, paddingLeft: 17}}>
          Kullanılabilir Bakiye:{' '}
          {parseFloat(currencyCountFromAmount).toFixed(2)} {fromCurrency}
        </Text>
      ) : (
        <Text style={{marginTop: -30, paddingLeft: 17}}></Text>
      )}

      <View style={styles.currencyConvertContainer}>
        <TextInput
          name="currAmountTo"
          autoCorrect={false}
          keyboardType="numeric"
          placeholder={yazıl}
          placeholderTextColor="green"
          onChangeText={handleCalculation}
          underlineColorAndroid="green"
          textAlign={'center'}
        />

        <Text style={{color: 'green', borderBottomColor: 'green'}}>
          {toCurrency} Tutar {currencyToAmount}
        </Text>
      </View>
      <View style={styles.searchSection}>
      <TouchableOpacity
                  onPress={() => convertCurrencyTransaction()}
                  style={[styles.signIn, {
                      borderColor: '#009387',
                      borderWidth: 1,
                      marginVertical:50
                  }]}
              >
                  <Text style={[styles.textSign, {
                      color: '#009387'
                  }]}>İşlem Yap</Text>
              </TouchableOpacity>
        <FormButton
          buttonTitle="İşlem Yap"
          onPress={convertCurrencyTransaction}
        />
      </View>
    </View>
  );
};

export default CurrencyBuyPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F8FF',
    //padding: 16,
    //height: 50,
    flex: 1,
  },
  signIn: {
    marginTop:5,
    width: 90,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
},
textSign: {
  fontSize: 18,
  fontWeight: 'bold'
},
  searchSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
   // paddingLeft: 9,
  },
  headerContainer: {
    backgroundColor: 'white',
    // alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 220,
    width: '100%',
  },
  currencyConvertContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  dropdown: {
    margin: 10,
    height: 85,
    backgroundColor: 'white',
    borderColor: 'white',
    //borderBottomColor:'gray',
    borderWidth: 0.5,
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
    //height:150
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
