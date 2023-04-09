import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import ImagePicker, {openPicker} from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import imgPlaceHolder from '../images/avatar.jpg';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormButton from '../components/FormButton';

const SignUpWithImageScreen = ({route, navigation}) => {
  const [profile, setProfile] = useState(null);

  const [transferred, setTransferred] = useState(0);

  const {name, lastName, birthday, tcNo} = route.params;

  const imagePick = async () => {
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

  //takePhotoFromCamera

  const takePhotoFromCamera = async () => {
    ImagePicker.openCamera({
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
    const names = filename.split('.').slice(0, -1).join('.');
    filename = names + Date.now() + '.' + extension;

    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', taskSnapshot => {
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

      console.log('----------------');
      console.log(url);

      navigation.navigate('Signup', {
        url: url,
        name: name,
        lastName: lastName,
        birthday: birthday,
        tcNo: tcNo,
      });
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <View>
      <Text>Resimle Kayıt Sayfası </Text>
      <Text>{name}</Text>
      <Text>{lastName}</Text>
      <Text>{birthday}</Text>
      <Text>{tcNo}</Text>
      <View style={styles.imgContainer}>
        <Image
          style={styles.image}
          source={profile ? {uri: profile} : imgPlaceHolder}
        />
         <FormButton buttonTitle="Galeriden seç" onPress={imagePick} />
        <FormButton buttonTitle="Kameradan seç" onPress={takePhotoFromCamera} />
      </View>
     

      <TouchableOpacity style={styles.forgotButton} onPress={uploadImage}>
        <Icon name="arrow-right" size={15} color="black" />
      </TouchableOpacity>
    </View>
  );
};

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
    alignItems: 'flex-end',
    borderRadius: 50,
    paddingVertical: 30,
    paddingHorizontal: 12,
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
  imgContainer: {
    alignItems: 'center',
  },
  imgButtonContainer: {
    marginVertical: 35,
  },
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
