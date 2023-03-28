/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Providers from './src/navigation';



const App = () => {
  return (
   <Providers/>
  );
};

export default App;
