import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import{uploadImage} from '../screens/SignupScreen';


export const AuthContext = createContext();



export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
      
        register: async (email, password,name,url) => {
        
          
          try {
            const response =await auth().createUserWithEmailAndPassword(email, password);
          
            const useData ={
              id: response.user.uid,
              name : response.user.name,
              email :email,
              userImg: url
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