import { StyleSheet, Text, View } from 'react-native';

//componentes que creamos nosotros y los traemos
import Register from './src/screens/Register';
import Login from './src/screens/login';

//dependencias que instalamos stack navigation y navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//Objeto con dos componentes Navigator y Screen
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
      <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
