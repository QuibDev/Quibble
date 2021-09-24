import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../src/models';

import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import styles from './style';
import Constants from '../../constants/Constants';
import { Auth } from 'aws-amplify';
import { check } from 'yargs';


const myID = 'u1';

const Message = ({ message }) => {
    const [user, setUser] = useState<User|undefined>();    
    const [isMe,setisMe] = useState<boolean>(false);    

    useEffect(() => {
        DataStore.query(User, message.userID).then(setUser);
    }, []);

    useEffect(() => {
        const checkIfMe = async () => {
            if (!user) {
                return;
            }
            const authUser = await Auth.currentAuthenticatedUser();
            setisMe(user.id === authUser.attributes.sub);
        }
        checkIfMe() ;
    }, [user]);

    if (!user) {
        return <ActivityIndicator/>
    }

    return (
        <View style={isMe ? styles.rightContainer : styles.leftContainerMe}>            
            <Text style={{ color: isMe ? Constants.black : Constants.white}}>{message.content}</Text>
        </View>
    )
}



export default Message;