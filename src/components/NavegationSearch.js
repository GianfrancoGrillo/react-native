import { StyleSheet, Text, View } from 'react-native';

import Search from '../screens/Search';
import UserProfile from '../screens/UserProfile';


import { createNativeStackNavigator } from '@react-navigation/native-stack';



//Objeto con dos componentes Navigator y Screen
const Stack = createNativeStackNavigator();

export default function App() {
  return (
   
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Search" component={Search} />
     <Stack.Screen options={{ headerShown: true }} name="UserProfile" component={UserProfile} />
      
    </Stack.Navigator>

  );
}