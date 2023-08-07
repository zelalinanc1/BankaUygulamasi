import {View,SafeAreaView, StyleSheet, Text, FlatList, TouchableOpacity,NestableScrollContainer,NestableDraggableFlatList,ScrollView} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../navigation/AuthProvider';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormButton from '../components/FormButton';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AllUserAccounts = route => {
  const {user, logout, getUserDetail, userAccounts, userId} =
    useContext(AuthContext);

  const nav = useNavigation();

  useEffect(() => {
    getUserDetail();
  }, []);

  
  return (
   
      <View>
        
      {userAccounts != null ? (
      
        <View style={styles.dayContainer}>
          <FlatList
            data={userAccounts}
            
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
              <View style={{marginTop: 30}}>
                <Text>
                  {item.accountType} {item.currencyType.split('-')[1]}{' '}
                </Text>
                <View style={styles.container}>
                  <View style={styles.mainContent}>
                    <MaterialCommunityIcons
                      name="account-cash"
                      size={30}
                      color="#000"
                      style={{marginRight: 15}}
                    />

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.operationTitle}>
                        {item.accountIban}
                      </Text>
                      <Text style={styles.operationTitle}>
                        {item.branchName}
                      </Text>
                    </View>
                  </View>
                  <View></View>
                  <View
                    style={{
                      marginStart: 20,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{paddingLeft: 33}}>Bakiye</Text>
                    <Text
                      style={{
                        fontFamily: 'OpenSans-Regular',
                        color: '#009142',
                        fontSize: 16,
                      }}>
                      {item.currencyCount.toFixed(2)}{' '}
                      {item.currencyType.split('-')[0]}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
    
      ) : (
        <View style={styles.centerContainer}>
          <Icon name="credit-card-alt" size={80} />
          <Text style={{paddingTop: 30, paddingHorizontal: 10}}>
            Henüz bir hesabınız bulunmamaktadır."Hesap Aç" butonuna basarak
            hesabınızı açabilirsiniz.
          </Text>
          <View style={{height: 30}} />

          <TouchableOpacity
            style={styles.signIn}
            onPress={() => nav.navigate('AccountRegisterScreen')}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                Hesap Aç
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
     
      </View>
    
  );
};

export default AllUserAccounts;
const styles = StyleSheet.create({
  dayContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#edf1f2',
    marginBottom: 50,
  },
  centerContainer: {
    //flexDirection: 'row',
    marginTop: 100,
    alignItems: 'center',
  },
  container: {
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#edf1f2',
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  mainContent: {
    flexDirection: 'row',
  },
  signIn: {
    width: '95%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  operationTitle: {
    color: '#000',
    fontFamily: 'OpenSans-Bold',
    marginBottom: 2,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  operationSource: {},
});
