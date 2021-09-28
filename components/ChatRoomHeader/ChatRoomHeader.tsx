import React, { useEffect, useState } from 'react';
import { Text , View, Image, StyleSheet, useWindowDimensions} from 'react-native';
import { Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import styles from './style';
import Constants from '../../constants/Constants';
import { DataStore } from '@aws-amplify/datastore';
import { ChatRoomUser, User } from '../../src/models';
import Auth from '@aws-amplify/auth';


const ChatRoomHeader = ({ id, children }) => {
 
    const {width} = useWindowDimensions();
    const [user, setUser] = useState<User|null>(null);
    //width = width-20;

    useEffect(() => {
      if (!id) {
        return;
      }
  
      const fetchUsers = async () => {
        const fetchedUsers = (await DataStore.query(ChatRoomUser))
          .filter((chatRoomUser) => chatRoomUser.chatroom.id === id)
          .map((chatRoomUser) => chatRoomUser.user);
  
        // setUsers(fetchedUsers);
  
        const authUser = await Auth.currentAuthenticatedUser();
        setUser(
          fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null
        );
      };
      fetchUsers();
    }, []);

    console.log("User fetched: ",user);
 
    return (
      <View {...{width}} style={styles.root}>
  
        <Image 
        source={{uri: user?.ImageUri}}      
        style={styles.userIcon}>        
        </Image>
  
        <Text numberOfLines={1} style={styles.headerText}>{user?.name}</Text>
  
        <View style={styles.iconRow}>        
            <FontAwesome5 name="video" size={20} color={Constants.black} style={styles.headerIcon}/>
            <MaterialIcons name="call" size={20} color={Constants.black} style={styles.headerIcon}/>
            <Entypo name="dots-three-vertical" size={18} color={Constants.black} style={styles.headerIcon}/>
        </View>
  
      </View>
  
    );
  };

export default ChatRoomHeader;