import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
  } from 'react-native';
  import React, {useContext, useState} from 'react';
  import FormInput from '../components/FormInput';
  import FormButton from '../components/FormButton';
  import {AuthContext} from '../navigation/AuthProvider';
  import ImagePicker, {openPicker} from 'react-native-image-crop-picker';
  import Entypo from 'react-native-vector-icons/Entypo';
  import imgPlaceHolder from '../images/avatar.jpg';
  import storage from '@react-native-firebase/storage';
  import uuid4 from 'uuid4';
  import auth from '@react-native-firebase/auth';
  import firestore from '@react-native-firebase/firestore';

const SignUpWithImageScreen = ({navigation}) => {

    const [profile, setProfile] = useState(null);
    const [url, setUrl] = useState('');
    const [transferred, setTransferred] = useState(0);

    const imagePick = async() => {
        ImagePicker.openPicker({
          width: 400,
          height: 400,
          cropping: true,
        }).then(image => {
          console.log(image);
          console.log('************************');
          setProfile(image.path);
        });


      };
    
      const uploadImage = async () => {
    
        const uploadUri = profile;
    
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    
        console.log(filename);
    
        const extension = filename.split('.').pop(); 
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;
    
        setTransferred(0);
    
        const storageRef = storage().ref(`photos/${filename}`);
        const task = storageRef.putFile(uploadUri);
    
            // Set transferred state
            task.on('state_changed', (taskSnapshot) => {
              console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
              );
        
              setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                  100,
              );
            });
        
            try {
              await task;
        
               const url = await storageRef.getDownloadURL();
        
              setProfile(null);

              console.log("----------------");
              console.log(url);
           
            
             
              navigation.navigate('Signup',{url:url});
        
            } catch (e) {
              console.log(e);
              return null;
            }

           
           
    
      };

      
    
   
  return (
    <View>
      <Text>SignUpWithImageScreen</Text>
      <View style={styles.imgContainer}>
        <Image
          style={styles.image}
          source={profile ? {uri: profile} : imgPlaceHolder}
        />
        <TouchableOpacity
          onPress={imagePick}
          style={{alignItems: 'flex-end', top: -10}}>
          <Entypo name="pencil" size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text>Kullanici</Text>
      </View>
      <TouchableOpacity
        style={styles.forgotButton}
        onPress={uploadImage}>
        <Text style={styles.navButtonText}>
          Register
        </Text>
      </TouchableOpacity> 
      {/* <TouchableOpacity
        style={styles.forgotButton}
        onPress= {() => {
            navigation.navigate('Signup',{
                url:'hiiii',
            });
          }}>
        <Text style={styles.navButtonText}>
          Git
        </Text>
      </TouchableOpacity>  */}
    </View>

   
   
  );
}

export default SignUpWithImageScreen;

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
  