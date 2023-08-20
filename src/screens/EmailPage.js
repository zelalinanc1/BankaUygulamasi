import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../navigation/AuthProvider';

const EmailPage = ({route, navigation}) => {
  const [email, setEmail] = useState();

  const {updateEmail, userIdentity, getUserDetail} = useContext(AuthContext);

  const {userMail} = route.params;

  useEffect(() => {
    getUserDetail();
    userIdentity;
  }, []);

  const updatedEmail = async () => {
    await updateEmail(email);
    navigation.navigate('ProfileScreen');
  };

  return (
    <View>
      <View style={styles.accountList_item}>
        <Feather name="check-circle" color="green" size={20} />
        <TextInput
          placeholder={userMail}
          placeholderTextColor="black"
          style={[styles.accountList_item_image_text]}
          autoCapitalize="none"
          onChangeText={userEmail => setEmail(userEmail)}
        />
      </View>
      <View style={{width: 110}} />

      <TouchableOpacity
        onPress={() => updatedEmail()}
        style={[
          styles.signIn,
          {
            borderColor: '#009387',
            borderWidth: 1,
            marginVertical:30
          },
        ]}>
        <Text
          style={[
            styles.textSign,
            {
              color: 'white',
            },
          ]}>
          Güncelle
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmailPage;
const styles = StyleSheet.create({
  accountList_item_image_text: {
    width: 200,
    marginStart: 10,
    fontWeight: 'bold',
  },
  accountList_item: {
    backgroundColor: '#fff',

    borderBottomColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    height: 90,
    marginTop: 20,
  },

  account_libelle: {
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Regular',
    color: '#000',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  signIn: {
    width: 90,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 150,
    backgroundColor:'#01ab9d'
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
