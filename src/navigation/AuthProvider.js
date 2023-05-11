import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const [userId, setUserId] = useState('');
  const [userAccounts, setUserAccounts] = useState('');
  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userBirthday, setUserBirthday] = useState('');
  const [userIdentity, setUserIdentity] = useState('');
  const [userImage, setUserImage] = useState();
  const [userAccountIban, setUserAccountIban] = useState('');
  const [userData, setUserData] = useState(null);

  
  


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userId,
        setUserId,
        userAccounts,
        setUserAccounts,
        userName,
        setUserName,
        userLastName,
        setUserLastName,
        userBirthday,
        setUserBirthday,
        userIdentity,
        setUserIdentity,
        userImage,
        setUserImage,
        userAccountIban,
        setUserAccountIban,
        userData,
        setUserData,
        login: async (tcNo, password) => {
          try {
            await auth().signInWithEmailAndPassword(tcNo, password);
          } catch (e) {
            const error = 'Tc No ve şifre uyuşmuyor';

            Alert.alert(error);
          }
        },

        register: async (tcNo, password, name, lastName, birthday, url) => {
          try {
            const response = await auth().createUserWithEmailAndPassword(
              tcNo,
              password,
            );

            const useData = {
              id: response.user.uid,
              name: name,
              lastName: lastName,
              tcNo: tcNo,
              birthday: birthday,
              userImg: url,
              userAccounts: [],
            };

            await firestore()
              .collection('users')
              .doc(auth().currentUser.uid)
              .set(useData);
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
        getUserDetail: async () => {
          const currentUser = await firestore()
            .collection('users')
            .doc(user.uid)
            .get()
            .then(documentSnapshot => {
              if (documentSnapshot.exists) {
                console.log('User Data', documentSnapshot.data());
                setUserData(documentSnapshot.data());
                setUserId(documentSnapshot.data().id);
                console.log('*********99999999999--------');

                setUserName(documentSnapshot.data().name);
                setUserLastName(documentSnapshot.data().lastName);
                setUserBirthday(documentSnapshot.data().birthday);
                setUserIdentity(
                  documentSnapshot.data().tcNo.split('@gmail.com'),
                );
                setUserImage(documentSnapshot.data().userImg);
                setUserAccountIban(documentSnapshot.data().accountIban);
                setUserAccounts(documentSnapshot.data().userAccounts);
              }
            });
        },
        addCollectionAccounts: async (accountType,currencyType,branchName,accountNumber,accountIban) => {

          let tempUserAccounts = userAccounts;

        //  console.log("ne var icinde"+JSON.stringify(userAccounts));

          tempUserAccounts.push({
            accountType: accountType,
            currencyType: currencyType,
            branchName: branchName,
            accountNumber: accountNumber,
            accountIban: accountIban,
          });

          firestore()
            .collection('users')
            .doc(user.uid)
            .update({
              userAccounts: tempUserAccounts,
            })
            .then(ref => {
              console.log(ref);
            })
            .catch(error => {});
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
