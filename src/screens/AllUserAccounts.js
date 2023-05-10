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
import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import UserAccounts from '../components/UserAccounts';
import {useNavigation} from '@react-navigation/native';

const AllUserAccounts = (route) => {

    const {user,logout} = useContext(AuthContext);

    const nav = useNavigation();

    
  

  // const [userAccountNumber, setUserAccountNumber] = useState();
  // const [userAccountIban, setUserAccountIban] = useState('');
  // const [AccountType, setAccountType] = useState('');
  // const [currencyType, setCurrencyType] = useState('');
  // const [branchName, setBranchName] = useState('');
  
  const [userData, setUserData] = useState(null);

  const [userAccountsData, setUserAccountsData] = useState('');

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
          setUserAccountsData(documentSnapshot.data().userAccounts);

          console.log("denemesss"+JSON.stringify(userAccountsData));

        
          
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
     <View
          style={{
            marginTop: 10,
            backgroundColor: '#F5F8FF',
            overflow: 'hidden',
            marginBottom: 100,
          }}>
            <Text>Kullanıcının Hesapları</Text>
          <FlatList
            data={userAccountsData}
            style={{height: Dimensions.get('window').height / 2}}
            ItemSeparatorComponent={() => (
              <View style={{marginVertical: 8}}></View>
            )}
            renderItem={({item}) => (
              <View>
               <UserAccounts item={item}
              //  onPress={() => nav.navigate('CurrencyTradePage',item)}
               />
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      

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

export default AllUserAccounts;
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
  