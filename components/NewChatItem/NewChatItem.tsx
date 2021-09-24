import React from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import styles from './Styles';
import { useNavigation } from '@react-navigation/core';
import { ChatRoom, User, ChatRoomUser } from '../../src/models';
import { Auth, DataStore } from 'aws-amplify';


export default function userItem({ user }) {

  const navigation = useNavigation();  
  
  const createNewChat = async () => {

    // TODO if there is already a chat room then redirect to it.
    if (false) {

      //navigation.navigate('ChatRoom', { id: newChatRoom.id });
    }
    else {

    // create a new chat room
    const newChatRoom = await DataStore.save(new ChatRoom({newMessages: undefined}));

    // connect authentication user with the chat room
    const authUser = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User, authUser.attributes.sub);
    await DataStore.save(new ChatRoomUser({
      user: dbUser,
      chatroom: newChatRoom,
    }));

    // connect clicked user with the chat room
    await DataStore.save(new ChatRoomUser({
      user,
      chatroom: newChatRoom,
    }));

    navigation.navigate('ChatRoom', { id: newChatRoom.id });
    }
  }

    return (
        <Pressable onPress={createNewChat} style={styles.container}>
          <Image source={{uri: user.imageUri }} style={styles.image}/>                                   

          <View style={styles.rightContainer}>        

            <View style={styles.row}>
              <Text numberOfLines={1} style={styles.usernameText}>{user.name}</Text>          
            </View>
            <Text numberOfLines={1} style={styles.statusText}>{user.status}</Text>       
          </View>
      </Pressable>
    );
}
