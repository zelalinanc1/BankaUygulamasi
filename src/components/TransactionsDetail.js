import {View, Text, StyleSheet,FlatList,TouchableOpacity} from 'react-native';
import React from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TransactionsDetail = props => {


    const route = useRoute();

    const params = route.params;

    let {transactions,transactions1} = typeof props.item == 'undefined' ? params : props.item;

   
  

  return (
    <View>
    <View style={styles.dayContainer}>
     <FlatList
          data={transactions}
          ItemSeparatorComponent={() => (
            <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#CCC',
            }}></View>
          )}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View>
            <View style={styles.container}>
            <View style={styles.mainContent}>
              <AntDesign
                name="codepen-circle"
                size={30}
                color="#000"
                style={{marginRight: 15}}
              />
        
              <View style={{flexDirection: 'row',
                }}>
                <Text style={styles.operationTitle}>{item.accountCurrencyToChoise}</Text>
                <AntDesign
                name="retweet"
                size={20}
                color="#000"
                
              />
                <Text style={styles.operationTitle}>{item.accountCurrencyFromChoise}</Text>
              </View>
            </View>
            <View>
            </View>
            <View
            style={{
              marginStart: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{paddingLeft:33}}>{item.date}</Text>
            <Text
              style={{
                fontFamily: 'OpenSans-Regular',
                color: '#154ee7',
                fontSize: 16,
              }}>
              {item.currencyToAmount} {item.toCurrency}
            </Text>
           
           
            
            </View>
           
          </View>
          </View>
          )}
        />

        <Text>ikicissssssssssssi</Text>

        <FlatList
          data={transactions1}
          ItemSeparatorComponent={() => (
            <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#CCC',
            }}></View>
          )}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View>
            <View style={styles.container}>
            <View style={styles.mainContent}>
              <AntDesign
                name="codepen-circle"
                size={30}
                color="#000"
                style={{marginRight: 15}}
              />
        
              <View style={{flexDirection: 'row',
                }}>
                <Text style={styles.operationTitle}>{item.accountCurrencyToChoise}</Text>
                <AntDesign
                name="retweet"
                size={20}
                color="#000"
                
              />
                <Text style={styles.operationTitle}>{item.accountCurrencyFromChoise}</Text>
              </View>
            </View>
            <View>
            </View>
            <View
            style={{
              marginStart: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{paddingLeft:33}}>{item.date}</Text>
            <Text
              style={{
                fontFamily: 'OpenSans-Regular',
                color: '#154ee7',
                fontSize: 16,
              }}>
              {item.currencyToAmount} {item.toCurrency}
            </Text>
           
           
            
            </View>
           
          </View>
          </View>
          )}
        />

     
    </View>
    </View>
  )
}

export default TransactionsDetail;

const styles = StyleSheet.create({
    dayContainer: {
      backgroundColor: '#fff',
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#edf1f2',
      marginBottom: 5,
    },
  
    mainTextContainer: {
      marginTop: 15,
    },
  
    mainTitle: {
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 15,
      fontFamily: 'OpenSans-Regular',
      fontSize: 16,
    },
    container: {
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#edf1f2',
      },
    
      mainContent: {
        flexDirection: 'row',
       
      },
    
      operationTitle: {
        color: '#000',
        fontFamily: 'OpenSans-Bold',
        marginBottom: 2,
        fontWeight: 'bold',
        marginHorizontal:10
      },
      operationSource: {},
  });