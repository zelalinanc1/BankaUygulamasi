import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import WalletCoinCard from '../components/WalletCoinCard';
import CoinCard from '../components/CoinCard';
import bitcoin from '../images/bitcoin.png';
import ripple from '../images/ripple.png';
import etherium from '../images/etherium.png';
import wallet from '../images/wallet.png';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, removeFromCart} from '../components/CartReducer';

import {LIGHTGREY, LIGHTBLACK} from '../constants/Colors';

const UserWalletPage = route => {
  const nav = useNavigation();

  const cart = useSelector(state => state.cart.cart);
  //console.log(cart);
  const dispatch = useDispatch();

  // const [socketData, setSocketData] = useState(null);

  // var ws =new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');

  //  ws.onmessage= (event) => {
  //     // console.log(event.data);
  //     // console.log('Socket Data', event.data());
  //     let stockObject = JSON.parse(event.data);
  //        //stockPriceElement.innerText = stockObject.p;
  //        let price=parseFloat(stockObject.p).toFixed(2);

  //     console.log(price);
  // }

  const CRYPTOCURRENCIES = [
    {
      id: 1,
      name: 'USD-Amerikan Doları',
      cryptobalance: '3.5290123123 BTC',
      actualbalance: '$19.53',
      percentage: '+ 4.32%',
      difference: '$ 5.44',
      decreased: false,
      imgsrc: bitcoin,
    },
    {
      id: 2,
      name: 'EUR-Euro',
      cryptobalance: '12.5290123123 ETH',
      actualbalance: '$19.53',
      percentage: '+ 4.32%',
      decreased: false,
      difference: '$ 3.44',
      imgsrc: etherium,
    },
    {
      id: 3,
      name: 'GBP-İngiliz Sterlini',
      cryptobalance: '3.5290123123 XRP',
      actualbalance: '$19.53',
      percentage: '- 4.32%',
      decreased: true,
      difference: '$ 7.44',
      imgsrc: ripple,
    },
    {
      id: 4,
      name: 'CHF-İsviçre Frangı',
      cryptobalance: '3.5290123123 XRP',
      actualbalance: '$19.53',
      percentage: '- 4.32%',
      decreased: true,
      difference: '$ 7.44',
      imgsrc: ripple,
    },
  ];

  const addItemToCart = item => {
    dispatch(addToCart(item));
  };
  const removeItemFromCart = item => {
    dispatch(removeFromCart(item));
  };

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
            data={CRYPTOCURRENCIES}
            style={{height: Dimensions.get('window').height / 2}}
            ItemSeparatorComponent={() => (
              <View style={{marginVertical: 8}}></View>
            )}
            renderItem={({item}) => (
              <View>
                 <Pressable
                  onPress={() => nav.navigate('CurrencyTradePage', {name:item.name})}>
                  <Text
                    style={{
                      borderColor: 'gray',
                      borderWidth: 1,
                      marginVertical: 10,
                      padding: 5,
                    }}>
                   AL/SAT CURRENCY TRADE
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
                    <CoinCard
                      item={item}
                      onPress={() => nav.navigate('WalletDetails', item)}
                    />
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
                    <CoinCard
                      item={item}
                      onPress={() => nav.navigate('WalletDetails', item)}
                    />
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

export default UserWalletPage;

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
