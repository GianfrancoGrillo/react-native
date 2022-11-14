import React, {Component} from 'react';
import { db, auth } from '../firebase/config';
import firebase from 'firebase'
import { View,
         Text,
         TouchableOpacity, 
         FlatList,
         TextInput, 
          } from 'react-native';
import Post from './Post';

class Comments extends Component {
    constructor(props){
        super(props);
        this.state={
            comments:[],
            textComment:""
        }
    }
    
    componentDidMount(){
        db.collection('posts').doc(this.props.route.params.id).onSnapshot(doc=>{
                this.setState({
                    comments: doc.data().comments 
                })
        }
        )
    }
    
    comentario() {

		db
			.collection('posts')
			.doc(this.props.route.params.id)
			.update({
			        comments: firebase.firestore.FieldValue.arrayUnion({
                    email: auth.currentUser.email,
                    comentario: this.state.textComment,
                    createdAt: Date.now()
                })
			})
			.then(() =>
				this.setState({
					textComment: "",
					
				})
			)
			.catch((error) => console.log(error));
	}


    render(){
        // console.log(this.state);
        return(
                <View>
                    <Text>Comment</Text>
                  <FlatList
                     data={this.state.comments}
                     keyExtractor={item => item.createdAt}
                     renderItem={({item})=>
                     <View>
                    <Text>{item.email}</Text> 
                    <Text>{item.comentario}</Text> 
                     </View>
                     }

                  >
                 </FlatList>

                     <TextInput
                     placeholder="text"
                     keyboardType="default"
                     onChangeText={(text) => this.setState({textComment : text })}
                     value={this.state.textComment}/>
                     <TouchableOpacity
                      onPress={()=>{this.comentario(this.state.textComment)}}
                    ><Text> Agregar comentario</Text></TouchableOpacity>
                </View>

        )
    }
}


export default Comments;
