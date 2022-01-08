import React,{useEffect,useState} from 'react'
import { View, Text,StyleSheet } from 'react-native'
import { Input,Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { db,auth } from '../basefire';
const AddChat = ({navigation}) => {

    const [chatName,setChatName]=useState('')

    const createChat=()=>{
        db.collection('chats').add({
            chatName:chatName,
            photoURL:auth.currentUser.photoURL,
            createdBy:auth.currentUser.displayName,
            email:auth.currentUser.email,
        }).then(()=>navigation.goBack())
        .catch((err)=>console.log(err))
    }
    
    useEffect(()=>{
        navigation.setOptions({
            title: ' Create a new chat',
            headerTitleAlign:'left',
        })
    })
    return (
        <View style={styles.container}>
            <View style={styles.input}>
            <Input          
                onSubmitEditing={()=>createChat()}
                onChangeText={(text)=>setChatName(text)}
                leftIcon={<MaterialIcons  name="chat-bubble-outline" size={24} color="gray" />}
                placeholder='Create a new chat...'/>
            </View>
           
            <Button style={styles.button} onPress={()=>createChat()} title='Create new Chat'/>
        </View>
    )
}

export default AddChat

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#cfe0e3'
    },
    input:{
        width:300,
    },
    button:{
        width:200,
        marginTop:10

    }

})
