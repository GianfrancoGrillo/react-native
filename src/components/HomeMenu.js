import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';
import NavegationSearch from './NavegationSearch'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function HomeMenu() {
	return (
		<Tab.Navigator>
			<Tab.Screen style={styles.naranja} name="Home" component={Home}  options={{ tabBarIcon: () => <FontAwesome name="home"  size={24} color="#FF9333" /> }} />
			<Tab.Screen style={styles.naranja}name="Profile" component={Profile} options={{ tabBarIcon: () => <FontAwesome name="user" size={24} color="#FF9333" /> }} />
            <Tab.Screen style={styles.naranja}name='NavegationSearch' component={NavegationSearch} options={{tabBarIcon: ({focused}) => <Ionicons name="search-sharp" size={24} color='#FF9333'/>}}/>
             <Tab.Screen style={styles.naranja}name="NewPost" component={NewPost}  options={{ tabBarIcon: () => <FontAwesome name="photo" size={24} color="#FF9333" /> }} />
		</Tab.Navigator>
	);
}
const styles = StyleSheet.create({
	header: {
		backgroundColor: "#FF9333",
		width: "100%",
		padding: 10,
		marginBottom: 20,
	},
	naranja:{
		backgroundColor:"#FF9333"
	}})
	
export default HomeMenu;
