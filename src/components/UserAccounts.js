import { View, Text,StyleSheet,Pressable } from 'react-native'
import React from 'react'
import UserAccountsCard from './UserAccountsCard';
import {LIGHTGREY,GREEN,RED,LIGHTBLACK}  from '../constants/Colors';

const UserAccounts = (props) => {

    let {accountNumber,accountIban,accountType,currencyType,branchName} = props.item;


  return (
    <UserAccountsCard  style={{flexDirection:"row",alignItems:"center",backgroundColor:"#fff",borderRadius:15,paddingHorizontal:10,paddingVertical:20}}>
             <Pressable onPress={props.onPress}>
            <View>
             <Text>{accountIban}</Text>
            </View>
            <View style={{flex:2,marginLeft:15,marginRight:8}}>
              <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <Text style={{fontWeight:"600",color:LIGHTBLACK}}>{accountNumber}</Text>
                <Text>{accountType}</Text>
              </View>
              <View style={{flexDirection:"row",marginTop:5,justifyContent:"space-between"}}>
                <Text style={{color:LIGHTGREY,fontWeight:"600"}}>{branchName}</Text>
                <Text >{currencyType}</Text>
              </View>
            </View>
            </Pressable>
          </UserAccountsCard>
  )
}

export default UserAccounts;
const styles = StyleSheet.create({
  
});