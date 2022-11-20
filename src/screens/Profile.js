import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth,db } from '../firebase/config';

class Profile extends Component {
	  constructor(props) {
		super(props);
		this.state = {users:''};
        this.state = {posts:[]};
	}

    componentDidMount(){
        console.log(auth.currentUser)
        db.collection('users').where('email','==',auth.currentUser.email).onSnapshot(
            docs=>{
                let users = []
                docs.forEach(doc=>{
                users.push({
                id: doc.id,
                data: doc.data()
                })

        this.setState({
            users: users})
                })
            }
        )


    }

   
	logOut() {
		auth.signOut();
		this.props.navigation.navigate('Login');
	}  
	render() {
       
		return (
			<>
				 <Text>Email: {auth.currentUser.email} </Text>
                 <Text>Nombre de usuario: {auth.currentUser.displayName} </Text>
                 <Text>Biografía:</Text>
                 <Text>Cantidad de posteos:</Text>
                 <Text>Posteos:</Text>

				<TouchableOpacity onPress={() => this.logOut()}>
					<Text  style={styles.button2}>Cerrar Sesion</Text>
				</TouchableOpacity>  
			</>
		);
	}
}
const styles = StyleSheet.create({
	bold:{
		fontWeight: "bold",
	},
	button: {
        padding:8,
        backgroundColor:'#FF9333',
        borderRadius:8,
        textAlign:'center',
        marginVertical:8,
        marginHorizontal:16,
        width:280
    },
	button2: {
        padding:8,
        backgroundColor:'grey',
        borderRadius:8,
        textAlign:'center',
        marginVertical:8,
        marginHorizontal:16,
        width:280
    },
		
});

export default Profile;