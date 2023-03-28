import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    Image,
    Alert,
  } from 'react-native';
  import React, {useState,useContext} from 'react';
  import FormInput from '../components/FormInput';
  import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

  
  const SignupScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [image, setImage] = useState();

    const {register} = useContext(AuthContext);
  
    return (
      <View style={styles.container}>
        <Text>Register Sayfasi</Text>
        <FormInput
          labelValue={email}
          onChangeText={userEmail => setEmail(userEmail)}
          placeholderText="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
         <FormInput
          labelValue={image}
          onChangeText={userImage => setImage(userImage)}
          placeholderText="image"
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
          onPress={() => register(email+"@gmail.com",password,name)}
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
  });
  