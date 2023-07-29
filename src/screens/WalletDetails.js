import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React from 'react';
import WalletCoinCard from '../components/WalletCoinCard';
import Icon from 'react-native-vector-icons/Ionicons';
import {useRoute, useNavigation} from '@react-navigation/native';
import CTACard from '../components/CTACard';
import {LIGHTGREY, LIGHTBLACK} from '../constants/Colors';

const WalletDetails = props => {
  const route = useRoute();
  const nav = useNavigation();
  const params = route.params;
  let {
    name,
    cryptobalance,
    actualbalance,
    decreased,
    percentage,
    difference,
    imgsrc,
  } = params;

  return (
    <View style={{height: '100%', backgroundColor: '#F5F8FF'}}>
      <View style={styles.headerbar}>
        <TouchableOpacity onPress={() => nav.goBack()}>
          <Icon name="chevron-back-outline" size={28} color={LIGHTBLACK} />
        </TouchableOpacity>
        <Text style={{fontSize: 25, fontWeight: '500', color: LIGHTBLACK}}>
          {name}
        </Text>
        <TouchableOpacity>
          <Icon name="ellipsis-vertical" size={26} color={LIGHTGREY} />
        </TouchableOpacity>
      </View>
      <View style={{height: Dimensions.get('window').height - 200}}>
        <ScrollView style={{marginHorizontal: 20}}>
          <WalletCoinCard />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              marginHorizontal: 5,
              justifyContent: 'space-between',
            }}>
            <View style={{backgroundColor: LIGHTGREY, borderRadius: 10}}>
              <Text
                style={{
                  color: LIGHTGREY,
                  padding: 5,
                  color: '#fff',
                  fontWeight: '600',
                }}>
                Day
              </Text>
            </View>
            <Text style={{color: LIGHTGREY}}>Week</Text>
            <Text style={{color: LIGHTGREY}}>Month</Text>
            <Text style={{color: LIGHTGREY}}>Year</Text>
          </View>

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#F5F8FF',
            }}>
            <CTACard action="Buy" />
            <TouchableOpacity
              style={styles.forgotButton}
              onPress={() => nav.navigate('CurrencyTradePage',{name:name})}>
              <Text style={styles.navButtonText}>Currency Trade</Text>
            </TouchableOpacity>
            <CTACard action="Sell" />
          </View>
        </ScrollView>
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

export default WalletDetails;

const styles = StyleSheet.create({
  headerbar: {
    paddingTop: 50,
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
