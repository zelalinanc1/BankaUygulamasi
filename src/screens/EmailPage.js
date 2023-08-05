import { View, Text,StyleSheet,TextInput } from 'react-native'
import React, {useContext, useState} from 'react';

const EmailPage = ({route}) => {

  const [email, setEmail] = useState();

  const {userIdentity} = route.params;

  console.log(userIdentity)
  
  return (
    <View>
        <View style={styles.accountList_item}>
           
        <View style={styles.accountList_item_image_text}>
             {/* <Text style={styles.account_libelle}>E-post Bilgileri</Text> */}
            
           
           </View>
           <TextInput 
                  placeholder={userIdentity}
                  placeholderTextColor="black"
                  style={[styles.accountList_item_image_text]}
                  autoCapitalize="none"
                  onChangeText={userEmail => setEmail(userEmail)}
                
              />

         </View>
        
       
    </View>
  )
}

export default EmailPage;
const styles = StyleSheet.create({
    accountList_item_image_text: {
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: 'bold',
      },
      accountList_item: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height:90,
        marginTop:20
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
})