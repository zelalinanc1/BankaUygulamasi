import { StyleSheet,View, Text,TouchableOpacity,Dimensions,ScrollView } from 'react-native'
import React, {useContext,useEffect,useState} from 'react';
import { AuthContext } from '../navigation/AuthProvider';


const WIDTH =Dimensions.get('window').width;

const HEIGHT =Dimensions.get('window').height;

const ModalPicker = (props) => {

  const {userAccounts} = useContext(AuthContext);

    const onPressItem = (option) => {
        props.changeModalVisibility(false);
        props.setData(option);

    }


  
  const option = userAccounts.map((item, index) => {
    return (
        <TouchableOpacity
        style={styles.option}
        key={index}
        onPress={() => onPressItem(item)}
        >
            <Text  style={styles.text} >{item.accountDetailName}</Text>

        </TouchableOpacity>
    )
  })

  return (
    <TouchableOpacity
    onPress={() => props.changeModalVisibility(false)}
    style={styles.container}
    >
     <View style={[styles.modal, {width: WIDTH -20 ,height:HEIGHT/2}]}>
        <ScrollView>
            {option}
        </ScrollView>
        </View> 
    </TouchableOpacity>
  )
}

export default ModalPicker;
const styles = StyleSheet.create({
  
    container:{
      flex:1,
      justifyContent: 'center',
      alignItems:'center',
      
  },

  modal: {
    backgroundColor: 'white',
    borderRadius:10

  },
  option: {
    alignItems: 'flex-start'
  },
  text: {
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold'
  }
  });