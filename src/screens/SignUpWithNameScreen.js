import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useContext, useState} from 'react';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import DatePicker from 'react-native-date-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignUpWithNameScreen = ({navigation}) => {
  
  const [userInfo, setUserInfo] = useState({
    name: '',
    lastName: '',
    tcNo: '',
  });

  const {name, lastName, tcNo} = userInfo;

  const {register} = useContext(AuthContext);

  const [birthday, setBirthday] = useState(new Date());

  const [open, setOpen] = useState(false);

  const [error, setError] = useState('');

  const isValidObjField = obj => {
    return Object.values(obj).every(value => value.trim());
  };

  const updateError = (error, stateUpdater) => {
    stateUpdater(error);

    setTimeout(() => {
      stateUpdater('');
    }, 2500);
  };

  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError('Tüm alanlar doldurulmalıdır!', setError);

    if (!name.trim() || name.length < 3)
      return updateError('İsim en az üç karakterli olmalıdır', setError);

    if (!lastName.trim() || lastName.length < 2)
      return updateError('Soyisim en az iki karakterli olmalıdır', setError);

    if (!tcNo.trim() || tcNo.length != 4)
      return updateError('TcNo 4 karaktere sahip olmalıdır', setError);

    return true;
  };

  const submitForm = () => {
    if (isValidForm()) {
      navigation.navigate('SignUpWithImageScreen', {
        name: userInfo.name,
        lastName: userInfo.lastName,
        tcNo: userInfo.tcNo,
        birthday: birthday?.toLocaleDateString(),
      });
    }
  };

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({...userInfo, [fieldName]: value});
  };



  return (
    <View style={styles.container}>
      <Text>İsim Kayıt Sayfası</Text>
      {error ? <Text>{error}</Text> : null}
      <FormInput
        labelValue={name}
        onChangeText={value => handleOnChangeText(value, 'name')}
        placeholderText="İsim"
        autoCorrect={false}
      />

      <FormInput
        labelValue={lastName}
        onChangeText={value => handleOnChangeText(value, 'lastName')}
        placeholderText="Soyisim"
        autoCorrect={false}
      />

      <View style={styles.dateStyle}>
        <DatePicker
          mode="date"
          modal
          open={open}
          date={birthday}
          onConfirm={value => {
            setOpen(false);
            setBirthday(value);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Entypo name="calendar" size={30} />
          <Text>Doğum Günü Tarihiniz {birthday?.toLocaleDateString()} </Text>
        </TouchableOpacity>
      </View>

      <FormInput
        labelValue={tcNo}
        onChangeText={value => handleOnChangeText(value, 'tcNo')}
        placeholderText="TCKN:"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity style={styles.forgotButton} onPress={submitForm}>
      <Icon name="arrow-right" size={15} color="black" />
      </TouchableOpacity>

     
    </View>
  );
};

export default SignUpWithNameScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  dateStyle: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
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
   borderRadius: 50,
   paddingVertical: 30,
   paddingHorizontal: 12,
   marginLeft: 300
    
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
