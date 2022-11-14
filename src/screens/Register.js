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
			nombreUsuario: '',
			bio: '',
			error: {
				email: '',
				nombreUsuario: '',
				pass: '',
				bio: '',
			},
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

	registerUser(email, pass, nombreUsuario, bio, ) {
		//Chequear si estan vacios los campos
		//Si estan vacios, seteame el estado error a un mesaje
		//Despues pones return
		if (this.state.email === '' || this.state.nombreUsuario === '' || this.state.pass === '') {
			this.setState({ error: 'Todos los campos son obligatorios' })
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

					})
					//reiniciamos el state a 0
					.then((res) => {
						this.setState({
							email: '',
							pass: '',
							bio: bio,

						});
						//una vez creado el usuario que te lleve al menu
						this.props.navigation.navigate('HomeMenu');
					});
			})
			.catch((error) => console.log(error));
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headertitle}>REGISTRO</Text>
					<Text style={styles.errorText}>
						{this.state.error.email && 'La dirección de email es obligatoria'}
					</Text>
				</View>

				<TextInput

					style={styles.field}
					placeholder="email"
					keyboardType="email-address"
					onChangeText={(text) => this.setState({ email: text })}
					value={this.state.email} />
				<Text style={styles.errorText}>
					{this.state.error.nombreUsuario && 'El nombre de usuario es obligatorio'}
				</Text>
				<TextInput
					style={styles.field}
					placeholder="Nombre de usuario"
					keyboardType="default"
					onChangeText={(text) => this.setState({ nombreUsuario: text })}
					value={this.state.nombreUsuario}
				/>
				<Text style={styles.errorText}>
					{this.state.error.bio && 'La biografía es obligatoria'}
				</Text>
				<TextInput
					style={styles.field}
					placeholder="Biografía"
					keyboardType="default"
					onChangeText={(text) => this.setState({ bio: text })}
					value={this.state.bio}
				/>
				<Text style={styles.errorText}>
					{this.state.error.pass && 'La contraseña es obligatoria'}
				</Text>
				<TextInput
					style={styles.field}
					placeholder="password"
					keyboardType="default"
					secureTextEntry onChangeText={(text) => this.setState({ pass: text })}
					value={this.state.pass}
				/>





				{/* si toco tengo cuenta que me lleve al login */}
				<Text style={styles.bold} onPress={() => this.props.navigation.navigate('Login')}>YA TENGO CUENTA</Text>

				{/*  cuando tocamos el boton registrarme con el metodo Onpress
                     con un callback llamamos a la funcion registerUser y creamos el usuario */}
				<TouchableOpacity onPress={() => this.registerUser(this.state.email, this.state.pass, this.state.nombreUsuario, this.state.bio)}>
					<Text style={styles.bold}>REGISTRARME</Text>
				</TouchableOpacity>
			</View>

		);
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#FF9333",
		width: "100%",
		padding: 10,
		marginBottom: 20,
	},
	headertitle: {
		color: "white",
		textAlign: "center",
		fontSize: 20,
		fontWeight: "600",
		padding: 10,
	},
	container: {
		overflow: "hidden",
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		color: "#ff9f68",
		paddingTop: 20,
	},
	/* form:{
		backgroundColor: 'red',
	}, */
	field: {
		width: "50%",
		backgroundColor: "#E5E5E5",
		textAlign: "center",
		padding: 7,
		marginTop: 5,
		borderRadius: 15,
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


export default Register;