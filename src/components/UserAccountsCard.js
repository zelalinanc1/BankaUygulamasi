import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    Pressable,
  } from 'react-native';
  import React, {useState} from 'react';

const UserAccountsCard =  props => {
    return <View style={[styles.container, props.style]}>{props.children}</View>;
}

export default UserAccountsCard;

const styles = StyleSheet.create({
    container: {
      shadowColor: '#ADB7C3',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 15,
      elevation: 1,
    },
  });