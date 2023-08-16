import  {View,StyleSheet,Image,Text,TouchableOpacity} from 'react-native'
import React from 'react'
import  CustomCard  from "./CustomCard";
import  sell  from "../images/sell.png";
import  buy  from "../images/buy.png";
import {LIGHTBLACK}  from '../constants/Colors';

const CTACard = (props) => {
    return (
        <CustomCard style={[props.action=="Buy"?{marginRight:5}:{marginLeft:5},{flex:1,alignItems:"center",justifycContent:"space-between",backgroundColor:"#fff",borderRadius:10,padding:15}]}>
               <Image style={{height:45,width:45}} source={props.action=="Buy"?buy:sell}></Image>
                <Text style={{marginTop:10,fontWeight:"600",color:LIGHTBLACK}}>{props.action} BTC</Text>
        </CustomCard>);
}

export default CTACard;
const styles = StyleSheet.create({
  
});