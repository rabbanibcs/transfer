import React, {useState,useEffect} from 'react';
import { StyleSheet,StatusBar,KeyboardAvoidingView, Text, View,Image } from 'react-native';
import { Input,Button } from 'react-native-elements';
import {auth} from '../basefire'


export default function Login({navigation}) {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    useEffect(()=>{
        const unsubscribe=auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                navigation.navigate('Home',{imageUrl:authUser.photoURL});
            }
        });
        return unsubscribe;
    })

    const signIn=()=>{
  
        auth.signInWithEmailAndPassword(email, password)
            .catch((err)=>alert(err.message))
    }
    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar barStyle='dark-content'
            backgroundColor="#999"/>
            <Image
            source={require('../Images/messageIcon.png')}
            style={{height:150,width:150}}
            />

            <View style={styles.input}>
                <Input 
                type='email' // developer's props
                name='email'
                onChangeText={(text)=>setEmail(text)}
                placeholder='Type Email...'/>

                <Input
                placeholder='Type Password..'
                name='password'
                secureTextEntry
                onChangeText={(text)=>setPassword(text)}
                />
            </View>
           
            <Button onPress={signIn}  buttonStyle={styles.button} title='SignIn'/>
            <Button onPress={()=>navigation.navigate('Register')}   type="outline"  buttonStyle={styles.button} title='Register'/>         
            
            <View style={{height:80}}></View>
        </KeyboardAvoidingView>
    )
}

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