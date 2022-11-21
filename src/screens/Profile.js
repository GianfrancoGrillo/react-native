import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { auth,db } from '../firebase/config';
import Post from "../screens/Post"; 
class Profile extends Component {
	  constructor(props) {
		super(props);
		this.state = {users:''};
        this.state = {posts:[]};
		this.state = {bio:''};
		this.state = {nombreUsuario:''};
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
                });
		

        this.setState({
          bio: users[0].data.bio,
		  nombreUsuario: users[0].data.nombreUsuario});
		  

                })
            }
        )
		db.collection('posts').where('owner','==',auth.currentUser.email).onSnapshot(
            docs=>{
                let postsInProfile = [];
                docs.forEach((doc)=>{
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
		this.props.navigation.navigate('Login');
	}  
	render() {
       
	   console.log(this.state.posts)
       
		return (
			<>
				 <Text style={styles.title2}>Email: {auth.currentUser.email} </Text>
                 <Text style={styles.title2}>Nombre de usuario: {this.state.nombreUsuario} </Text>
                 <Text style={styles.title2}>Biografía: {this.state.bio}</Text>
                 <Text style={styles.title2}>Cantidad de posteos:  </Text>
                 <ScrollView>
                <View>
                    <Text style={styles.title}>POSTEOS</Text>
                    <FlatList 
                        data={this.state.posts}
                        keyExtractor={post => post.id.toString()}
                        renderItem = { ({item}) => <Post dataPost={item} 
                        {...this.props} />}
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

export default Profile;