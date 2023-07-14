import {View,StyleSheet,Image,Text,TouchableOpacity} from 'react-native'
import React from 'react'
import  CustomCard  from "./CustomCard";
import  CoinCard  from "./CoinCard";
import  expandchevron  from "../images/expandchevron.png";
import {GREEN,LIGHTGREY,LIGHTBLACK}  from '../constants/Colors';
import { useRoute,useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

const WalletCoinCard = (props) => {

  const route = useRoute();

  const params = route.params;

  
  
  let {name,accountCount} = typeof props.item=="undefined"? params :props.item;

    return (
          <CustomCard style={styles.container}>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
              <View style={{flexDirection:"row",alignItems:"center"}}>
              <Text style={{fontSize:20,color:LIGHTBLACK,fontWeight:"bold",marginLeft:10}}>{name}</Text>
              </View>
              <View style={{flexDirection:"row",alignItems:"center"}}>
                
                <Icon name="ellipsis1" size={40} color={LIGHTGREY}/>
              </View>
            </View>
            <View style={{flexDirection:"row", marginTop:10,justifyContent:"space-between"}}>
              <Text style={{fontSize:20,marginLeft:10,color:LIGHTBLACK}}>Kullanılabilir Bakiye</Text>
            </View>
            <Text style={{marginLeft:10,marginTop:5,color:LIGHTGREY,fontSize:20}}>{accountCount}</Text>
            <View style={{flexDirection:"row",justifyContent:"center",marginBottom:20,height:20}}>
            </View>
          </CustomCard>
          );
}

export default WalletCoinCard;

const styles = StyleSheet.create({
    container:{
        padding:20,
        backgroundColor:"#fff",
        borderRadius:15,
       // height:300,
    }
  });