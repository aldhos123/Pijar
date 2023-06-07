import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { BottomSheet } from 'react-native-btr';

// style
import Ionicon from 'react-native-vector-icons/Ionicons'
import FontRaleway from '../assets/fonts-snippets';

// firebase
import { auth } from '../config'


export default function CustomDrawer(props){
    FontRaleway();

    const emailUser = auth.currentUser?.email

    // logout
    const handleLogout = () => {
        auth.signOut().then(() => {
            console.log('User Logout:', emailUser)
            setVisible(!visible)
            props.navigation.navigate("Login")
        })
        .catch(error => alert(error.message))
    }


    // bottom sheet
    const [visible, setVisible] = useState(false);

    const toggleBottomNavigationView = () => {
      setVisible(!visible)
    };

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: '#8d8d95'}}>
                <ImageBackground source={require('../assets/img/gedung.jpg')} 
                style={styles.imgBackground}>
                    <Image source={require('../assets/img/profile.png')} 
                    style={styles.imgProfile}
                    />
                    <Text style={styles.subProfileText}>{emailUser}</Text>
                </ImageBackground>
                <View style={{ flex:1, backgroundColor: '#fff' }}>
                    <DrawerItemList {...props} />
                    <DrawerItem label="History" onPress={() => {props.navigation.navigate('History')}} 
                        icon={({ focused, color, size }) => 
                        <Ionicon color={color} size={size} name={focused ? 'book' : 'book-outline'} /> }
                        inactiveTintColor='#333' labelStyle={{fontFamily: 'Raleway'}}
                    />
                    <DrawerItem label="Notification" onPress={() => {props.navigation.navigate('Notification')}} 
                        icon={({ focused, color, size }) => 
                        <Ionicon color={color} size={size} name={focused ? 'notifications' : 'notifications-outline'} /> }
                        inactiveTintColor='#333' labelStyle={{fontFamily: 'Raleway'}}    
                    />
                </View>
            </DrawerContentScrollView>
            <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
                <TouchableOpacity onPress={() => {toggleBottomNavigationView()}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Ionicon name="exit-outline" size={22} />
                        <Text style={{fontFamily: 'Raleway', marginLeft: 5}}>
                            Sign Out
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <BottomSheet visible={visible} onBackButtonPress={toggleBottomNavigationView} onBackdropPress={toggleBottomNavigationView}>
                <View style={styles.bottomNavigationView}>
                    <View >
                        <Text style={styles.bottomSheetTitle}>
                        Anda ingin Sign Out?
                        </Text>
                    </View>
                    <View style={styles.bottomSheetButtonView}>
                        <TouchableOpacity 
                            onPress={handleLogout}
                            style={[styles.button, {backgroundColor: "blue"}]}>
                            <Text style={styles.buttonText}>Yakin</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={toggleBottomNavigationView}
                            style={[styles.button, {backgroundColor: "red"}]}>
                            <Text style={styles.buttonText}>Tidak</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheet>
        </View>
    )
}


const styles = StyleSheet.create({
    imgBackground: {
      padding: 20,
    },  
    imgProfile: {
      height: 80,
      width: 80,
      borderRadius: 40,
      marginBottom: 10
    },
    profileText:{
        color: 'white',
        fontFamily: 'Raleway',
        fontSize: 18
    },
    subProfileText:{
        color: 'white',
        fontFamily: 'Raleway',
        fontSize: 12,
    },
    drawerNavStyle:{
        labelStyle: {marginLeft: -25, fontFamily: 'Raleway'}, 
        activeBackgroundColor: '#0D6EFD',
        activeTintColor: '#fff',
        inactiveTintColor: '#333',
    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: 200,
        alignItems: 'center',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    bottomSheetButtonView:{
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    bottomSheetTitle:{
        textAlign: 'center', 
        padding: 20, 
        fontSize: 20, 
        fontFamily: "Raleway"
    },
    button: {
        padding: 5 * 2,
        marginVertical: 5 * 3,
        borderRadius: 10, 
        paddingHorizontal: 26,
        paddingVertical: 15,
    }, 
    buttonText: {
        fontFamily: 'Raleway',
        color: 'white',
        textAlign: 'center',
        fontSize: 16
    }, 
  })