import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, removeFromCart} from '../components/CartReducer';
import {AuthContext} from '../navigation/AuthProvider';

import {LIGHTGREY, LIGHTBLACK} from '../constants/Colors';


const DenemePage = route => {
  const nav = useNavigation();

  const {getUserAccountsCurrencyType,userAccounts} = useContext(AuthContext);

  const [currencyList, setCurrencyList] = useState();

  let fromCurr = ['USD', 'EUR'];
  let toCurrs = ['TRY', 'JPY'];

  const cart = useSelector(state => state.cart.cart);

  const dispatch = useDispatch();

  const addItemToCart = item => {
    dispatch(addToCart(item));
  };
  const removeItemFromCart = item => {
    dispatch(removeFromCart(item));
  };

  const findIsAccounts = (fromCurrency,toCurrency,price) => {
    let findIsFromAccount = getUserAccountsCurrencyType(fromCurrency);
    let findIsToAccount = getUserAccountsCurrencyType(toCurrency);

    findIsFromAccount.length === 0 || findIsToAccount.length ===0 ? console.log("Array is empty!") 
    
    : nav.navigate('CurrencyBuyPage', {
      name: fromCurrency,
      toCurrency: toCurrency,
      fromCurrency: fromCurrency,
      price: price,
    })

  }

  


  const getDataFromApiAsync = async () => {
    try {
      const response = await fetch(
        'https://min-api.cryptocompare.com/data/pricemulti?fsyms=' +
          fromCurr +
          '&tsyms=' +
          toCurrs,
      );
      let index =0;
      const json = await response.json();
      var Output = Object.entries(json).flatMap(([fromCurrency, values]) =>
        Object.entries(values).map(([toCurrency, price]) => ({
          fromCurrency,
          toCurrency,
          price,
          id:index++
      
        })),
      );

      setCurrencyList(Output);
      console.log(Output);
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(

    React.useCallback(() => {
      getDataFromApiAsync();
      let interval = setInterval(() => {
        getDataFromApiAsync();
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }, []),
  );

  return (
    <View style={{height: '100%', backgroundColor: '#F5F8FF'}}>
      <View style={styles.headerbar}>
        <Text style={{fontSize: 25, fontWeight: '500', color: LIGHTBLACK}}>
          Döviz Kurları
        </Text>

        <TouchableOpacity>
          <Icon name="wallet" size={26} color={LIGHTGREY} />
        </TouchableOpacity>
      </View>
      <View style={{marginHorizontal: 20}}>
        <View>
          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() =>
              nav.navigate('FavoriteCurrencyPageScreen', {
                data: cart,
              })
            }>
            <Text style={styles.navButtonText}>Favori Döviz Kurlarını Gör</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 10,
            backgroundColor: '#F5F8FF',
            overflow: 'hidden',
            marginBottom: 100,
          }}>
          <FlatList
            data={currencyList}
            style={{height: Dimensions.get('window').height / 2}}
            ItemSeparatorComponent={() => (
              <View style={{marginVertical: 8}}></View>
            )}
            renderItem={({item}) => (
              <View>
                <Pressable
                  onPress={() =>findIsAccounts(item.fromCurrency,item.toCurrency,item.price)
                  }>
                  <Text
                    style={{
                      borderColor: 'gray',
                      borderWidth: 1,
                      marginVertical: 10,
                      padding: 5,
                    }}>
                    AL CURRENCY TRADE
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() =>findIsAccounts(item.fromCurrency,item.toCurrency,item.price)
                  }>
                  <Text
                    style={{
                      borderColor: 'gray',
                      borderWidth: 1,
                      marginVertical: 10,
                      padding: 5,
                    }}>
                    SAT CURRENCY TRADE
                  </Text>
                </Pressable>
                {cart.some(value => value.id == item.id) ? (
                  <Pressable onPress={() => removeItemFromCart(item)}>
                    <Text
                      style={{
                        borderColor: 'gray',
                        borderWidth: 1,
                        marginVertical: 10,
                        padding: 5,
                      }}>
                      REMOVE FROM CART
                    </Text>
                    <Text>{item.fromCurrency}</Text>
                    <Text>{item.toCurrency}</Text>
                    <Text>{item.price}</Text>
                  </Pressable>
                ) : (
                  <Pressable onPress={() => addItemToCart(item)}>
                    <Text
                      style={{
                        borderColor: 'gray',
                        borderWidth: 1,
                        marginVertical: 10,
                        padding: 5,
                      }}>
                      ADD TO CART
                    </Text>
                    <Text>{item.fromCurrency}</Text>
                    <Text>{item.toCurrency}</Text>
                    <Text>{item.price}</Text>
                  </Pressable>
                )}
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingBottom: 40,
          }}>
          <Icon name="wallet" size={28} color={LIGHTBLACK} />
          <Icon name="compass" size={28} color={LIGHTGREY} />
          <Icon name="notifications" size={28} color={LIGHTGREY} />
          <Icon name="settings-sharp" size={28} color={LIGHTGREY} />
        </View>
      </View>
    </View>
  );
};

export default DenemePage;
const styles = StyleSheet.create({
  headerbar: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filters: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 5,
    justifyContent: 'space-between',
  },
  footer: {
    position: 'absolute',
    left: 1,
    right: 1,
    bottom: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingTop: 20,
  },
});
