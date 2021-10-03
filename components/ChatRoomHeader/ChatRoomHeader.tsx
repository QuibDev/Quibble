import React, { useEffect, useState } from 'react';
import { Text , View, Image, StyleSheet, useWindowDimensions} from 'react-native';
import { Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import styles from './style';
import Constants from '../../constants/Constants';
import { DataStore } from '@aws-amplify/datastore';
import { ChatRoomUser, User } from '../../src/models';
import Auth from '@aws-amplify/auth';
import moment from 'moment';


const ChatRoomHeader = ({ id, children }) => {
 
    const {width} = useWindowDimensions();
    const [user, setUser] = useState<User|null>(null);

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

    const getLastOnelinText = () => {

      if (!user?.lastOnlineAt){
        return null;
      }

      // if lastOnline < 5 mins ago, show him online
      const lastOnlineDiffMs = moment().diff(user?.lastOnlineAt);
      const IdleInterval = 5*60*1000 // 5 minutes in ms
      if (lastOnlineDiffMs < IdleInterval ) {
        return "Online"
      } else {
        return `Last seen ${moment(user.lastOnlineAt).fromNow()} ago`;
      }
    } 

    
    return (
      <View {...{width}} style={styles.root}>
  
        <Image 
        source={{uri: user?.ImageUri}}      
        style={styles.userIcon}>        
        </Image>

        <View style={styles.UserDetails}>
          <Text numberOfLines={1} style={styles.userName}>{user?.name}</Text>
          <Text style={styles.UserStatus}> {getLastOnelinText()}</Text>
        </View>

  
        <View style={styles.iconRow}>        
            <FontAwesome5 name="video" size={20} color={Constants.black} style={styles.headerIcon}/>
            <MaterialIcons name="call" size={20} color={Constants.black} style={styles.headerIcon}/>
            <Entypo name="dots-three-vertical" size={18} color={Constants.black} style={styles.headerIcon}/>
        </View>
  
      </View>
  
    );
  };

export default ChatRoomHeader;