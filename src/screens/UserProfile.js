import React, { Component } from 'react'; //importamos todo lo que vayamos a usar abajo
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView,Image } from 'react-native';
import { AppRegistry } from 'react-native-web';
import { auth,db } from '../firebase/config'; //auth objeto literal con muchas propiedades 
import Post from "../screens/Post"; 
class UserProfile extends Component {
	  constructor(props) {
		super(props);
		this.state ={ //objeto de informacion
			users:'',
			posts:[],
			bio:'',
			nombreUsuario:'', // estoy inicializando el estado
			image :'',
            email:''
		}
		//permite que el usuario pueda , a traves de el uso de la App, que estos estados se actualicen
	}

    componentDidMount(){ // SE EJECUTA LA PRIMERA VEZ QUE SE RENDERIZA EL COMPONENTE
        console.log(this.props.route.params)
        db.collection('users').where('email','==',this.props.route.params.Usuario).onSnapshot( //selecciona una lista de documentos de una coleccion "users" y el metodo where filtra por campo email los documentos que cumplan con esa condicion
            docs=>{                                                                  // Condicion: de todos los documentos yo quiero traer el campo email que sea igual a el email del actual usuario logueado 
                let users = []    // creamos una variable para guardar los datos que pasaremos al estado del componente     //OnSnapshot obtiene todos los documentos de la coleccion y los coloca en el parametro docs
                docs.forEach(doc=>{   //recorremos el array de documentos    // va a traer un solo documento porque el mail es unico
                users.push({  // le agrego al array users un objeto literal que tiene como propiedades id y data
                id: doc.id,    // id tiene como valor el id del documento
                data: doc.data() // data tiene como valor la informacion del documento
                });
		

        this.setState({ // actualizamos el estado con la informacion de la base de datos
          bio: users[0].data.bio, // el [0] es la primera posicion del array que tenia todos los documentos filtrados, como solo trae un documento nosotros especificamos que necesitaremos especificamente cierta informacion del objeto de esa posicion 
		  nombreUsuario: users[0].data.nombreUsuario, // le pasamos la propiedad data y especificamos que informacion necesitamos
		  image: users[0].data.image,
          email: users[0].data.email
		});
		  

                })
            }
        )
		db.collection('posts').where('owner','==',auth.currentUser.email).onSnapshot( //db es un componente
            docs=>{                                 //currentUser propiedad de auth
                let postsInProfile = [];
                docs.forEach((doc)=>{ //mediante el forEach recorremos el array de documentos y pusheamos en el array de resultados un objeto literal
					postsInProfile.push({
                id: doc.id,
                data: doc.data()
                });

        this.setState({
            posts: postsInProfile})
                })
            }
		)


    }

   
	logOut() {
		auth.signOut();
		this.props.navigation.navigate('Login'); // usamos el metodo .navigate para llevar del boton cerrar sesion a lagin
	}  
	render() {
		return (
			<> {/*  Fragment */} {/* codigo en jsx */}
				<Image //componente image
                    source={{uri:this.state.image}}
                    resizeMode="contain" //cambiamos el comportamiento de la imagena contain
                    style={styles.image}
                />
				 <Text style={styles.title2}>Email: {this.state.email} </Text>
                 <Text style={styles.title2}>Nombre de usuario: {this.state.nombreUsuario} </Text>
                 <Text style={styles.title2}>Biografía: {this.state.bio}</Text>
                 <Text style={styles.title2}>Cantidad de posteos:{this.state.posts.length}  </Text>
                 <ScrollView>
                <View>
                    <Text style={styles.title}>POSTEOS</Text>
                    <FlatList  // recibe 3 atributos obligatorios para su confiuracion
                        data={this.state.posts} //el array de datos que debe recorrer --> recibe un array de datos con los items a mostrar
                        keyExtractor={post => post.id.toString()} //la clave unica para cada objeto renderizado --> le pone un id unico a cada uno de los objetos que pasa y asi los identifica
                        renderItem = { ({item}) => <Post dataPost={item} //
                        {...this.props} />} //spreed operator
                    />
                    
                </View>
                </ScrollView>

				<TouchableOpacity onPress={() => this.logOut()}>
					<Text  style={styles.button2}>Cerrar Sesion</Text>
				</TouchableOpacity>  
			</>
		);
	}
}
const styles = StyleSheet.create({
	image:{
	/* 	borderBottomLeftRadius:50,
		borderBottomRightRadius:50,
		borderTopLeftRadius:50,
		borderTopRightRadius:50, */
		height:200
	},
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
	title:{
		color: "#000000",
		textAlign: "center",
		fontSize: 20,
		fontWeight: "600",
		padding: 10,
    },	
	title2:{
		color: "#000000",
		
		fontSize: 15,
		fontWeight: "600",
		padding: 10,
    }	
});
export default UserProfile;