import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../src/models';

import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import styles from './style';
import Constants from '../../constants/Constants';
import { Auth } from 'aws-amplify';
import { check } from 'yargs';
import { Ionicons } from '@expo/vector-icons';
import { Messages as MessageModel } from '../../src/models';


const myID = 'u1';

const Message = (props) => {
    const [user, setUser] = useState<User|undefined>();    
    const [isMe,setisMe] = useState<boolean | null>(null);    
    const [message, setMessage] = useState<MessageModel>(props.message);

    useEffect(() => { 
        DataStore.query(User, message.userID).then(setUser);
    }, []);

    useEffect(() => {
        const subscription = DataStore.observe(MessageModel, message.id).subscribe(msg => {
            //console.log(msg.model, msg.opType, msg.element);
            if (msg.model === MessageModel && msg.opType === 'UPDATE') {
                setMessage((message) => ({...message, ...msg.element}));
            }
        });
        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        setAsRead();
    }, [isMe, message]);

    useEffect(() => {
        const checkIfMe = async () => {
            if (!user) {
                return;
            }
            const authUser = await Auth.currentAuthenticatedUser();
            setisMe(user.id === authUser.attributes.sub);
        };
        checkIfMe();
    }, [user]);

    const setAsRead = async () => {
        if (isMe === false && message.status !== "READ") {
            await DataStore.save(
                MessageModel.copyOf(message, (updated) => {
                updated.status = "READ";
            })
        );
        }
    };

    if (!user) {
        return <ActivityIndicator/>
    }

    return (
        <View style={isMe ? styles.rightContainer : styles.leftContainerMe}>            
            <View style={styles.row}>
                <Text style={{ color: isMe ? Constants.black : Constants.white}}>{message.content}</Text>
                {isMe && !!message.status && message.status !== null && (
                    <Ionicons 
                        name={message.status === "DELIVERED" ? "checkmark" : "checkmark-done"} 
                        size={20} 
                        color={Constants.grey}
                        styles={styles.statusIcon}
                    />
                )}
            </View>
        </View>
    )
}



export default Message;