import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Dimensions, Image, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { auth } from '../config'

var { height } = Dimensions.get('window');
var panjangHp = height;

export default function LoginScreen({navigation}) {
  const loginGagal = (error) => {
    Toast.show({
      type: "error",
      text1: "Peringatan!",
      text2: error.message,
    })
  }

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("Dashboard");
      }
    })
    return unsub

  })

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Login with :', user.email)
    })
    .catch(error => loginGagal(error))
  };

  const [loaded] = useFonts({
    Raleway: require('../assets/fonts/Raleway-Medium.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return(
    <SafeAreaView>
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={{alignItems: 'center'}}>
              <Image
                style={{width: 300, height: 200, resizeMode: 'stretch'}}
                source={require('../assets/img/login_ilustration.jpg')}>
              </Image>
              <Text style={styles.title} >
                  Hello Again!
              </Text>
              <Text style={styles.subTitle}>
                  Fill Your Credentials Here
              </Text>
            </View>
            <View style={{marginVertical: 10 * 3}}>
              <TextInput 
                placeholder='Email or NIM' 
                style={styles.inputStyle} 
                value={email} 
                onChangeText={text => setEmail(text)}/>
              <TextInput 
                placeholder='Password' 
                style={styles.inputStyle} 
                secureTextEntry 
                value={password} 
                onChangeText={text => setPassword(text)}/>
            </View>
            <View>
              {self.alertText}
              <Text style={styles.forgotPass} >
                Forgot Your Password?
              </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>
                Sign In
              </Text>
              <Ionicon name="log-in-outline" color={'#fff'} size={24}></Ionicon>
            </TouchableOpacity>

            <View>
              <Text style={styles.footer}>
                Universitas Pembangunan Jaya, 2023
              </Text>
            </View>
            <Toast />
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10 * 2,
        paddingTop: 40,
        backgroundColor: "#ffe7cb",
        height: panjangHp + 100,
      },
    title: {
      fontSize: 48,
      fontFamily: 'Raleway',
      marginVertical: 10
    },
    subTitle: {
      fontSize: 16,
      fontFamily: 'Raleway',
      color: 'grey',
      textAlign: 'center',
    },
    inputStyle: {
      fontFamily: 'Raleway',
      fontSize: 12,
      padding: 5 * 2,
      backgroundColor: '#ccdafc',
      borderRadius: 10,
      marginVertical: 10
    }, 
    forgotPass: {
      fontFamily: 'Raleway',
      fontSize: 12,
      alignSelf: 'flex-end'
    }, 
    alertText: {
      fontFamily: 'Raleway',
      fontSize: 12,
      textAlign: 'center',
      color: 'red',
      marginBottom: 20
    },
    button: {
      padding: 5 * 2,
      backgroundColor: '#0D6EFD',
      marginVertical: 10 * 3,
      borderRadius: 10, 
      paddingHorizontal: 26,
      paddingVertical: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    }, 
    buttonText: {
      fontFamily: 'Raleway',
      color: 'white',
      textAlign: 'center',
      fontSize: 16
    }, 
    footer: {
      fontFamily: 'Raleway',
      fontSize: 12,
      textAlign: "center"
    }
})