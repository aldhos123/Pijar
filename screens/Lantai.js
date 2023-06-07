import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { CustomCard } from '../components/CustomCards';

//styles
import styles from '../assets/css/style'

//firebase
import { firebase } from '../config';

export default function LantaiScreen({route, navigation}) {
    const [lantai, setLantai] = useState([]);
    const lantaiRef = firebase.firestore().collection(`gedung/${route.params.paramIdGedung}/lantai/`);
    // Panggil lantai
    useEffect(() =>{
        lantaiRef
        .orderBy('namaLantai', 'asc')
        .onSnapshot(
        querySnapshot => {
            const lantai = []
            querySnapshot.forEach((doc) => {
                const {namaLantai} = doc.data()
                lantai.push({
                    idLantai: doc.id,
                    namaLantai
                })
            })
            setLantai(lantai)
        }
        )
    }, [])
    
    // cards lantai
    const lantaiItem = ({item}) => {
      return (
        <TouchableOpacity onPress={()=> navigation.navigate('FormPeminjaman', {
          paramLantai: item.namaLantai,
          paramIdLantai: item.idLantai,
        })}>
          <CustomCard >
              <View style={styles.lantaiBottomSheetCard}>
                <View style={{padding:10}}>
                  <Text style={[styles.txtCard, {fontSize: 35, color: "#0D6EFD"}]}>{item.namaLantai}</Text>
                </View>
              </View>
          </CustomCard>
        </TouchableOpacity>
      );
    };


    return (
        <View style={{ flex: 1}}>
            <View style={styles.topview}>
            <View style={[styles.flexContainer, {marginTop: 20}]}>
                {/* drawer */}
                <TouchableOpacity style={{margin: 16, width: 30}}
                onPress={()=> navigation.navigate('HomeStack')}>
                <Ionicon name="chevron-back-outline" size={35} color='#fff'></Ionicon>
                </TouchableOpacity>
                {/* search bar */}
                <View style={styles.searchbar}>
                <Ionicon name="search-outline" size={25} color="#BEBEBE" style={{width:40, transform: [{rotateY: '180deg'}]}} />
                <TextInput placeholder="Search" style={styles.searchBarText} />
                </View>   
            </View> 

            <View style={[styles.bottomview, {backgroundColor: '#f5f7f7'}]}>

                <Text style={styles.txtTitleCard}>Pilih Lantai di {route.params.paramNamaGedung}</Text>
                <View>
                    <FlatList
                        contentContainerStyle={styles.list}
                        data={lantai}
                        renderItem={lantaiItem}
                        keyExtractor={(item) => item.idLantai}
                        numColumns={2}
                    />
                </View>
            </View>
        </View>
    </View>
  );
}