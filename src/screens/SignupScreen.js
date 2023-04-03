import {
  View,
  Text,
  StyleSheet,
  
} from 'react-native';
import React, {useContext, useState} from 'react';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';


const SignupScreen = ({route,navigation}) => {

  const [password, setPassword] = useState();
  const { url,name,lastName,birthday,tcNo} = route.params;

  const {register} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Register Sayfasi</Text>
      <Text>URL:{url}</Text>
      <FormInput
        labelValue={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="Şifre"
        secureTextEntry={true}
      />
  

      <FormButton
        buttonTitle="Kayıt Ol"
        onPress={() =>register(tcNo + '@gmail.com', password, name,lastName,birthday,url)}
        
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
