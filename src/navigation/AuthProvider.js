import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore, {firebase} from '@react-native-firebase/firestore';

import {Alert} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const [userId, setUserId] = useState('');
  const [userAccounts, setUserAccounts] = useState('');
  const [accountTransactions, setAccountTransactions] = useState('');
  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userIdentity, setUserIdentity] = useState('');
  const [userImage, setUserImage] = useState('');

  const [userAccountIban, setUserAccountIban] = useState('');
  const [accountCurrencyType, setAccountCurrencyType] = useState('');
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
        accountTransactions,
        setAccountTransactions,
        userName,
        setUserName,
        userLastName,
        setUserLastName,
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
        login: async (userMail, password) => {
          try {
            await auth().signInWithEmailAndPassword(userMail, password);
          } catch (e) {
            const error = 'E Mail  ve şifre uyuşmuyor';

            Alert.alert(error);
          }
        },

        register: async (username, userLastName, userMail, password) => {
          try {
            const response = await auth().createUserWithEmailAndPassword(
              userMail,
              password,
            );

            const useData = {
              id: response.user.uid,
              name: username,
              lastName: userLastName,
              userMail: userMail,
              
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
        changePassword: async userMail => {
          await auth()
            .sendPasswordResetEmail(userMail)
            .then(() => {
              Alert.alert(
                'Hata!',
                'Şifre sıfırlama mail adresinize yollanmıştır!',
                [{text: 'Tamam'}],
              );
            })

            .catch(error => {
              Alert.alert('Hata!', 'E Mail adresi doğru değil!!', [
                {text: 'Tamam'},
              ]);
            });
        },
        updateImage: async url => {
          firestore()
            .collection('users')
            .doc(user.uid)
            .update({
              userImg: url,
            })
            .catch(error => {});
        },

        updateEmail: async userMail => {
          firestore()
            .collection('users')
            .doc(user.uid)
            .update({
              userMail: userMail,
            })
            .catch(error => {});
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
                setUserIdentity(documentSnapshot.data().userMail);
                setUserImage(documentSnapshot.data().userImg);

                setUserAccountIban(documentSnapshot.data().accountIban);
                setUserAccounts(documentSnapshot.data().accounts);
                setAccountTransactions(documentSnapshot.data().transactions);

                console.log('+++++++');

                //console.log(userAccounts[0].currencyType);
              }
            });
        },

        getUserAccountsCurrencyType: currencyType => {
          function getIndex(currencyType) {
            return userAccounts.filter(
              obj => obj.currencyType?.split('-')[0] === currencyType,
            );
          }

          let data = [];

          data = getIndex(currencyType);

          return data;
        },
        getTransactionsByFromName: (currName,ibanNo) => {
          {
            function getIndex(currName,ibanNo) {
              return accountTransactions.filter(
                obj =>
                  obj.fromCurrency === currName &&  obj.accountCurrencyFromChoise === ibanNo
                  
                 

              );
            }
          }

          let data = [];

          data = getIndex(currName,ibanNo);

          return data;
        },
        getTransactionsByToName: (currName,ibanNo) => {
          {
            function getIndex(currName,ibanNo) {
              return accountTransactions.filter(
                obj =>
                  obj.toCurrency === currName &&  obj.accountCurrencyToChoise === ibanNo
              );
            }
          }

          let data = [];

          data = getIndex(currName,ibanNo);

          return data;
        },
       
        getLastTransactionsByIban: accountIban => {
          {
            function getIndex(accountIban) {
              return accountTransactions.filter(
                obj =>
                  obj.accountCurrencyToChoise === accountIban ||
                  obj.accountCurrencyFromChoise === accountIban,
                 
              );
            }
          }

          let data = [];

          data = getIndex(accountIban);

          return data[data.length - 1];
        },

        getToCurrencyTransaction: async (
          currencyToChoise,
          currencyToAmount,
        ) => {
          {
            function getDataIndex(accountIban) {
              return userAccounts.filter(
                obj => obj.accountIban === accountIban,
              );
            }
          }

          let data;

          data = getDataIndex(currencyToChoise);

          const data1 = Object.assign({}, ...data);

          

          let deneme = Object.keys(data1)
            .filter(key => !key.includes('_index'))
            .reduce((obj, key) => {
              return Object.assign(obj, {
                [key]: data1[key],
              });
            }, {});

          await firestore()
            .collection('users')
            .doc(user.uid)
            .update({
              accounts: firestore.FieldValue.arrayRemove(deneme),
            });

          let keys = Object.keys(deneme);

          keys.forEach(element => {
            if (element == 'currencyCount') {
              deneme[element] = Number(deneme[element] - currencyToAmount);
            }
          });

       
          await firestore()
            .collection('users')
            .doc(user.uid)
            .update({
              accounts: firestore.FieldValue.arrayUnion(deneme),
            });
        },

        getFromCurrencyTransaction: async (
          currencyFromChoise,
          currencyFromAmount,
        ) => {
          {
            function getDataIndex(accountIban) {
              return userAccounts.filter(
                obj => obj.accountIban === accountIban,
              );
            }
          }

          let fromData;

          fromData = getDataIndex(currencyFromChoise);

          const dataFromCurrency = Object.assign({}, ...fromData);

          let valueOfFromCurrency = Object.keys(dataFromCurrency)
            .filter(key => !key.includes('_index'))
            .reduce((obj, key) => {
              return Object.assign(obj, {
                [key]: dataFromCurrency[key],
              });
            }, {});

          await firestore()
            .collection('users')
            .doc(user.uid)
            .update({
              accounts: firestore.FieldValue.arrayRemove(valueOfFromCurrency),
            });

          let fromCurrencykeys = Object.keys(valueOfFromCurrency);

          fromCurrencykeys.forEach(element => {
            if (element == 'currencyCount') {
              valueOfFromCurrency[element] += Number(currencyFromAmount);
            }
          });

          console.log(valueOfFromCurrency);

          await firestore()
            .collection('users')
            .doc(user.uid)
            .update({
              accounts: firestore.FieldValue.arrayUnion(valueOfFromCurrency),
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
            currencyCount: parseFloat(currencyCount),
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
        addAccountTransactions: async (
          accountCurrencyToChoise,
          currencyToAmount,
          accountCurrencyFromChoise,
          currencyFromAmount,
          fromCurrency,
          toCurrency,
        ) => {
          var cdate = new Date();

          var dateVal =
            cdate.getFullYear() +
            '-' +
            cdate.getDate() +
            '-' +
            cdate.getMonth() +
            ' ' +
            cdate.getHours() +
            ':' +
            cdate.getMinutes() +
            ':' +
            cdate.getSeconds();

          let transactions = [];

          let tempAccountTransactions;

          accountTransactions && accountTransactions.length
            ? (tempAccountTransactions = accountTransactions)
            : (tempAccountTransactions = transactions);

          tempAccountTransactions.push({
            accountCurrencyToChoise: accountCurrencyToChoise,
            fromCurrency: fromCurrency,
            toCurrency: toCurrency,
            currencyToAmount: Number(currencyToAmount).toFixed(2),
            accountCurrencyFromChoise: accountCurrencyFromChoise,
            currencyFromAmount: Number(currencyFromAmount).toFixed(2),
            date: dateVal,
          });

          firestore()
            .collection('users')
            .doc(user.uid)
            .update({
              transactions: tempAccountTransactions,
            })
            .catch(error => {});
        },
        addAccountSellTransactions: async (
          accountCurrencyToChoise,
          currencyToAmount,
          accountCurrencyFromChoise,
          currencyFromAmount,
          fromCurrency,
          toCurrency,
        ) => {
          var cdate = new Date();

          var dateVal =
            cdate.getFullYear() +
            '-' +
            cdate.getDate() +
            '-' +
            cdate.getMonth() +
            ' ' +
            cdate.getHours() +
            ':' +
            cdate.getMinutes() +
            ':' +
            cdate.getSeconds();

          let transactions = [];

          let tempAccountTransactions;

          accountTransactions && accountTransactions.length
            ? (tempAccountTransactions = accountTransactions)
            : (tempAccountTransactions = transactions);

          tempAccountTransactions.push({
            accountCurrencyToChoise: accountCurrencyToChoise,
            fromCurrency: fromCurrency,
            toCurrency: toCurrency,
            currencyToAmount: Number(currencyFromAmount).toFixed(2),
            accountCurrencyFromChoise: accountCurrencyFromChoise,
            currencyFromAmount: Number(currencyToAmount).toFixed(2),
            date: dateVal,
          });

          firestore()
            .collection('users')
            .doc(user.uid)
            .update({
              transactions: tempAccountTransactions,
            })
            .catch(error => {});
        },
        
      }}>
      {children}
    </AuthContext.Provider>
  );
};
