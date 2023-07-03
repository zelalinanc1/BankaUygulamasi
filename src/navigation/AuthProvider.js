import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore, {firebase} from '@react-native-firebase/firestore';
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
  const [accountCurrencyType, setAccountCurrencyType] = useState('');
  const [userData, setUserData] = useState(null);

  //let accounts = [];

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
        accountCurrencyType,
        setAccountCurrencyType,
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
              //userAccounts: [],
              // accounts: [],
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
                // console.log('User Data', documentSnapshot.data());
                setUserData(documentSnapshot.data());
                setUserId(documentSnapshot.data().id);

                setUserName(documentSnapshot.data().name);
                setUserLastName(documentSnapshot.data().lastName);
                setUserBirthday(documentSnapshot.data().birthday);
                setUserIdentity(
                  documentSnapshot.data().tcNo.split('@gmail.com'),
                );
                setUserImage(documentSnapshot.data().userImg);
                setUserAccountIban(documentSnapshot.data().accountIban);
                setUserAccounts(documentSnapshot.data().accounts);
                console.log('+++++++');
                //console.log(userAccounts[0].currencyType);
              }
            });
        },
        getUserAccountsCurrencyType: currencyType => {
          {
            function getIndex(currencyType) {
              return userAccounts.filter(
                obj => obj.currencyType.split('-')[0] === currencyType,
              );
            }
          }

          let data = [];

          data = getIndex(currencyType);

          return data;
        },

        getUserAccountByIban: accountIban => {
          {
            function getDataIndex(accountIban) {
              return userAccounts.filter(
                obj => obj.accountIban === accountIban,
              );
            }
          }

          let data;

          data = getDataIndex(accountIban);

          const data1 = Object.assign({}, ...data);

          let deneme = Object.keys(data1)
            .filter(key => !key.includes('_index'))
            .reduce((obj, key) => {
              return Object.assign(obj, {
                [key]: data1[key],
              });
            }, {});

            firestore()
            .collection('users')
            .doc(user.uid)
            .update({
              accounts: firestore.FieldValue.arrayRemove(deneme),
            });

           
          let keys = Object.keys(deneme);
        
          keys.forEach(element => {
            
            if (element == 'currencyCount') {
              deneme[element] = '850';
            }
          });

          console.log(deneme); 

          firestore()
            .collection('users')
            .doc(user.uid)
            .update({
              accounts: firestore.FieldValue.arrayUnion(deneme),
            });

           

          //return data;
        },

        getAccountsUpdateByIban: () => {
          let datas1 = {
            accountDetailName: 'TR161957 1257 SERDİVAN/SAK TRY-Türk Lirası',
            accountIban: 'TR161999',
            accountNumber: 307134,
            accountType: 'vadeli',
            branchName: '1257 SERDİVAN/SAK',
            currencyCount: '6000',
            currencyType: 'TRY-Türk Lirası',
          };

          let datas2 = {
            accountDetailName: 'TR161957 1257 SERDİVAN/SAK TRY-Türk Lirası',
            accountIban: 'TR161666',
            accountNumber: 307122,
            accountType: 'vadeli',
            branchName: '1257 SERDİVAN/SAK',
            currencyCount: '9900',
            currencyType: 'TRY-Türk Lirası',
          };

          firestore()
            .collection('users')
            .doc(user.uid)
            .update({
              accounts: firestore.FieldValue.arrayRemove(datas1),
            });

          firestore()
            .collection('users')
            .doc(user.uid)
            .update({
              accounts: firestore.FieldValue.arrayUnion(datas2),
            });
        },

        addCollectionAccounts: async (
          accountType,
          currencyType,
          branchName,
          accountNumber,
          accountIban,
          currencyCount,
        ) => {
          let accounts = [];

          let tempUserAccounts;

          userAccounts && userAccounts.length
            ? (tempUserAccounts = userAccounts)
            : (tempUserAccounts = accounts);

          tempUserAccounts.push({
            accountType: accountType,
            currencyType: currencyType,
            branchName: branchName,
            accountNumber: accountNumber,
            accountIban: accountIban,
            currencyCount: currencyCount,
            accountDetailName:
              accountIban + ' ' + branchName + ' ' + currencyType,
          });

          firestore()
            .collection('users')
            .doc(user.uid)
            .update({
              accounts: tempUserAccounts,
            })
            .catch(error => {});
        },

        setGuncelle: async (accountCurrencyToChoise, currencyToAmount) => {},
      }}>
      {children}
    </AuthContext.Provider>
  );
};
