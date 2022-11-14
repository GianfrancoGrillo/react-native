import React, {Component} from 'react';
import { db, auth } from '../firebase/config';
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
        db.collection('posts').doc(this.props.route.params.id).onSnapshot(
           
                this.setState({
                    comments: doc.data().comments 
                })
            
        )

        
    }
    Comentario() {

		db
			.collection('comentarios')
			.doc(this.props.dataPost.id)
			.update({
				comentarios: firebase.firestore.FieldValue.arrayUnion({email: auth.currentUser.email, comentario:this.props.route.params}),
			})
			.then(() =>
				this.setState({
					
					
				})
			)
			.catch((error) => console.log(error));
	}


    render(){
        // console.log(this.state);
        return(
                <View>
                    <Text>Comment</Text>
                
                     <TextInput
                    
                     placeholder="text"
                     keyboardType="default"
                     onChangeText={(text) => this.setState({textComment : text })}
                     value={this.state.textComment}/>
                     <TouchableOpacity
                     
                      onPress={()=>{}}
                    />
                </View>

        )
    }
}


export default Comments;
