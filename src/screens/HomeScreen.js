import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import imgPlaceHolder from '../images/avatar.jpg';

const HomeScreen = ({route, navigation}) => {
  const {user,logout,getUserDetail,userName,userLastName,userBirthday,userIdentity,userImage,userAccounts,accountTransactions} = useContext(AuthContext);

  

  useEffect(() => {
    getUserDetail();
   
  }, []);

 // console.log(userAccounts[1].accountDetailName);
  

  return (
    <View style={styles.container}>
      <Text>
        Welcome {userName} {userLastName}!
      </Text>
      <Text>{user.uid}</Text>
      <Image
        style={styles.image}
        source={userImage ? {uri: userImage} : imgPlaceHolder}
      />
      <Text> Kullanici Tc: {userIdentity}</Text>
      
      {/* {!userAccountIban ? (
        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => navigation.navigate('AccountRegisterScreen')}>
          <Text style={styles.navButtonText}>Hesap Oluştur</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => navigation.navigate('AccountDetailsScreen')}>
          <Text style={styles.navButtonText}>Hesap Bilgilerini Gör</Text>
        </TouchableOpacity>
      )} */}

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('AccountRegisterScreen')}>
        <Text style={styles.navButtonText}>Hesap Oluştur</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('AllUserAccounts')}>
        <Text style={styles.navButtonText}>Tüm Hesapları Gör</Text>
      </TouchableOpacity> */}

     
      <TouchableOpacity style={styles.forgotButton} onPress={() => logout()}>
        <Text style={styles.navButtonText}>Çıkış Yap</Text>
      </TouchableOpacity>

    
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
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
});