import { 
    Feather, 
    Ionicons, 
    MaterialCommunityIcons, 
    SimpleLineIcons } from '@expo/vector-icons';

import React, { useState } from 'react';

import {
    Text, 
    View, 
    TextInput, 
    Pressable, 
    KeyboardAvoidingView, 
    Platform } from 'react-native';

import Constants from '../../constants/Constants';
import styles from '../MessageInput/style';
import { DataStore } from '@aws-amplify/datastore';
import { Messages as Message } from '../../src/models';
import { Auth } from 'aws-amplify';
import { ChatRoom } from '../../src/models';


const MessageInput = ({ chatRoom }) => {

    const [message, setMessage] = useState('');
    

    const sendMessage = async () => {
        // send message
        const user = await Auth.currentAuthenticatedUser();
        const newMessage = await DataStore.save(new Message({
            content: message,
            userID: user.attributes.sub,
            chatroomID: chatRoom.id,
        }))

        updateLastMessage(newMessage);
        setMessage('');        
    }

    const updateLastMessage = async (newMessage) => {
        DataStore.save(ChatRoom.copyOf(chatRoom, updatedChatRoom => {
            updatedChatRoom.LastMessage = newMessage;
        }))

    }

    const onPlusClicked = () => {
        console.warn('On plus clicked');
    }

    const onPress = () => {
        if (message) {
            sendMessage();            
        }
        else {
            onPlusClicked();
        }
    }

    return (
        <KeyboardAvoidingView 
        style={styles.root} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset = {100}
        >
            <View style={styles.inputContainer}>
                <SimpleLineIcons name="emotsmile" size={24} color={Constants.messageInputIcon} style={styles.icon}/>

                <TextInput 
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Type to send a message..."

                />


                <Feather name="camera" size={24} color={Constants.messageInputIcon} style={styles.icon}/>
                <MaterialCommunityIcons name="microphone-outline" size={24} color={Constants.messageInputIcon} style={styles.icon}/>
            </View>
            <Pressable onPress={onPress} style={styles.buttonContainer}>
                {message ? <Ionicons name="send" size={18} color={Constants.white}/> :<MaterialCommunityIcons name="plus" size={24} color={Constants.white} style={styles.buttonIcon}/>}
            </Pressable>
        </KeyboardAvoidingView>
    )
}

export default MessageInput


