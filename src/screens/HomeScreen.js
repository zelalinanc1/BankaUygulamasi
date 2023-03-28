import { View, Text,StyleSheet,Button} from 'react-native'
import React, {useContext} from 'react'
import FormButton from '../components/FormButton'
import { AuthContext } from '../navigation/AuthProvider'

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
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      paddingTop: 50,
    },
});