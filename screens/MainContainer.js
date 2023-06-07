import * as React from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicon from 'react-native-vector-icons/Ionicons'

// Screens
import HomeScreen from './Home';
import HistoryScreen from './History';
import NotificationScreen from './Notification';
import LantaiScreen from './Lantai';
import FormPeminjamanScreen from './FormPeminjaman';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackScreen = () => {
  return(
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="HomeStack" component={HomeScreen} />
      <Stack.Screen name="Lantai" component={LantaiScreen} />
      <Stack.Screen name="FormPeminjaman" component={FormPeminjamanScreen} />
    </Stack.Navigator>
  )
}


export default function MainContainer(){
  return (
    <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName; 
        let rn = route.name;

        if(rn == 'Home') {
          iconName = focused ? 'home' : 'home-outline'
        } else if (rn == 'History') {
          iconName = focused ? 'book' : 'book-outline'
        } else if (rn == 'Notification') {
          iconName = focused ? 'notifications' : 'notifications-outline'
        } else if (rn == 'Profile') {
          iconName = focused ? 'person' : 'person-outline'
        }

        return <Ionicon name={iconName} color={color} size={size}/>
      }, 
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: '#fff',
      tabBarLabelStyle: { fontSize: 10, fontFamily: 'Raleway'},
      tabBarStyle:{ 
        height: 60,
        backgroundColor: '#0D6EFD',
        elevation: 5,
        shadowColor: '#333',
        shadowOffset: { width: 4, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
      },
      tabBarButton: (props) => <TouchableOpacity {...props} />
    })}
    
    >

      <Tab.Screen name="Home" component={StackScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} options={{ tabBarBadge: 3 }} />
    </Tab.Navigator>
  );
}