import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native'
import React, {useContext,useState,Context,useEffect} from 'react'
import FormButton from '../components/FormButton'
import { AuthContext } from '../navigation/AuthProvider'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const HomeScreen = () => {
  const {user, logout} = useContext(AuthContext);
  const[userName,setUserName] =useState('');
  const[userLastName,setUserLastName] =useState('');
  const[userBirthday,setUserBirthday] =useState('');
  const[userIdentity,setUserIdentity] =useState('');
  const[userImage,setUserImage] =useState();
  const [userData, setUserData] = useState(null);


  const getUser = async() => {
    const currentUser = await firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
        console.log("*********--------");
       setUserName(documentSnapshot.data().name);
       setUserLastName(documentSnapshot.data().lastName);
       setUserBirthday(documentSnapshot.data().birthday);
       setUserIdentity(documentSnapshot.data().tcNo.split('@gmail.com'));
       setUserImage(documentSnapshot.data().userImg);
      }
    })
  }

  useEffect(() => {
    getUser();
  }, []);

 
  return (
    <View style={styles.container}>
      <Text>Welcome {user.uid}</Text>
      <Text> Kullanici Adi: {userName}</Text>
      <Text> Kullanici Soyadi: {userLastName}</Text>
      <Text> Kullanici Resim: {userImage}</Text>
      <Text> Kullanici Tc: {userIdentity}</Text>
      <Text> Kullanici Doğum Tarihi: {userBirthday}</Text>
        {/* <Image style={styles.image} source={{uri: {userImage} }} />  */}
         
       <FormButton buttonTitle='Logout' onPress={() => logout()}/>
    
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});