import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, FlatList, StatusBar } from 'react-native';

//styles
import { CustomCard } from '../components/CustomCards';
import Ionicon from 'react-native-vector-icons/Ionicons';
import styles from '../assets/css/style'

//firebase
import { auth } from '../config';
import { firebase } from '../config';

export default function HomeScreen({navigation}) {
  //collection gedung
  const [gedung, setGedung] = useState([]);
  const gedungRef = firebase.firestore().collection('gedung');

  //collection user
  const [user, setUser] = useState([]);
  const userRef = firebase.firestore().collection('users');

  const emailUserLogin = auth.currentUser?.email

  // Panggil User
  useEffect(() =>{
    userRef
    .where("emailUser", "==", emailUserLogin)
    .onSnapshot(querySnapshot => {
        if(!querySnapshot.empty){
          const user = []
          querySnapshot.forEach((doc) => {
            const {emailUser, namaUser, role} = doc.data()
            user.push({
              id: doc.id,
              emailUser,
              namaUser,
              role,
            })
          })
          setUser(user)
        } else{
          setUser(null)
        }
      }
    )
  }, [])
  
  const resultNama = user.map(({namaUser}) => namaUser)

  // Panggil Gedung
  useEffect(() =>{
    gedungRef
    .onSnapshot(
      querySnapshot => {
        const gedung = []
        querySnapshot.forEach((doc) => {
          const {nama, gambar} = doc.data()
          gedung.push({
            id: doc.id,
            nama,
            gambar
          })
        })
        setGedung(gedung)
      }
    )
  }, []) 

  // cards gedung
  const gedungItem = ({item}) => {
    const imageUrl = item.gambar;
    return (
    <CustomCard >
      <View style={styles.gedungCard}>
        <View style={{padding:15, justifyContent:"space-between"}}>
          <Text style={styles.txtCard}>{item.nama}</Text>
          <TouchableOpacity style={styles.btnCard} onPress={()=> navigation.navigate('Lantai', {
            paramNamaGedung: item.nama,
            paramIdGedung: item.id
          })}>
            <Text style={styles.txtBtnCard}>Pilih</Text>
          </TouchableOpacity>
        </View>
          <View>
          <Image
              style={{width: 200, height: 150, resizeMode: 'stretch'}}
              source={{ uri: imageUrl }}>
          </Image>
        </View>
      </View>
    </CustomCard>
    );
  };

  return (
    <View style={{ flex: 1}}>
      <View style={styles.topview}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={[styles.flexContainer, {marginTop: 20,}]}>
          {/* drawer */}
          <TouchableOpacity style={{margin: 16, width: 30}}
            onPress={()=> {navigation.openDrawer()}}>
            <Ionicon name='menu-outline' size={35} color='#fff'/>
          </TouchableOpacity>
          {/* search bar */}
          <View style={styles.searchbar}>
            <Ionicon name="search-outline" size={25} color="#BEBEBE" style={{width:40, transform: [{rotateY: '180deg'}]}} />
            <TextInput placeholder="Search" style={styles.searchBarText} />
          </View>   
        </View> 

        {/* nama dan profile */}
        <View style={[styles.flexContainer, {marginBottom: 60}]}>
            <Text style={styles.welcomemessage}>{`Hello,<br/>${resultNama[0] || ''}`.split("<br/>").join("\n")}
            </Text>
            <TouchableOpacity onPress={()=> {navigation.openDrawer()}}>
              <Image source={require('../assets/img/profile.png')} style={styles.circle} />
            </TouchableOpacity>
        </View>

        <View style={styles.bottomview}>
          <CustomCard elevated={true} style={styles.customCardBooking}>
            <View style={{alignItems:"center"}}>
              <Text style={styles.bookingInfo}>Ruangan</Text>
              <Text style={styles.subBookingInfo}>101</Text>
            </View>
            <View style={{alignItems:"center"}}>
              <Text style={styles.bookingInfo}>Booking</Text>
              <Text style={styles.subBookingInfo}>3</Text>
            </View>
            <View style={{alignItems:"center"}}>
              <Text style={styles.bookingInfo}>Total Ruangan</Text>
              <Text style={styles.subBookingInfo}>104</Text>
            </View>
          </CustomCard>

          <View style={styles.iconInlineText}>
            <Text style={styles.txtTitleCard}>Pilih Gedung! </Text>
            <Ionicon name="business-outline" size={20}></Ionicon>
          </View>
          
          {/* FlatList Gedung */}
          <View>
            <FlatList
              data={gedung}
              renderItem={gedungItem}
            />
          </View>
          
        </View>
            
      </View>

    </View>
  );
}

