import React, {useState,useEffect} from 'react';
import { StyleSheet,StatusBar,KeyboardAvoidingView, Text, View,TouchableOpacity } from 'react-native';
import { ListItem ,Avatar} from 'react-native-elements';


export default function CustomListItem({id,chatName,photoURL,createdBy,enterChat}) {


    return (
      <View>
        <ListItem 
        onPress={()=>enterChat(id,chatName)}
        key={id}
        bottomDivider>
        <Avatar 
        rounded
        activeOpacity={0.7}
        source={{
        uri: photoURL,
        }} />
          <ListItem.Content>
            <ListItem.Title style={{fontWeight:'bold'}}>{chatName}</ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
            Created by {createdBy}
            </ListItem.Subtitle>
          </ListItem.Content>

        </ListItem>
      </View>
    
    )
}












