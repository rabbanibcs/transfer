import React,{useState,useLayoutEffect,useEffect} from 'react'
import { View,Keyboard,TouchableWithoutFeedback, Text,KeyboardAvoidingView,TouchableOpacity, ScrollView,StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from 'firebase';
import { db,auth } from '../basefire';
import { Input } from 'react-native-elements';

export default function ChatScreen({navigation,route}) {
    const [input,setInput]=useState('');
    const [messeages,setMessages]=useState([]);

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle:null,
            headerLeft:()=>(
                <View style={{flexDirection:'row',}}>
                    <TouchableOpacity onPress={()=>navigation.goBack()} style={{ marginLeft:10,marginRight:10}}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Avatar rounded source={{uri: auth.currentUser.photoURL,}}/>
                    <Text style={styles.title}>{auth.currentUser.displayName}</Text>
                </View>
            ),
            headerRight:()=>(
                <View style={{flexDirection:'row',width:80,justifyContent:'space-between',paddingRight:10}}>
                    <TouchableOpacity>
                    <Octicons name="device-camera-video" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name="local-phone" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    },[])

    const sendMessage=()=>{
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id ).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })
        setInput('')
    }
    useLayoutEffect(()=>{
        db.collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .orderBy('timestamp')
        .onSnapshot(snapshot=>setMessages(
            snapshot.docs.map((doc)=>(
                {id: doc.id,
                data: doc.data(),}
                ))
        ))
    },[route])
    return (
        
        <KeyboardAvoidingView style={styles.container}>
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <ScrollView>
                {messeages.map(({id,data})=>(
                    data.email === auth.currentUser.email?(
                        <View key={id} style={styles.receiver}>
                            <Text style={{paddingRight:10}}>{data.message}</Text>
                            <Avatar 
                             size="small"
                            containerStyle={{
                            }}                          
                            rounded source={{uri:data.photoURL}}/>
                        </View>
                    ):(
                        <View key={id} style={styles.sender}>
                            <Avatar size="small" rounded source={{uri:data.photoURL}}/>
                            <Text  style={{paddingLeft:10}}>{data.message}</Text>
                        </View>
                    )
                ))}
            </ScrollView>
            </TouchableWithoutFeedback>        
        <View style={styles.footer}>
        <Input placeholder='type...'
                    type='text'
                    autoFocus
                    value={input}
                    onSubmitEditing={sendMessage}
                    onChangeText={(text)=>setInput(text)}
                    />
        <TouchableOpacity onPress={sendMessage}>
        <Ionicons name="send-sharp" size={24} color="blue" />
        </TouchableOpacity>
        </View>
        
        
        </KeyboardAvoidingView>
            
      
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-between',
       
    },
    TextInput:{
        height:40,
        flex:1,
        borderWidth:1,
        // backgroundColor:'#e6f5b8',
        borderRadius:30,
        padding:3,
        marginRight:20,
    
    },
    footer:{
        flexDirection:'row',
        width:'90%',
        alignItems:'center',
        // position:'relative'
        
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        marginLeft: 15,
    },
    sender:{
        flexDirection:'row',
        alignSelf:'flex-start',
        backgroundColor:'#bfe6f5',
        borderRadius:20,
        marginLeft:10,
        marginBottom:20,
        padding:6,
        position:'relative',
        borderTopEndRadius:0,

        
    },
    receiver:{
        flexDirection:'row',
        alignSelf:'flex-end',
        backgroundColor:'#bfe6f5',
        borderRadius:20,
        marginRight:10,
        marginBottom:20,
        padding:6,
        position:'relative',
        borderTopStartRadius:0.

    },
    senderText:{},
    receiverText:{},


    
})
