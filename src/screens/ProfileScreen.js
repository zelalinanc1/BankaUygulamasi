import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../navigation/AuthProvider';
import imgPlaceHolder from '../images/avatar.jpg';
import FormButton from '../components/FormButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';




const ProfileScreen = ({ navigation}) => {

 const {user,logout,getUserDetail,userName,userLastName,userImage,userPhone,userIdentity} = useContext(AuthContext);


  useEffect(() => {
    getUserDetail();
   
  }, []);

  const updateResim = () => {
     
    navigation.navigate('SignUpWithImageScreen');
  }

  const updateTelefon = () => {
     
    navigation.navigate('UpdatePhone');
  }

  return (
    <View style={styles.container}>
        <View style={styles.headContainer}>
        <Image
        style={styles.image}
        source={userImage ? {uri: userImage} : imgPlaceHolder}
      />
       <Text style={{paddingStart:50}}> {userName} {userLastName}!</Text>
       <View style={{width:110}}/>
       <TouchableOpacity
                  onPress={logout}
                  style={[styles.signIn, {
                      borderColor: '#009387',
                      borderWidth: 1,
                      marginVertical:50
                  }]}
              >
                  <Text style={[styles.textSign, {
                      color: '#009387'
                  }]}>Çıkış</Text>
              </TouchableOpacity>
      
      
        </View>
        <View style={{marginTop:40}}/>

        <View>

        <TouchableOpacity style={styles.accountList_item} onPress={()=>navigation.navigate('EmailPage',{userIdentity: userIdentity})}>
          <View style={styles.accountList_item_image_text}>
           
            <View>
              <Text style={styles.account_libelle}>E-post Bilgileri</Text>
            
            </View>
          </View>

          <AntDesign name="arrowright" size={20} color="#009387" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountList_item} onPress={()=>navigation.navigate('UpdatePhone', {userPhone: userPhone})}>
          <View style={styles.accountList_item_image_text}>
           
            <View>
              <Text style={styles.account_libelle}>Telefon Numarası Bilgileri</Text>
              
            </View>
          </View>

          <AntDesign name="arrowright" size={20} color="#009387" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountList_item} onPress={updateResim}>
          <View style={styles.accountList_item_image_text}>
           
            <View>
              <Text style={styles.account_libelle}>Profil Resmini Değiştir</Text>
              
            </View>
          </View>

          <AntDesign name="arrowright" size={20} color="#009387" />
        </TouchableOpacity>

      </View>
 
      
        
    
    </View>
  )
}

export default ProfileScreen;
const styles = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: '#F5F8FF',
      //alignItems: 'center',
      //justifyContent: 'space-between',
      //marginBottom: 20,
    },
    headContainer: {
        flexDirection: 'row',
        //justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
        height:60,
        backgroundColor: 'white'
    },
    accountList_item: {
      backgroundColor: '#fff',
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#edf1f2',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop:10
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
    centerContainer: {
        flexDirection: 'column',
        //marginTop: 60,
        width:'100%',
        height:50,
        backgroundColor: 'white'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 55,
        borderWidth: 3,
        marginStart:10
      },
      
  createAccountContainer_icon_text: {
    borderWidth: 1,
    borderColor: '#edf1f2',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 30,
  },
  createAccountContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#edf1f2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signIn: {
    width: 90,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
},
textSign: {
  fontSize: 18,
  fontWeight: 'bold'
} 
 
  });