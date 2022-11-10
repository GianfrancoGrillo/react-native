import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function HomeMenu() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Home" component={Home}  options={{ tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }} />
			<Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: () => <FontAwesome name="user" size={24} color="black" /> }} />
             <Tab.Screen name="NewPost" component={NewPost}  options={{ tabBarIcon: () => <FontAwesome name="photo" size={24} color="black" /> }}    />
		</Tab.Navigator>
	);
}

export default HomeMenu;
