import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import ImagePicker, {openPicker} from 'react-native-image-crop-picker';
import imgPlaceHolder from '../images/avatar.jpg';
import storage from '@react-native-firebase/storage';
import {AuthContext} from '../navigation/AuthProvider';
import LinearGradient from 'react-native-linear-gradient';
import FormButton from '../components/FormButton';
import firestore from '@react-native-firebase/firestore';

const UpdatedProfileImage = ({navigation}) => {
  const [image, setImage] = useState(null);

  const [uploading, setUploading] = useState(false);

  const [transferred, setTransferred] = useState(0);

  const {user} = useContext(AuthContext);

  useEffect(() => {
    getUser();
  }, []);

  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    const currentUser = await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
  };

  const handleUpdate = async () => {
    let imgUrl = await uploadImage();

    if (imgUrl == null && userData.userImg) {
      imgUrl = userData.userImg;
    }

    firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        userImg: imgUrl,
      })
      .then(() => {
        console.log('User Updated!');
        Alert.alert('', 'Profil resminiz güncellenmiştir!', [{text: 'Tamam'}]);
      });
    navigation.navigate('MyAccountsPage');
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
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

      setUploading(false);
      setImage(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  return (
    <View>
      <View style={styles.imgContainer}>
        <Image
          style={styles.image}
          source={
            image
              ? {uri: image}
              : userData
              ? imgPlaceHolder || userData.userImg
              : imgPlaceHolder
          }
        />
        <Text style={{marginTop: 10, color: 'black'}}>
          Profil fotoğrafınızı değiştirebilirsiniz.
        </Text>

        <TouchableOpacity
          style={styles.signIn}
          onPress={choosePhotoFromLibrary}>
          <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
            <Text
              style={[
                styles.textSign,
                {
                  color: 'white',
                },
              ]}>
              Galeriden seç
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signIn} onPress={takePhotoFromCamera}>
          <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
            <Text
              style={[
                styles.textSign,
                {
                  color: 'white',
                },
              ]}>
              Fotoğraf Çek
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleUpdate}
          style={[
            styles.signIn,
            {
              borderColor: '#009387',
            },
          ]}>
          <Text
            style={[
              styles.textSign,
              {
                color: '#009387',
              },
            ]}>
            Güncelle
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdatedProfileImage;

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
    fontWeight: 'bold',
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
  signIn: {
    width: '95%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 25,
  },
  profileContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    alignItems: 'center',
    marginTop: 25,
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
