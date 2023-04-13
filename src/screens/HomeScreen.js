import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import imgPlaceHolder from '../images/avatar.jpg';

const HomeScreen = ({navigation}) => {
  const {user,logout} = useContext(AuthContext);

  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userBirthday, setUserBirthday] = useState('');
  const [userIdentity, setUserIdentity] = useState('');
  const [userImage, setUserImage] = useState();
  const [userAccountIban, setUserAccountIban] = useState('');
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
          setUserName(documentSnapshot.data().name);
          setUserLastName(documentSnapshot.data().lastName);
          setUserBirthday(documentSnapshot.data().birthday);
          setUserIdentity(documentSnapshot.data().tcNo.split('@gmail.com'));
          setUserImage(documentSnapshot.data().userImg);
          setUserAccountIban(documentSnapshot.data().accountIban);
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

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
      <Text> Kullanici Doğum Tarihi: {userBirthday}</Text>
      <Text> Kullanici Iban: {userAccountIban}</Text>
      {!userAccountIban ? (
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
      )}

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
