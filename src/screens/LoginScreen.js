import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,

} from 'react-native';
import React, {useState,useContext} from 'react';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

const LoginScreen = ({navigation}) => {

  const [tcNo, setTcNo] = useState();

  const [password, setPassword] = useState();

  const [error, setError] = useState('');

  const updateError = (error, stateUpdater) => {
    stateUpdater(error);

    setTimeout(() => {
      stateUpdater('');
    }, 2500);
  };

  const isValidForm = () => {

  
    if (!tcNo || !password)
    return updateError('Lütfen alanları doldurunuz!', setError);
   
    if (tcNo.length !== 4)
      return updateError('TCNO 4 karaktere sahip olmalıdır!', setError);

    if (password.length < 8)
      return updateError('Şifreniz az 8 karaktere sahip olmalıdır!', setError);

    
  
    return true;
  };

  const onSubmitForm = () => {
    if (isValidForm()) {
      login(tcNo+"@gmail.com",password);
    }
  };

  const{login} =useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Giriş Sayfası</Text>

      {error ? <Text>{error}</Text> : null}

      <FormInput
        labelValue={tcNo}
        onChangeText={userTcNo => setTcNo(userTcNo)}
        placeholderText="TCNO"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="Şifre"
        secureTextEntry={true}
      />
      <FormButton
        buttonTitle="Giriş Yapın"
       onPress={onSubmitForm}
      />
      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('SignUpWithNameScreen')}>
        <Text style={styles.navButtonText}>
          Kayıt Ol
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default LoginScreen;

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
});
