import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (tcNo, password) => {
          try {
            await auth().signInWithEmailAndPassword(tcNo, password);
          } catch (e) {
            
            const error="Tc No ve şifre uyuşmuyor";
           
            Alert.alert(error);
          }
        },
      
        register: async (tcNo,password,name,lastName,birthday,url) => {
          
          try {
            const response =await auth().createUserWithEmailAndPassword(tcNo, password);
          
            const useData ={
              id: response.user.uid,
              name : name,
              lastName : lastName,
              tcNo :tcNo,
              birthday: birthday,
              userImg: url,
              userAccounts: []
            }

           await firestore().collection("users").doc(auth().currentUser.uid).set(useData);
           
            
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
       
     
      }}>
      {children}
    </AuthContext.Provider>
  );
};