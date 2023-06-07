import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, TextInput, FlatList, Pressable, Platform, StatusBar } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { CustomCard } from '../components/CustomCards';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BottomSheet } from 'react-native-btr';
import {SignatureView} from 'react-native-signature-capture-view';
import DropDownPicker from 'react-native-dropdown-picker';

//styles
import styles from '../assets/css/style'

//firebase
import { auth } from '../config';
import { firebase } from '../config';
import { ScrollView } from 'react-native-gesture-handler';

export default function FormPeminjamanScreen({route, navigation}) {
    //digital signature
    const signatureRef = useRef(null);
    const [text,setText] = useState('')

    // form
    const [keterangan, setKeterangan] = useState('');
    const [kapasitas, setKapasitas] = useState('');
    const [tglAwal, setTglAwal] = useState('');
    const [jamAwal, setJamAwal] = useState('');
    const [tglAkhir, setTglAkhir] = useState('');
    const [jamAkhir, setJamAkhir] = useState('');

    const [date1, setDate1] = useState(new Date())
    const [date2, setDate2] = useState(new Date())
    const [date3, setDate3] = useState(new Date())
    const [date4, setDate4] = useState(new Date())
    const [showPicker1, setShowPicker1] = useState(false)
    const [showPicker2, setShowPicker2] = useState(false)
    const [showPicker3, setShowPicker3] = useState(false)
    const [showPicker4, setShowPicker4] = useState(false)
    const toggleDatePicker1 = () => {
        setShowPicker1(!showPicker1)
    }
    const toggleDatePicker2 = () => {
        setShowPicker2(!showPicker2)
    }
    const toggleDatePicker3 = () => {
        setShowPicker3(!showPicker3)
    }
    const toggleDatePicker4 = () => {
        setShowPicker4(!showPicker4)
    }

    //tgl awal
    const onChangeTglAwal = ({type}, selectedDate) => {
        if(type == "set") {
            const currentDate = selectedDate;
            setDate1(currentDate);
            let hasilDate1 = new Date(currentDate)
            if(Platform.OS === "android"){
                toggleDatePicker1();
                let hasil = hasilDate1.getDate() + '/' + hasilDate1.getMonth() + '/' + hasilDate1.getFullYear()
                console.log(hasil)
                setTglAwal(hasil);
            }
        } else {
            toggleDatePicker1();
        }
    }

    //jam awal
    const onChangeJamAwal = ({type}, selectedDate) => {
        if(type == "set") {
            const currentDate = selectedDate;
            setDate2(currentDate);
            let hasilDate2 = new Date(currentDate)
            if(Platform.OS === "android"){
                toggleDatePicker2();
                let hasil = hasilDate2.getHours() + ':' + hasilDate2.getMinutes()
                console.log(hasil)
                setJamAwal(hasil);
            }
        } else {
            toggleDatePicker2();
        }
    }

    //tgl akhir 
    const onChangeTglAkhir = ({type}, selectedDate) => {
        if(type == "set") {
            const currentDate = selectedDate;
            setDate3(currentDate);
            let hasilDate3 = new Date(currentDate)
            if(Platform.OS === "android"){
                toggleDatePicker3();
                let hasil = hasilDate3.getDate() + '/' + hasilDate3.getMonth() + '/' + hasilDate3.getFullYear()
                console.log(hasil)
                setTglAkhir(hasil);
            }
        } else {
            toggleDatePicker3();
        }
    }

    //jam akhir
    const onChangeJamAkhir = ({type}, selectedDate) => {
        if(type == "set") {
            const currentDate = selectedDate;
            setDate4(currentDate);
            let hasilDate4 = new Date(currentDate)
            if(Platform.OS === "android"){
                toggleDatePicker4();
                let hasil = hasilDate4.getHours() + ':' + hasilDate4.getMinutes()
                console.log(hasil)
                setJamAkhir(hasil);
            }
        } else {
            toggleDatePicker4();
        }
    }

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

  // bottom sheet
  const [visible, setVisible] = useState(false);

  const toggleBottomNavigationView = () => {
    setVisible(!visible)
  };

  const [open, setOpen] = useState(false)
  const [ruangan, setRuangan] = useState('')
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'}
  ])

  tambahData = () => {
    firebase.firestore()
        .collection('peminjaman')
        .add({
            namaPeminjam: resultNama[0],
            keterangan: keterangan,
            kapasitas: kapasitas,
            tglAwal: tglAwal,
            tglAkhir: tglAkhir,
            jamAwal: jamAwal,
            jamAkhir: jamAkhir,
            ruangan: ruangan
        })
        .then(() => {
            console.log(resultNama[0])
            navigation.navigate('History')
        })
  }

  return (
    <View style={{ flex: 1}}>
        <StatusBar translucent backgroundColor="#0D6EFD" />
        <View style={styles.topview}>
            <ScrollView>
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

                    <Text style={styles.txtTitleCard}>Lantai {route.params.paramLantai} | Form Peminjaman</Text>
                    <View style={{paddingHorizontal: 15}}>
                        <View>
                        <View style={styles.iconInlineTextInput}>
                            <Ionicon name="person-circle-outline" size={30} style={{paddingTop: 20}}></Ionicon>
                            <TextInput 
                                placeholder='Nama' 
                                style={styles.inputStyleDisabled} 
                                value={resultNama[0] || ''} 
                                editable={false} selectTextOnFocus={false}/>
                        </View>
                            
                        <View style={styles.iconInlineTextInput}>
                            <Ionicon name="document-outline" size={30} style={{paddingTop: 20}}></Ionicon>
                            <TextInput 
                                placeholder='Keterangan' 
                                style={styles.inputStyle} 
                                value={keterangan} 
                                onChangeText={text => setKeterangan(text)}/>
                        </View>
                        <View style={styles.iconInlineTextInput}>
                            <Ionicon name="people-outline" size={30} style={{paddingTop: 20}}></Ionicon>
                            <TextInput 
                                placeholder='Kapasitas (Orang)' 
                                style={styles.inputStyle}
                                keyboardType='numeric'
                                value={kapasitas} 
                                onChangeText={text => setKapasitas(text)}/>
                        </View>
                        {/* awal pinjam */}
                        <Text style={[styles.subTitle, {marginTop: 15}]}>Isi Tanggal Awal Peminjaman</Text>
                        <View style={styles.iconInlineTextInput}>
                            <Ionicon name="calendar-outline" size={30} style={{paddingTop: 20}}></Ionicon>  
                            <Pressable onPress={toggleDatePicker1} style={{width: "100%"}}>
                                <TextInput
                                    placeholder='Pilih Tanggal Awal' 
                                    style={styles.inputStyle}
                                    editable={false}
                                    value={tglAwal} 
                                    onChangeText={setTglAwal}
                                    minimumDate={new Date()}
                                />
                            </Pressable>
                        </View>
                        <View style={styles.iconInlineTextInput}>
                            <Ionicon name="time-outline" size={30} style={{paddingTop: 20}}></Ionicon>  
                            <Pressable onPress={toggleDatePicker2} style={{width: "100%"}}>
                                <TextInput
                                    placeholder='Pilih Jam Awal' 
                                    style={styles.inputStyle}
                                    editable={false}
                                    value={jamAwal} 
                                    onChangeText={setJamAwal}
                                />
                            </Pressable>
                        </View>
                        {/* akhir pinjam */}
                        <Text style={[styles.subTitle, {marginTop: 15}]}>Isi Tanggal Selesai Peminjaman</Text>
                        <View style={styles.iconInlineTextInput}>
                            <Ionicon name="calendar-outline" size={30} style={{paddingTop: 20}}></Ionicon>  
                            <Pressable onPress={toggleDatePicker3} style={{width: "100%"}}>
                                <TextInput
                                    placeholder='Pilih Tanggal Selesai' 
                                    style={styles.inputStyle}
                                    editable={false}
                                    value={tglAkhir} 
                                    onChangeText={setTglAkhir}
                                />
                            </Pressable>
                        </View>
                        <View style={styles.iconInlineTextInput}>
                            <Ionicon name="time-outline" size={30} style={{paddingTop: 20}}></Ionicon>  
                            <Pressable onPress={toggleDatePicker4} style={{width: "100%"}}>
                                <TextInput
                                    placeholder='Pilih Jam Selesai' 
                                    style={styles.inputStyle}
                                    editable={false}
                                    value={jamAkhir} 
                                    onChangeText={setJamAkhir}
                                />
                            </Pressable>
                        </View>
                        <View style={styles.iconInlineTextInput}>
                            <Ionicon name="business-outline" size={30} style={{paddingTop: 20}}></Ionicon>  
                            {/* <View style={styles.inputStyle}>
                                <DropDownPicker 
                                    open={open}
                                    value={ruangan}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={setRuangan}
                                    setItems={setItems}
                                />
                            </View> */}
                            <TextInput 
                                placeholder='Pilih Ruangan' 
                                style={styles.inputStyle}
                                value={ruangan} 
                                onChangeText={text => setRuangan(text)}/>
                        </View>
                        <View style={[styles.iconInlineTextInput, {justifyContent: "space-between"}]} >
                            <TouchableOpacity style={[styles.button, {backgroundColor: "green"}]} onPress={() => {toggleBottomNavigationView()}}>
                                <Text style={styles.buttonText}>
                                    Sign
                                </Text>
                                <Ionicon name="pencil-outline" color={'#fff'} size={24}></Ionicon>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => this.tambahData()}>
                                <Text style={styles.buttonText}>
                                    Simpan
                                </Text>
                                <Ionicon name="save-outline" color={'#fff'} size={24}></Ionicon>
                            </TouchableOpacity>
                        </View>

                        <BottomSheet visible={visible} onBackButtonPress={toggleBottomNavigationView} onBackdropPress={toggleBottomNavigationView}>
                            <View style={styles.bottomNavigationView}>
                                <Text style={styles.bottomSheetTitle}>Tanda Tangan Disini</Text>
                                <StatusBar barStyle="dark-content" />
                                <SafeAreaView style={{ flex: 1, padding: 20}}>
                                    <SignatureView
                                    style={{
                                    borderWidth:2,
                                    height:200,
                                    }}
                                    
                                    ref={signatureRef}
                                    // onSave is automatically called whenever signature-pad onEnd is called and saveSignature is called
                                    onSave={(val) => {
                                        //  a base64 encoded image
                                        console.log('saved signature')
                                        console.log(val);
                                        setText(val)
                                    
                                    }}
                                    onClear={() => {
                                        console.log('cleared signature')
                                        setText('')
                                    }}
                                    />
                                    <View style={{flexDirection: 'row', justifyContent:'center', height: 50}}>
                                        <TouchableOpacity 
                                            style={{ justifyContent:'center',alignItems:'center', width: 170}}
                                            onPress={() => {
                                                signatureRef.current.clearSignature();
                                            }}>
                                            <Text>Clear</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ justifyContent:'center',alignItems:'center', width: 170}}
                                            onPress={() => {
                                                signatureRef.current.saveSignature();
                                            }}>
                                            <Text>Save</Text>
                                        </TouchableOpacity>
                                    </View>
                                
                                    <ScrollView style={{flex:1,margin: 20}}>
                                    <Text numberOfLines={10} ellipsizeMode='tail'>{text}</Text>
                                    </ScrollView>
                                </SafeAreaView>
                            </View>
                        </BottomSheet>

                            {/* picker */}
                            {showPicker1 && (
                                <DateTimePicker 
                                    mode='date'
                                    display="calendar"
                                    value={date1}
                                    onChange={onChangeTglAwal}
                                />
                            )}

                            {showPicker2 && (
                                <DateTimePicker 
                                    mode='time'
                                    display="clock"
                                    value={date2}
                                    onChange={onChangeJamAwal}
                                />
                            )}

                            {showPicker3 && (
                                <DateTimePicker 
                                    mode='date'
                                    display="calendar"
                                    value={date3}
                                    onChange={onChangeTglAkhir}
                                />
                            )}

                            {showPicker4 && (
                                <DateTimePicker 
                                    mode='time'
                                    display="clock"
                                    value={date4}
                                    onChange={onChangeJamAkhir}
                                />
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    </View>
  );
}