import { StyleSheet, Text, View } from 'react-native';

//componentes que creamos nosotros y los traemos
import Register from './src/screens/Register';
import Login from './src/screens/login';
import HomeMenu from './src/components/HomeMenu';
import Comments from './src/screens/Comments';
//dependencias que instalamos stack navigation y navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfile from './src/screens/UserProfile';


//Objeto con dos componentes Navigator y Screen
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.conteiner}>
    <Stack.Navigator style={styles.conteiner}>
      <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
      <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      <Stack.Screen options={{ headerShown: false }} name="HomeMenu" component={HomeMenu} />
      <Stack.Screen options={{ headerShown: true }} name="Comments" component={Comments} />
      <Stack.Screen options={{ headerShown: true }} name="UserProfile" component={UserProfile} />
      
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF9333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
