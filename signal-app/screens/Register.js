import React, {useState,useLayoutEffect} from 'react';
import { StyleSheet,StatusBar,KeyboardAvoidingView, Text, View,Image } from 'react-native';
import { Input,Button } from 'react-native-elements';
import {auth} from '../basefire'
import Home from './Home';

export default function Register({navigation}) {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')    
    const [password,setPassword]=useState('')
    const [imageUrl,setImageUrl]=useState('')

  
    const register=()=>{
        auth
        .createUserWithEmailAndPassword(email,password)
        .then((authUser)=>{
            authUser.user.updateProfile({
                displayName:name,
                photoURL:imageUrl
            });
        //    const user = JSON.stringify(authUser);
        // alert(authUser.user.displayName) ;  
        
        })
        .catch((err)=>alert(err.message))
        
    }
    return (
        <View style={styles.container}>

        <Text style={styles.title}>Create an account</Text>
        <View style={styles.input}>
            <Input placeholder='Full name...'
                    type='text'
                    autoFocus
                    value={name}
                    onChangeText={(text)=>setName(text)}
                    />
                    <Input placeholder='Email...'
                    type='email'
                    autoFocus
                    value={email}
                    onChangeText={(text)=>setEmail(text)}
                    />
                    <Input placeholder='Password'
                    type='password'
                    autoFocus
                    secureTextEntry
                    value={password}
                    onChangeText={(text)=>setPassword(text)}
                    />
                    <Input placeholder='Profile picture URL(Optional)'
                    type='text'
                    autoFocus
                    value={imageUrl}
                    onChangeText={(text)=>setImageUrl(text)}
                    onSubmitEditing={register}
                    />
        </View>
        <Button buttonStyle={styles.button} onPress={register} title='Register'/>
        <View style={{height:50}}></View>
        </View>
    )
}


const styles=StyleSheet.create({
container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#cfe0e3'
},
title:{
    fontSize:25,
    paddingBottom:15,
},
input:{
    width:300,
},
button:{
    width:200,
    marginTop:10

}

})