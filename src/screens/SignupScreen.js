import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useContext, useState} from 'react';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import ImagePicker, {openPicker} from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import imgPlaceHolder from '../images/avatar.jpg';
import storage from '@react-native-firebase/storage';
import uuid4 from 'uuid4';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';

const SignupScreen = ({route,navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();

  const { url } = route.params;

  const {register} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Register Sayfasi</Text>
      <Text>URL:{url}</Text>
    
     

      <FormInput
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="Password"
        secureTextEntry={true}
      />
      <FormInput
        labelValue={name}
        onChangeText={userName => setName(userName)}
        placeholderText="name"
        autoCorrect={false}
      />

      <FormButton
        buttonTitle="Kayıt Ol"
        onPress={() =>register(email + '@gmail.com', password, name,url)}
        
      />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
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
  profileContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {},
  textContainer: {
    alignItems: 'center',
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
  },
  userInfo: {
    flex: 1,
  },
  bio: {
    borderRadius: 10,
    padding: 16,
    margin: 16,
  },
});
