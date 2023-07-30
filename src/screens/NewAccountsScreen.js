import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import FormButton from '../components/FormButton';
import {useRoute, useNavigation} from '@react-navigation/native';

const NewAccountsScreen = () => {
    const route = useRoute();

    const params = route.params;

    let {accountName} = route.params;

    const navigation = useNavigation();
    
  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
      <Icon name="credit-card-alt" size={80}  />
      <Text style={{paddingTop:30,paddingHorizontal:10}}>Bu işlemi gerçekleştirecek {accountName} hesabınız bulunmamaktadır."Yeni Hesap Aç" butonuna basarak hesabınızı hemen açabilirsiniz.</Text>
      <View style={{height:30}}/>
      <FormButton buttonTitle="Yeni Hesap Aç" onPress={()=> navigation.navigate("AccountRegisterScreen")} />
      </View>
    </View>
  )
}

export default NewAccountsScreen;
const styles = StyleSheet.create({
    container: {
     
      height: '100%',
      backgroundColor: '#F5F8FF',
      alignItems: 'center',
      //justifyContent: 'space-between',
      //marginBottom: 20,
    },
    centerContainer: {
        //flexDirection: 'row',
        marginTop: 100,
        alignItems: 'center',
    },
 
  });