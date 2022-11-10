import { auth } from '../firebase/config';
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';


class Register extends Component {

	//creamos props con estados vacios
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			pass: '',
			checkpass: '',
			username: '',
			bio: '',
			error: '',
		};
	}
	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.props.navigation.navigate('HomeMenu');
			}
		});
	}
	//Al registrar un user, queremos guardarlo en la db con nombre,biografia.

	registerUser(email, pass, nombreUsuario, pass, bio, checkpass) {
		//Chequear si estan vacios los campos
		//Si estan vacios, seteame el estado error a un mesaje
		//Despues pones return
		if (this.state.email === '' || this.state.nombreUsuario === '' || this.state.pass === '') {
			this.setState({ error: 'Todos los campos son obligatorios' })
			return
		}
		if (this.state.pass !== this.state.checkpass) {
			this.setState({ error: 'Las contraseñas no coinciden' })
			return
		}
		auth
			//metodo de firebase para crear usuario
			.createUserWithEmailAndPassword(email, pass)
			.then((res) => {
				db
					//creamos usuario en la base de datos
					.collection('users')
					.add({
						email: email,
						nombreUsuario: nombreUsuario,
						bio: bio,
						checkpass: checkpass,
					})
					//reiniciamos el state a 0
					.then((res) => {
						this.setState({
							email: '',
							pass: '',
							bio: bio,
							checkpass: checkpass,
						});
						//una vez creado el usuario que te lleve al menu
						this.props.navigation.navigate('HomeMenu');
					});
			})
			.catch((error) => console.log(error));
	}

	render() {
		return (
			<View>
				<Text>Registro</Text>
				<View>
					<TextInput
						style={styles.field}
						placeholder="email"
						keyboardType="email-address"
						onChangeText={(text) => this.setState({ email: text })}
						value={this.state.email} />
					<TextInput
						style={styles.field}
						placeholder="Nombre de usuario"
						keyboardType="default"
						onChangeText={(text) => this.setState({ nombreUsuario: text })}
						value={this.state.nombreUsuario}
					/>
					<TextInput
						style={styles.field}
						placeholder="password"
						keyboardType="default"
						secureTextEntry onChangeText={(text) => this.setState({ pass: text })}
						value={this.state.pass}
					/>

					{/* si toco tengo cuenta que me lleve al login */}
					<Text onPress={() => this.props.navigation.navigate('Login')}>Ya tengo cuenta</Text>

					{/*  cuando tocamos el boton registrarme con el metodo Onpress
                     con un callback llamamos a la funcion registerUser y creamos el usuario */}
					<TouchableOpacity onPress={() => this.registerUser(this.state.email, this.state.pass, this.state.nombreUsuario)}>
						<Text>Registrarme</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	field: {},
});

export default Register;