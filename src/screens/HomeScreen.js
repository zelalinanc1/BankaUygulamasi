import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native'
import React, {useContext,useState,Context,useEffect} from 'react'
import FormButton from '../components/FormButton'
import { AuthContext } from '../navigation/AuthProvider'
import { getFirestore,collection } from "@react-native-firebase/firestore";

const HomeScreen = () => {
  const {user, logout} = useContext(AuthContext);

 
  return (
    <View style={styles.container}>
      <Text>Welcome {user.uid}</Text>
      <Text>Welcome {user.name}</Text>
       {/* <Image style={styles.image} source={{uri: user.url }} /> 
         */}
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