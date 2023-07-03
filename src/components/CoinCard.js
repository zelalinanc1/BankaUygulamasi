import {View,StyleSheet,Image,Text,Pressable} from 'react-native'
import React, {useState} from 'react';
import {LIGHTGREY,GREEN,RED,LIGHTBLACK}  from '../constants/Colors';
import CustomCard from './CustomCard';
import { useRoute,useNavigation } from '@react-navigation/native';

const CoinCard = (props) => {

 // let {name,cryptobalance,actualbalance,decreased,percentage,difference,imgsrc} = props.item;
  let { currencyName,currencyValue,fromCurrency,toCurrency} =props.item

  return (
          <CustomCard  style={{flexDirection:"row",alignItems:"center",backgroundColor:"#fff",borderRadius:15,paddingHorizontal:10,paddingVertical:20}}>
             <Pressable onPress={props.onPress}>
            <View>
             <Text>{currencyName}</Text>
            </View>
            <View style={{flex:2,marginLeft:15,marginRight:8}}>
              <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <Text style={{fontWeight:"600",color:LIGHTBLACK}}>{currencyValue}</Text>
              </View>
              <View style={{flexDirection:"row",marginTop:5,justifyContent:"space-between"}}>
                <Text style={{color:LIGHTGREY,fontWeight:"600"}}>{fromCurrency}</Text>
                <Text style={{color:RED,fontWeight:"600"}}>{toCurrency}</Text>
              </View>
            </View>
            </Pressable>
          </CustomCard>
        );
}
export default CoinCard;
const styles = StyleSheet.create({
  
});