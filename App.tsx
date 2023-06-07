import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { useFonts } from 'expo-font';

import LoginScreen from './screens/LogIn';
import MainContainer from './screens/MainContainer';
import CustomDrawer from './components/CustomDrawer';

// const Stack = createStackNavigator(); initialRouteName='Login'
const Drawer = createDrawerNavigator();

function App() {
  const [loaded] = useFonts({
    Raleway: require('./assets/fonts/Raleway-Medium.ttf'),
  });

  if (!loaded) {
    return null;
  }

  
  return (
    <NavigationContainer>
      <Drawer.Navigator
      initialRouteName="Login"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{ 
        headerShown: false,
        drawerLabelStyle: {fontFamily: 'Raleway'}, 
        drawerActiveBackgroundColor: '#0D6EFD',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
      }}
      >
        <Drawer.Screen name='Login' component={LoginScreen} 
        options={{
          drawerItemStyle: { height: 0 }
        }}/>

        <Drawer.Screen name='Dashboard' component={MainContainer} 
          options={{ drawerIcon: ({color}) => (
            <Ionicon name='home-outline' size={22} color={color}/>
          )
        }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App