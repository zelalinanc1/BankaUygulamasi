import {Modal, Text, TouchableHighlight, View} from 'react-native';
import React, {useState} from 'react';
import CoinCard from '../components/CoinCard';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import { useRoute,useNavigation } from '@react-navigation/native';

const CurrencyTradePage = (props) => {

  const route = useRoute();
  const nav = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 10000);
    };
  
  return (
    <View
    style={{
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        console.log('Modal has been closed.');
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'white',
          justifyContent: 'center',
          margin: 25,
        }}>
        <Text style={{fontSize: 16, color: 'black'}}>
          This modal will close in 10 Seconds..
          <CountdownCircleTimer
            isPlaying
            duration={10}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}>
            {({remainingTime}) => <Text>{remainingTime}</Text>}
          </CountdownCircleTimer>
        </Text>
      </View>
    </Modal>

    <TouchableHighlight
      onPress={() => {
        showModal();
      }}>
      <Text>Show Modal</Text>
    </TouchableHighlight>

    <Text>FavoriteCurrencyPageScreen </Text>


  </View>
  )
}

export default CurrencyTradePage;