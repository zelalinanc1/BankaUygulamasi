import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
  } from 'react-native';
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
const windowHeight = Dimensions.get('window').height;
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const TopCard = () => {

  const navigation = useNavigation();
  
  return (
    <View style={styles.topViewContainer}>
                  <View style={styles.topCard}>
                    <View style={styles.topCardRow}>
                      <TouchableOpacity style={styles.topCardRow__item}
                      onPress={() => navigation.navigate('AccountRegisterScreen')}>
                        <AntDesign
                          name="pluscircleo"
                          size={20}
                          color="#0e39c8"
                        />
                        <Text style={styles.topCardRow__item_text}>
                          Hesap Oluştur
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.topCardRow__item}
                      onPress={() => navigation.navigate('CurrencyPage')}>
                        <FontAwesome
                          name="exchange"
                          size={20}
                          color="#0e39c8"
                        />
                        <Text style={styles.topCardRow__item_text}>
                          Kurları Gör
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
  )
}

export default TopCard;
const styles = StyleSheet.create({
   
    topViewContainer: {left: 0, right: 0, height: 90, marginTop: 25},
    topCard: {
      backgroundColor: '#fff',
      paddingVertical: 30,
      paddingHorizontal: 30,
      marginHorizontal: 20,
      borderRadius: 5,
      marginTop: 4,
      flexDirection: 'row',
      alignItems: 'center',
    },
    topCardRow: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    topCardRow__item: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    topCardRow__item_text: {
      fontWeight: 'bold',
      fontFamily: 'OpenSans-Regular',
    },
  });