import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

//muy parecido al registro

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			pass: '',
			error:'',
		};
	}
	loginUser(email, pass) {
		auth
        //metodo de firebase para ingresar
			.signInWithEmailAndPassword(email, pass)
			.then((res) => {
				this.setState({
					email: '',
					pass: '',
				});
				this.props.navigation.navigate('HomeMenu',{id:1,mensaje:"hola"});
			})
			.catch((error) => console.log(error));
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headertitle}>INGRESAR</Text>
				</View>		
				<View>
					<TextInput 
                    style={styles.field} 
                    placeholder="email" 
                    keyboardType="email-address" 
                    onChangeText={(text) => this.setState({ email: text })} 
                    value={this.state.email} 
                    />

					<TextInput 
                    style={styles.field} 
                    placeholder="password"
                     keyboardType="default" 
                     secureTextEntry onChangeText={(text) => this.setState({ pass: text })}
                      value={this.state.pass} 
                      />

					<Text style={styles.bold} onPress={() => this.loginUser(this.state.email, this.state.pass)}>LOGUEARME</Text>
					<Text style={styles.bold} onPress={() => this.props.navigation.navigate('Register')}>NO TENGO CUENTA</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header:{
		backgroundColor: "#FF9333",
		width: "100%",
		padding: 10,
		marginBottom: 20,
	},	
	headertitle:{
		color: "white",
		textAlign: "center",
		fontSize: 20,
		fontWeight: "600",
		padding: 10,
	},
	container:{
		overflow: "hidden",
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		color: "#ff9f68",
		paddingTop: 20,
	},
	
	field: {
		width: "50%",
		backgroundColor: "#E5E5E5",
		textAlign: "center",
		padding: 10,
		marginTop: 5,
		borderRadius: 40,
	  },
	  title: {
		color: "#000000",
		textAlign: "center",
		fontSize: 20,
		fontWeight: "600",
		padding: 10,
	  },
	  bold:{
		fontWeight: "bold",
	}
});

export default Login;
