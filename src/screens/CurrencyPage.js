import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Pressable,
  TextInput,
  Image,
  TouchableHighlight,
} from 'react-native';
import React, {useContext, useState, useEffect, useRef} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {AuthContext} from '../navigation/AuthProvider';
import Search from '../images/search.png';
import Close from '../images/close.png';



const CurrencyPage = route => {
  const nav = useNavigation();

  const {getUserAccountsCurrencyType, userAccounts} = useContext(AuthContext);

  const [currencyList, setCurrencyList] = useState();

  const [oldData, setOldData] = useState();
  const searchRef = useRef();

  const [search, setSearch] = useState('');

  let fromCurr = ['USD', 'EUR', 'GBP', 'CHF'];
  let toCurrs = ['TRY', 'JPY'];



  const findIsAccounts = (fromCurrency, toCurrency, price) => {
    let findIsFromAccount = getUserAccountsCurrencyType(fromCurrency);
    let findIsToAccount = getUserAccountsCurrencyType(toCurrency);



   if(findIsFromAccount.length != 0 && findIsToAccount.length != 0){
    nav.navigate('CurrencyBuyPage', {
      name: fromCurrency,
      toCurrency: toCurrency,
      fromCurrency: fromCurrency,
      price: price,
    })
   }else if( findIsFromAccount.length === 0){
    nav.navigate('NewAccountsScreen',{accountName:fromCurrency})
   }else if(findIsToAccount.length === 0){
    nav.navigate('NewAccountsScreen',{accountName:toCurrency})
   }
   else {
    nav.navigate('NewAccountsScreen',{accountName:toCurrency})
   }

   
  };
  const findIsSellAccounts = (fromCurrency, toCurrency, price) => {
    let findIsFromAccount = getUserAccountsCurrencyType(fromCurrency);
    let findIsToAccount = getUserAccountsCurrencyType(toCurrency);

    
   

   if(findIsFromAccount.length != 0 && findIsToAccount.length != 0){
    nav.navigate('CurrencySellPage', {
      name: fromCurrency,
      toCurrency: fromCurrency,
      fromCurrency: toCurrency,
      price: price,
    })
   }else if( findIsFromAccount.length === 0){
    nav.navigate('NewAccountsScreen',{accountName:fromCurrency})
   }else if(findIsToAccount.length === 0){
    nav.navigate('NewAccountsScreen',{accountName:toCurrency})
   }
   else {
    nav.navigate('NewAccountsScreen',{accountName:toCurrency})
   }
  };
  
  


  const getDataFromApiAsync = async () => {
    try {
      const response = await fetch(
        'https://min-api.cryptocompare.com/data/pricemulti?fsyms=' +
          fromCurr +
          '&tsyms=' +
          toCurrs,
      );
      let index = 0;
      const json = await response.json();
      var Output = Object.entries(json).flatMap(([fromCurrency, values]) =>
        Object.entries(values).map(([toCurrency, price]) => ({
          fromCurrency,
          toCurrency,
          price,
          id: index++,
        })),
      );

      setCurrencyList(Output);
      setOldData(Output);
     
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text !== '') {
      let tempData = currencyList.filter(item => {
        return (
          item.fromCurrency.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
          item.toCurrency.toLowerCase().indexOf(text.toLowerCase()) > -1
        );
      });
      setCurrencyList(tempData);
    } else {
      setCurrencyList(oldData);
    }
  };

 

  useFocusEffect(
    React.useCallback(() => {
      getDataFromApiAsync();
      let interval = setInterval(() => {
        getDataFromApiAsync();
      },5000);

      return () => {
        clearInterval(interval);
      };
    }, []),
  );



  return (
    <View style={{height: '100%', backgroundColor: '#F5F8FF'}}>
      <View style={{marginHorizontal: 20,marginTop:20}}>
        <View
          style={{
            width: '100%',
            height: 50,
            borderRadius: 10,
            borderWidth: 0.2,

            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={Search}
            style={{width: 24, height: 24, marginLeft: 15, opacity: 0.5}}
          />
          <TextInput
            ref={searchRef}
            placeholder="Döviz ara..."
            style={{width: '76%', height: 50}}
            value={search}
            onChangeText={txt => {
              searchFilterFunction(txt);
              setSearch(txt);
            }}
          />
          {search == '' ? null : (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => {
                searchRef.current.clear();
                searchFilterFunction('');
                setSearch('');
              }}>
              <Image
                source={Close}
                style={{width: 16, height: 16, opacity: 0.5}}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ height: 10,}}/>
        
        <View
                  style={{
                    width: '100%',
                    height: 40,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                    <Text style={{marginLeft: 181}}>AL</Text>
                    <Text style={{marginRight: 30}}>SAT</Text>
                    </View>
                    <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: '#CCC',
              }}></View>
              <View style={{ height: 10,}}/>
       
        <FlatList
          data={currencyList}
         
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: '#CCC',
              }}></View>
          )}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  marginBottom: index == currencyList.length - 1 ? 20 : 0,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: '100%',
                    height: 70,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{fontWeight: '600', marginLeft: 10, marginTop: 10}}>
                    {item.fromCurrency.substring(0, 30)} /{' '}
                    {item.toCurrency.substring(0, 50)}
                  </Text>

                  <Pressable
                    style={({pressed}) => [
                      {backgroundColor: pressed ? '#009387' : 'white'},
                      styles.button,
                     
                    ]}
                  
                    onPress={() =>
                      findIsAccounts(
                        item.fromCurrency,
                        item.toCurrency,
                        item.price,
                      )
                    }>
                    <Text style={styles.text}>{item.price}</Text>
                  </Pressable>

                 
                  <Pressable
                    style={({pressed}) => [
                      {backgroundColor: pressed ? '#009387' : 'white'},
                      styles.button,
                    ]}
                    onPress={() =>
                      findIsSellAccounts(
                        item.fromCurrency,
                        item.toCurrency,
                        item.price,
                      )
                    }>
                    <Text style={styles.text}>{item.price}</Text>
                  </Pressable>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default CurrencyPage;
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

  currView: {
    marginTop: 10,
    backgroundColor: '#F5F8FF',
    marginBottom: 100,
  },
  textView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    //paddingHorizontal: 12,
    paddingTop: 10,
    //paddingBottom: 10,
  },
  headerText: {
    marginRight: 45,
    marginHorizontal: 45,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 40,
    marginLeft: 10, marginTop: 10,
    borderColor: '#009387',
    borderRadius: 4,
    elevation: 3,
  },

  alSat: {
    top: -18,
    textAlign: 'left',
    left: 204,
    position: 'absolute',
    color: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
});
