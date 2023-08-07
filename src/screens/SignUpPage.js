import React, {useState,useContext} from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../navigation/AuthProvider';


import {useTheme, useNavigation} from '@react-navigation/native';

const SignUpPage = ({navigation}) => {

    const {register} = useContext(AuthContext);

    const [data, setData] = React.useState({
        username: '',
        userLastName: '',
        userMail: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        check_textLastNameChange: false,
        check_textEmailChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isLastName:true,
        isEmail:true,
        isValidPassword:true,
        isValidConfirmPassword:true,
        confirm_secureTextEntry: true,
    });

    
    const textInputChange = (val) => {
        if( val.length >= 4 ) {
            setData({
                ...data,
                username: val,
                isValidUser: true,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                isValidUser: false,
                check_textInputChange: false
            });
        }
    }
    const textLastNameChange = (val) => {
        if( val.length >= 4 ) {
            setData({
                ...data,
                userLastName: val,
                isLastName:true,
                check_textLastNameChange: true
            });
        } else {
            setData({
                ...data,
                userLastName: val,
                isLastName: false,
                check_textLastNameChange: false
            });
        }
    }
    const textEmailChange = (val) => {
        if( val.length >= 4 ) {
            setData({
                ...data,
                userMail: val,
                isEmail:true,
                check_textEmailChange: true
            });
        } else {
            setData({
                ...data,
                userMail: val,
                isEmail: false,
                check_textEmailChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const handleConfirmPasswordChange = (val) => {

        if( val === data.password) {
            setData({
                ...data,
                confirm_password: val,
                isValidConfirmPassword: true
            });
        } else {
            setData({
                ...data,
                confirm_password: val,
                isValidConfirmPassword: false
            });
        }
       
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    
  const onSubmitForm = () => {
    
      register(data.username,data.userLastName,data.userMail,data.password);
    
  };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
          <View style={styles.header}>
              <Text style={styles.text_header}>Kayıt Ol!</Text>
          </View>
          <Animatable.View 
              animation="fadeInUpBig"
              style={styles.footer}
          >
              <ScrollView>
              <Text style={styles.text_footer}>Ad</Text>
              <View style={styles.action}>
                  <FontAwesome 
                      name="user-o"
                      color="#05375a"
                      size={20}
                  />
                  <TextInput 
                      placeholder="Adınızı Girin"
                      style={styles.textInput}
                      autoCapitalize="none"
                      onChangeText={(val) => textInputChange(val)}
                  />
                  {data.check_textInputChange ? 
                  <Animatable.View
                      animation="bounceIn"
                  >
                      <Feather 
                          name="check-circle"
                          color="green"
                          size={20}
                      />
                  </Animatable.View>
                  : null}
              </View>
              { data.isValidUser ? null : 
          <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Kullanıcı adı en az 4 karakterli olmalıdır .</Text>
          </Animatable.View>
          }
                 <Text style={[styles.text_footer, {
                  marginTop: 25
              }]}>Soyad</Text>
              <View style={styles.action}>
                  <FontAwesome 
                      name="user-o"
                      color="#05375a"
                      size={20}
                  />
                  <TextInput 
                      placeholder="Soyadınızı Girin"
                      style={styles.textInput}
                      autoCapitalize="none"
                      onChangeText={(val) => textLastNameChange(val)}
                  />
                  {data.check_textLastNameChange ? 
                  <Animatable.View
                      animation="bounceIn"
                  >
                      <Feather 
                          name="check-circle"
                          color="green"
                          size={20}
                      />
                  </Animatable.View>
                  : null}
              </View>
              { data.isLastName ? null : 
          <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Kullanıcı soyadı en az 4 karakterli olmalıdır .</Text>
          </Animatable.View>
          }
          <Text style={[styles.text_footer, {
                  marginTop: 25
              }]}>E Mail</Text>
              <View style={styles.action}>
                  <FontAwesome 
                      name="envelope-o"
                      color="#05375a"
                      size={20}
                  />
                  <TextInput 
                      placeholder="E Mail Adresinizi Girin"
                      style={styles.textInput}
                      autoCapitalize="none"
                      onChangeText={(val) => textEmailChange(val)}
                  />
                  {data.check_textEmailChange ? 
                  <Animatable.View
                      animation="bounceIn"
                  >
                      <Feather 
                          name="check-circle"
                          color="green"
                          size={20}
                      />
                  </Animatable.View>
                  : null}
              </View>
              { data.isEmail ? null : 
          <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Kullanıcı emaili en az 4 karakterli olmalıdır .</Text>
          </Animatable.View>
          }
  
              <Text style={[styles.text_footer, {
                  marginTop: 25
              }]}>Şifre</Text>
              <View style={styles.action}>
                  <Feather 
                      name="lock"
                      color="#05375a"
                      size={20}
                  />
                  <TextInput 
                      placeholder="Şifrenizi Girin"
                      secureTextEntry={data.secureTextEntry ? true : false}
                      style={styles.textInput}
                      autoCapitalize="none"
                      onChangeText={(val) => handlePasswordChange(val)}
                  />
                  <TouchableOpacity
                      onPress={updateSecureTextEntry}
                  >
                      {data.secureTextEntry ? 
                      <Feather 
                          name="eye-off"
                          color="grey"
                          size={20}
                      />
                      :
                      <Feather 
                          name="eye"
                          color="grey"
                          size={20}
                      />
                      }
                  </TouchableOpacity>
              </View>
              { data.isValidPassword ? null : 
          <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Kullanıcı şifresi en az 8 karakterli olmalıdır .</Text>
          </Animatable.View>
          }
  
              <Text style={[styles.text_footer, {
                  marginTop: 25
              }]}>Şifre Tekrar</Text>
              <View style={styles.action}>
                  <Feather 
                      name="lock"
                      color="#05375a"
                      size={20}
                  />
                  <TextInput 
                      placeholder="Şifrenizi Tekrar Yazın"
                      secureTextEntry={data.confirm_secureTextEntry ? true : false}
                      style={styles.textInput}
                      autoCapitalize="none"
                      onChangeText={(val) => handleConfirmPasswordChange(val)}
                  />
                  <TouchableOpacity
                      onPress={updateConfirmSecureTextEntry}
                  >
                      {data.secureTextEntry ? 
                      <Feather 
                          name="eye-off"
                          color="grey"
                          size={20}
                      />
                      :
                      <Feather 
                          name="eye"
                          color="grey"
                          size={20}
                      />
                      }
                  </TouchableOpacity>
              </View>
              { data.isValidConfirmPassword ? null : 
          <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Şifreler uyuşmuyor .</Text>
          </Animatable.View>
          }
            
              <View style={styles.button}>
                  <TouchableOpacity
                      style={styles.signIn}
                      onPress={onSubmitForm}
                  >
                  <LinearGradient
                      colors={['#08d4c4', '#01ab9d']}
                      style={styles.signIn}
                  >
                      <Text style={[styles.textSign, {
                          color:'#fff'
                      }]}>Kayıt Ol</Text>
                  </LinearGradient>
                  </TouchableOpacity>
  
                  <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={[styles.signIn, {
                          borderColor: '#009387',
                          borderWidth: 1,
                          marginTop: 15
                      }]}
                  >
                      <Text style={[styles.textSign, {
                          color: '#009387'
                      }]}>Giriş Yap</Text>
                  </TouchableOpacity>
              </View>
              </ScrollView>
          </Animatable.View>
        </View>
      );
}

export default SignUpPage;
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
  });
