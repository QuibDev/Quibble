import React, {useState, useEffect} from 'react';
import { Text, View, Image, Pressable, ActivityIndicator } from 'react-native';
import { Auth, DataStore } from 'aws-amplify';
import { ChatRoomUser, User, Messages as Message } from '../../src/models';
import styles from './Styles';
import { useNavigation } from '@react-navigation/core';
import moment from 'moment';


export default function ChatRoomItem({ chatRoom }) {

  //const [users, setUsers] = useState<User[]>([]); // all users in this chatrooms
  const [user, setUser] = useState<User|null>(null); // the display user  
  const [lastMessage, setLastMessage] = useState<Message|undefined>();
    

  const navigation = useNavigation();  

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = (await DataStore.query(ChatRoomUser))
      .filter(chatRoomUser => chatRoomUser.chatroom.id === chatRoom.id)
      .map(chatRoomUser => chatRoomUser.user);

      //setUsers(fetchedUsers);

      const authUser = await Auth.currentAuthenticatedUser();
      setUser(fetchedUsers.find(user => user.id !== authUser.attributes.sub) || null);
    };  
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!chatRoom.chatRoomLastMessageId) { return }
    DataStore.query(Message, chatRoom.chatRoomLastMessageId).then(setLastMessage);
  }, [])



  const onPress = () => {
    navigation.navigate('ChatRoom', { id: chatRoom.id });
  }

  if (!user) {
    return <ActivityIndicator />
  }

  const lastMessageTimeStamp = moment(lastMessage?.createdAt).from(moment());

  return (
      <Pressable onPress={onPress} style={styles.container}>
        <Image source={{uri: user.imageUri }} style={styles.image}/>                    

        {!!chatRoom.newMessages 
        && <View style={styles.badgeContainer}> 
            <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
          </View>}        

        <View style={styles.rightContainer}>        

          <View style={styles.row}>
            <Text numberOfLines={1} style={styles.usernameText}>{user.name}</Text>          
            <Text numberOfLines={1} style={styles.timestampText}>{lastMessageTimeStamp}</Text>
          </View>
          <Text numberOfLines={1} style={styles.messageText}>{lastMessage?.content}</Text>
        </View>
    </Pressable>
  );
}
