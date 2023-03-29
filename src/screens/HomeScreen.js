import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native'
import React, {useContext,useState,Context} from 'react'
import FormButton from '../components/FormButton'
import { AuthContext } from '../navigation/AuthProvider'
// import ImagePicker, { openPicker } from 'react-native-image-crop-picker'
// import Entypo from 'react-native-vector-icons/Entypo'
// import imgPlaceHolder from '../images/avatar.jpg'


const HomeScreen = () => {
  const {user, logout} = useContext(AuthContext);

  
  
  return (
    <View style={styles.container}>
      <Text>Welcome {user.uid}</Text>
        
       <FormButton buttonTitle='Logout' onPress={() => logout()}/>
    
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});