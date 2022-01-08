
import React,{useLayoutEffect,useEffect,useState} from 'react'
import { View,ScrollView,StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements';
import {auth} from '../basefire'
import { AntDesign ,MaterialIcons } from '@expo/vector-icons'; 
import CustomListItem from '../components/CustomListItem';
import { db } from '../basefire';

export default function Home({navigation,route}) {
    const [chats,setChats]=useState([]);
    
    const signOut=()=>{
        auth.signOut()
            .then(()=>{
                // alert('You are logged out')
                navigation.navigate('Login');
               
            })
    }
    useEffect(()=>{
        var unsubscribe = db.collection('chats').onSnapshot((snapshot)=>{

            setChats(snapshot.docs.map((doc)=>({
                id: doc.id,
                data: doc.data(),  //data()  function
            })))

        })
        return unsubscribe ;

    },[])
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitleAlign:'left',
            headerLeft: ()=>(<TouchableOpacity onPress={signOut}>
                            <Avatar
                            placeholderStyle={{backgroundColor: 'black'}}// not works
                            rounded
                            size='medium'
                            source={{uri:route.params.imageUrl}}
                            
                          />
                        </TouchableOpacity>),

            headerRight: ()=>(<View style={{marginRight:15, width:80, flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity  >
               <AntDesign name="camerao" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity  activeOpacity={0.5} onPress={()=>navigation.navigate('Addchat')}>
               <MaterialIcons name="edit" size={24} color="white" />
            </TouchableOpacity>
            </View>

            ),
               
        })
    },[navigation])

    const enterChat=(id,chatName)=>{
        navigation.navigate('Chat',{id,chatName})};

    return (
        <View style={styles.container}>
            {chats.map(({id,data})=>(  
                <CustomListItem            
                    id={id}
                    chatName={data.chatName}
                    photoURL={data.photoURL}
                    createdBy={data.createdBy}
                    key={id}   
                    enterChat={enterChat}            
                    />
                                
            ))}           
        </View>
    )
}



const styles=StyleSheet.create({
    container:{
        flex:1,
        
        backgroundColor:'#cfe0e3'
    },
    

})