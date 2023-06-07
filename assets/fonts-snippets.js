import { useFonts } from 'expo-font';

function FontRaleway() {

    const [loaded] = useFonts({
        Raleway: require('./fonts/Raleway-Medium.ttf'),
      });
    
      if (!loaded) {
        return null;
      }

}

export default FontRaleway


