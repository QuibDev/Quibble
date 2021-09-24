import React, { useState, useEffect} from 'react';
import {Auth, DataStore } from 'aws-amplify';
import { ChatRoom, ChatRoomUser } from '../src/models';

import {
  View, 
  StyleSheet, 
  Pressable,
} from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import ChatRoomItem from '../components/ChatRoomItem';
import Constants from '../constants/Constants';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';


export default function HomeScreen() {

  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);


  /*useEffect(() => {
    const fetchChatRooms = async () => {

      const userData = await Auth.currentAuthenticatedUser();

      const chatRooms = (await DataStore.query(ChatRoomUser))
        .filter(chatRoomUser => chatRoomUser.user.id === userData.attributes.sub)      
        .map(chatRoomUser => chatRoomUser.chatroom);
      setChatRooms(chatRooms);          
    };
    fetchChatRooms();
  }, []); */

  useEffect(() => {

    const fetchChatRooms = async () => {
      const user = await Auth.currentAuthenticatedUser();
      const subscription = DataStore.observe(user.attributes.chatrooms).subscribe(ChatRoom => {
        console.log(ChatRoom.model, ChatRoom.opType, ChatRoom.element);
        setChatRooms(ChatRoom.element);
      });
      return () => subscription.unsubscribe();
    }

    fetchChatRooms();
  }, []);

  const navigation = useNavigation();

  return (  
    <View style={styles.page}>
      <FlatList 
        data = {chatRooms}
        renderItem={({item}) => <ChatRoomItem chatRoom={item}/>}      
      />
        
      <Pressable onPress={() => navigation.navigate('UsersScreen')} style={styles.newChatButton}>               
        <Entypo name="new-message" size={30} color={Constants.white} style={styles.newChatIcon}/>
      </Pressable>
    </View>    

  );
}

const styles = StyleSheet.create({

  page: {
    backgroundColor: Constants.white,
    flex: 1
  },

  newChatButton: {
    position: 'absolute',
    bottom: 30,
    right: 15,
    height: 60,
    width: 60,
    backgroundColor: Constants.blue,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  newChatIcon: {
  },


})