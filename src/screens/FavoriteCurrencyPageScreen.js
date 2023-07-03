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
import React from 'react';
import CoinCard from '../components/CoinCard';

const FavoriteCurrencyPageScreen = ({route}) => {
  const {data} = route.params;
  

  console.log("FAVLARRR"+JSON.stringify(data))

  return (
    <View>
      {/* {data.map(item => (
        <View style={{padding: 10}} key={item.id}>
          <CoinCard item={item} />
        </View>
      ))} */}

      <FlatList
        data={data}
        //style={{height: Dimensions.get('window').height}}
        ItemSeparatorComponent={() => <View style={{marginVertical: 8}}></View>}
        renderItem={({item}) => (
          <View>
            <Text>{item.fromCurrency}</Text>
            <Text>{item.toCurrency}</Text>
            <Text>{item.price}</Text>
          </View>
        )}
       
      />
    </View>
  );
};

export default FavoriteCurrencyPageScreen;
