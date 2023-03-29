import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native'
import React, {useContext,useState} from 'react';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import ImagePicker, { openPicker } from 'react-native-image-crop-picker'
import Entypo from 'react-native-vector-icons/Entypo'
import imgPlaceHolder from '../images/avatar.jpg'
import storage from '@react-native-firebase/storage';


const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();

  const [profile, setProfile] = useState(null)

  const imagePick = () => {
      ImagePicker.openPicker({
          width: 400,
          height: 400,
          cropping: true
      }).then(image => {
          console.log(image);
          setProfile(image.path)
         
      });
  };

  const uploadImage = async() => {
    const reference = storage().ref(profile);
    const pathToFile = profile;
    // uploads file
    await reference.putFile(pathToFile);
    
  };
  



  const {register} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Register Sayfasi</Text>
      <View style={styles.imgContainer}>
                    <Image style={styles.image} source={profile ? { uri: profile } : imgPlaceHolder} />
                    <TouchableOpacity onPress={imagePick}
                        style={{ alignItems: 'flex-end', top: -10 }}>
                        <Entypo name="pencil" size={20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.textContainer}>
                    <Text>Kullanici</Text>
                </View>
                <TouchableOpacity onPress={uploadImage}>
                  <Text>Yükle</Text>
                </TouchableOpacity>
            
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
        onPress={() => register(email + '@gmail.com', password, name,profile)}
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
    alignItems: 'center'
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
    margin: 16
}
});
