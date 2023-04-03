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

const SignUpWithNameScreen = ({navigation}) => {
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [birthday, setBirthday] = useState();
  const [tcNo, setTcNo] = useState();

  const {register} = useContext(AuthContext);

  return (
    <View style={styles.container}>
    <Text>İsim Kayıt Sayfası</Text>
   
    <FormInput
      labelValue={name}
      onChangeText={userName => setName(userName)}
      placeholderText="İsim"
      autoCorrect={false}
    />
    <FormInput
      labelValue={lastName}
      onChangeText={userLastName => setLastName(userLastName)}
      placeholderText="Soyisim"
      autoCorrect={false}
    />
      <FormInput
      labelValue={birthday}
      onChangeText={userBirthday => setBirthday(userBirthday)}
      placeholderText="Doğum Tarihi"
      autoCorrect={false}
    />
    <FormInput
      labelValue={tcNo}
      onChangeText={userTcNo => setTcNo(userTcNo)}
      placeholderText="TCKN:"
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
    />
     <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('SignUpWithImageScreen',{name:name,lastName:lastName,birthday:birthday,tcNo:tcNo})}>
        <Text style={styles.navButtonText}>
          Resim Kayıt Sayfası
        </Text>
      </TouchableOpacity>
 

  </View>
  );
}

export default SignUpWithNameScreen;

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
  