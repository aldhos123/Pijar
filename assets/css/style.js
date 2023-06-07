import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var { width, height } = Dimensions.get('window');
var panjangHpBS = height * 0.7;

const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      position: 'absolute',
      left: 0,
      top: 0,
      opacity: 0.5,
      backgroundColor: 'black',
      width: width
    }, 
    searchbar:{
      flexDirection:"row",
      backgroundColor:"#fff",
      alignItems:"center",
      height:40,
      width: "80%",
      borderRadius:10,
    },
    searchBarText:{
      color:"#BEBEBE",
      marginLeft:15,
      fontSize:20, 
      width: '80%',
      fontFamily: 'Raleway'
    },
    flexContainer:{
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      marginHorizontal: 20,
      marginBottom: 10,
    },
    topview:{
      backgroundColor: '#0D6EFD',
      flex:1,
      justifyContent:"space-between"
    },
    welcomemessage:{
      color:"#fff",
      fontSize:35,
      fontFamily: "Raleway"
    },
    circle:{
      borderRadius:25,
      height:50,
      width:50,
    },
    bottomview:{
      flex:2,
      backgroundColor:"#fff",
      borderTopLeftRadius:50,
      borderTopRightRadius:50,
    },
    bookingInfo:{
      fontWeight:"bold",
      marginBottom:10
    },
    subBookingInfo:{
      fontWeight:"bold",
      fontSize:18
    },
    customCardBooking:{
      backgroundColor:"#fff",
      marginHorizontal:24,
      marginTop:-40,
      padding:30,
      borderRadius:10,
      flexDirection:"row",
      justifyContent:"space-between"
    },
    txtTitleCard:{
      paddingHorizontal: 26,
      marginVertical:20,
      fontSize:20,
      fontFamily: "Raleway"
    },
    txtCard:{
      color:"#fff",
      fontSize:20,
      fontFamily: "Raleway",
    },
    btnCard:{
      backgroundColor:"#fff",
      width:110,
      padding:5,
      borderRadius:6,
      marginTop:50
    },
    txtBtnCard:{
      textAlign:"center", 
      fontFamily: "Raleway"
    }, 
    bottomNavigationView: {
      backgroundColor: '#fff',
      width: '100%',
      height: panjangHpBS,
      alignItems: 'center',
      borderRadius: 20,
    },
    txtDateHistory:{
        fontSize: 12,
        color: "#a6a6a6",
        fontFamily: "Raleway"
    },
    txtTitleHistory:{
        fontSize: 16,
        fontFamily: "Raleway",
    },
    txtKodeHistory:{
      fontSize: 20,
      fontFamily: "Raleway"
    },
    itemKodeHistory:{
      padding:15, 
      borderRightWidth: 0.5, 
      borderRightColor: "#ababab",
      justifyContent: "center"
    },
    itemStatusHistory: {
      color: "#fff", 
      fontFamily: "Raleway", 
      backgroundColor: "#eb4034", 
      padding: 2, 
      borderRadius: 5
    },
    historyItemCard:{
      marginBottom:20, 
      backgroundColor: '#fff', 
      flexDirection: "row", 
      height: 70, 
      borderBottomColor: "#0D6EFD", 
      borderBottomWidth: 2
    },
    list: {
      flexDirection: 'column',
      alignItems: "center"
    },
    bottomSheetTitle:{
      textAlign: 'center', 
      padding: 20, 
      fontSize: 20, 
      fontFamily: "Raleway"
  },
    lantaiBottomSheetCard:{
      alignItems: "center",
      backgroundColor:"#dee3e0",
      borderWidth: 0.5,
      borderColor: '#0D6EFD', 
      borderRadius:5, 
      width: 100, 
      height: 80, 
      margin: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 1,
    },
    gedungCard:{
      flexDirection:"row",
      overflow:"hidden",
      justifyContent:"space-between",
      backgroundColor:"#0D6EFD",
      marginHorizontal:26,
      marginBottom:20,
      borderRadius:10
    },
    iconInlineText:{
      paddingRight: 26,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline"
    },
    iconInlineTextInput:{
      paddingRight: 26,
      flexDirection: "row",
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
      marginLeft: 20,
      width:"90%",
      padding: 5 * 2,
      backgroundColor: '#ccdafc',
      borderRadius: 10,
      marginVertical: 10
    }, 
    inputStyleDisabled: {
      fontFamily: 'Raleway',
      marginLeft: 20,
      width:"90%",
      fontSize: 12,
      padding: 5 * 2,
      backgroundColor: '#acacac',
      borderRadius: 10,
      marginVertical: 10
    },
    
    button: {
      padding: 5 * 2,
      backgroundColor: '#0D6EFD',
      width: 150,
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
  });

export default styles;