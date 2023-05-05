import {View,StyleSheet,Image,Text,TouchableOpacity,FlatList,Dimensions} from 'react-native'
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import  WalletCoinCard  from "../components/WalletCoinCard";
import   CoinCard  from "../components/CoinCard";
import  bitcoin  from "../images/bitcoin.png";
import  ripple  from "../images/ripple.png";
import  etherium  from "../images/etherium.png";
import  wallet  from "../images/wallet.png";

import {LIGHTGREY,LIGHTBLACK}  from '../constants/Colors';


const SocketPage = (props) => {

 

  const CRYPTOCURRENCIES = [
    {
      id:1,
      name:"Bitcoin",
      cryptobalance:"3.5290123123 BTC",
      actualbalance:"$19.53",
      percentage:"+ 4.32%",
      difference:"$ 5.44",
      decreased:false,
      imgsrc:bitcoin
    },
    {
      id:2,
      name:"Etherium",
      cryptobalance:"12.5290123123 ETH",
      actualbalance:"$19.53",
      percentage:"+ 4.32%",
      decreased:false,
      difference:"$ 3.44",
      imgsrc:etherium
    },
    {
      id:3,
      name:"Ripple",
      cryptobalance:"3.5290123123 XRP",
      actualbalance:"$19.53",
      percentage:"- 4.32%",
      decreased:true,
      difference:"$ 7.44",
      imgsrc:ripple
    }
  ];
 

    
  return (
    <View style={{height:"100%",backgroundColor:'#F5F8FF'}}>          
          <View style={styles.headerbar}>
             
              <Text style={{fontSize:25,fontWeight:"500",color:LIGHTBLACK}}>Wallets</Text>
              <TouchableOpacity><Icon name="wallet" size={26} color={LIGHTGREY}/></TouchableOpacity>
          </View>
          <View style={{marginHorizontal:20}}>
              <View>
              {/* <WalletCoinCard item={{name:"Total Wallet Balance",cryptobalance:"$39.584",imgsrc:wallet}}/> */}
              <View style={styles.filters}>
                <Text style={{color:LIGHTGREY}}>Sorted by higher %</Text>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                <Text style={{color:LIGHTGREY}}>24 H</Text>
                <Icon name="chevron-down-outline" size={18} color={LIGHTGREY}/>
                </View>
              </View>
              </View>
              <View style={{marginTop:10,backgroundColor:"#F5F8FF",overflow:"hidden",marginBottom:100}}>
               <FlatList
                  data={CRYPTOCURRENCIES}
                  style={{height:(Dimensions.get('window').height/2)-60}}
                  ItemSeparatorComponent = {()=><View style={{marginVertical:8}}></View>}
                  renderItem={({item})=><CoinCard item={item}/>}
                  keyExtractor={(item) => item.id}
                />
              </View>
          </View>
          <View style={styles.footer}>
                  <View style={{flexDirection:"row",justifyContent:"space-between",width:"100%",paddingBottom:40}}>
                      <Icon name="wallet" size={28} color={LIGHTBLACK}/>
                      <Icon name="compass" size={28} color={LIGHTGREY}/>
                      <Icon name="notifications" size={28} color={LIGHTGREY}/>
                      <Icon name="settings-sharp" size={28} color={LIGHTGREY}/>
                  </View>
          </View>
    </View>);
}


export default SocketPage;

const styles = StyleSheet.create({
  headerbar:{
      paddingTop:30,
      paddingBottom:20,
      paddingHorizontal:20,
      flexDirection:"row",
      backgroundColor:"#fff",
      alignItems:"center",
      justifyContent:"space-between",
      marginBottom:20
  },
  filters:
  {
      flexDirection:"row",
      marginTop:10,
      marginHorizontal:5,
      justifyContent:"space-between"
  },
  footer:{
    position:"absolute",
    left:1,
    right:1,
    bottom:0,
    backgroundColor:"#fff",
    paddingHorizontal:25,
    paddingTop:20
  }
});