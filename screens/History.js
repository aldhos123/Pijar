import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { CustomCard } from '../components/CustomCards';

import styles from '../assets/css/style'

//firebase
import { auth } from '../config';
import { firebase } from '../config';

export default function HistoryScreen({navigation}) {
  
  //collection peminjaman
  const [peminjaman, setPeminjaman] = useState([]);
  const peminjamanRef = firebase.firestore().collection('peminjaman');

  // Panggil Gedung
  useEffect(() =>{
    peminjamanRef
    .onSnapshot(
      querySnapshot => {
        const peminjaman = []
        querySnapshot.forEach((doc) => {
          const {namaPeminjam, keterangan, kapasitas, tglAwal, jamAwal, tglAkhir, jamAkhir, ruangan} = doc.data()
          peminjaman.push({
            id: doc.id,
            namaPeminjam,
            keterangan, 
            kapasitas, 
            tglAwal, 
            jamAwal, 
            tglAkhir, 
            jamAkhir, 
            ruangan
          })
        })
        setPeminjaman(peminjaman)
      }
    )
  }, []) 
    // cards gedung
    const historyItem = ({item}) => {
      return (
      <CustomCard>
        <TouchableOpacity>
          <View style={styles.historyItemCard}>
            <View style={styles.itemKodeHistory}>
              <Text style={styles.txtKodeHistory}>{item.ruangan}</Text>
            </View>
            <View style={{flex: 1, padding:10, justifyContent: "flex-start"}}>
              <Text style={styles.txtTitleHistory}>{item.namaPeminjam}</Text>
              <Text style={styles.txtDateHistory}>{item.tglAwal} {item.jamAwal}</Text>
            </View>
            <View style={{padding:15}}>
              <Text style={styles.itemStatusHistory}>Pending</Text>
            </View>
          </View>
        </TouchableOpacity>
      </CustomCard>
      );
    };
  
    return (
      <View style={{ flex: 1}}>
        <View style={styles.topview}>
          <View style={[styles.flexContainer, {marginTop: 20}]}>
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

          <View style={[styles.bottomview, {backgroundColor: '#f5f7f7'}]}>

            <Text style={styles.txtTitleCard}>History Peminjaman Mahasiswa</Text>
            <View>
              <FlatList
                data={peminjaman}
                renderItem={historyItem}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </View>
    </View>
  );
}