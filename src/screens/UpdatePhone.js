import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React, {useEffect,useContext} from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import AntDesign from 'react-native-vector-icons/AntDesign';

const UpdatePhone = ({route}) => {

    
  const {userPhones} = route.params;

  const {userPhone} = useContext(AuthContext);

  useEffect(() => {
   userPhone
  }, [])
  

  userPhone != null ? console.log("bos degul") : console.log("bos")

  return (
    <View style={styles.container}>
      <Text style={{paddingStart:20,marginTop:20}}>Telefon Bilgileri </Text>
      <AntDesign style={{paddingStart:250,marginTop:20}} name="pluscircleo" size={20} color='#009387'  />
      
    </View>
  )
}

export default UpdatePhone;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#F5F8FF',
    justifyContent: 'flex-start',
     flexDirection: 'row',
    marginBottom: 10,
  },
  accountList_item: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#edf1f2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:50
  },
  accountList_item_image_text: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  account_libelle: {
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Regular',
    color: '#000',
  },
})