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

  const [confirmPassword, setConfirmPassword] = useState();

  const [error, setError] = useState('');

  const { url,name,lastName,birthday,tcNo} = route.params;

  const {register} = useContext(AuthContext);

  const updateError = (error, stateUpdater) => {
    stateUpdater(error);

    setTimeout(() => {
      stateUpdater('');
    }, 2500);
  };

  
  const isValidForm = () => {

    if (!password || !confirmPassword)
    return updateError('Lütfen alanları doldurunuz!', setError);

    if (password.length < 8)
      return updateError('Şifreniz az 8 karaktere sahip olmalıdır', setError);

    if (password !== confirmPassword)
      return updateError('Girdiğiniz şifreler eşlemedi.Tekrar deneyiniz lütfen!', setError);

    return true;
  };

  const onSubmitForm = () => {
    if (isValidForm()) {
      register(tcNo + '@gmail.com', password, name,lastName,birthday,url);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Register Sayfasi</Text>

      {error ? <Text>{error}</Text> : null}

      <FormInput
        labelValue={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="Şifre"
        secureTextEntry={true}
      />
      <FormInput
        labelValue={confirmPassword}
        onChangeText={userConfirmPassword => setConfirmPassword(userConfirmPassword)}
        placeholderText="Şifre Tekrar "
        secureTextEntry={true}
      />
  

      <FormButton
        buttonTitle="Kayıt Ol"
       // onPress={() =>register(tcNo + '@gmail.com', password, name,lastName,birthday,url)}
       onPress={onSubmitForm}
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
