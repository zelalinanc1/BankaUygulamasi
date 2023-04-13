import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const AccountDetailsScreen = () => {

    const {user,logout} = useContext(AuthContext);
  

  const [userAccountNumber, setUserAccountNumber] = useState();
  const [userAccountIban, setUserAccountIban] = useState('');
  const [AccountType, setAccountType] = useState('');
  const [currencyType, setCurrencyType] = useState('');
  const [branchName, setBranchName] = useState('');
  
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    const currentUser = await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
          console.log('*********--------');
          // console.log(user.uid);
          setUserAccountNumber(documentSnapshot.data().accountNumber);
          setUserAccountIban(documentSnapshot.data().accountIban);
          setAccountType(documentSnapshot.data().accountType);
          setCurrencyType(documentSnapshot.data().currencyType);
          setBranchName(documentSnapshot.data().branchName);
         
          
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text>AccountDetailsScreen</Text>
      <Text>Iban {userAccountIban}</Text>
      <Text>Hesap No {userAccountNumber}</Text>
      <Text>Hesap Tipi {AccountType}</Text>
      <Text>Döviz Tipi {currencyType}</Text>
      <Text>Şube {branchName}</Text>

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={()=> logout()}>
        <Text style={styles.navButtonText}>
         Çıkış Yap
        </Text>
      </TouchableOpacity>
    </View>
    
  )
}

export default AccountDetailsScreen;
const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      paddingTop: 50,
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
  