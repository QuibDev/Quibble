import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import  Message  from '../components/Message';
import MessageInput from '../components/MessageInput';
import { useRoute, useNavigation } from '@react-navigation/core';
import { ChatRoom, Messages as MessageModel } from '../src/models';
import { DataStore } from '@aws-amplify/datastore';
import Constants from '../constants/Constants';
import { conditionalExpression } from '@babel/types';
import { ActivityIndicator } from 'react-native';
import { SortDirection } from 'aws-amplify';


export default function ChatRoomScreen() {

    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [messageReplyTo, setMessageReplyTo] = useState< MessageModel| null>(null);
    const route = useRoute();
    const navigation = useNavigation();
    const [chatRoom, setChatRoom] = useState<ChatRoom|null>(null);
    
    useEffect(() => {
        fetchChatRooms();
    }, []);

    useEffect(() => {
        fetchMessages();    
    }, [chatRoom]);

    useEffect(() => {
        const subscription = DataStore.observe(MessageModel).subscribe(msg => {
            //console.log(msg.model, msg.opType, msg.element);
            if (msg.model === MessageModel && msg.opType === 'INSERT') {
                setMessages(existingMessage => [msg.element, ...existingMessage] )
            }
        });
        return () => subscription.unsubscribe();
    }, []);

    const fetchChatRooms = async () => {
        if (!route.params?.id) {
            //console.log("No chatrrom id provided");
            return;
        }            
        const chatRoom = await DataStore.query(ChatRoom ,route.params.id);
        if (!chatRoom) {
            //console.log("fetchChatRooms: Couldn't find a chat room with this id");
        } else {
            setChatRoom(chatRoom);
        }
        
        //const fetchedMessages = await DataStore.query(MessageModel, );
    };  
    
    const fetchMessages = async () => {
        if (!chatRoom) {
            console.log("fetchMessages: Couldn't find a chat room with this id");
            return;
        }
        const fetchedMessages = await DataStore.query(MessageModel, 
            message => message.chatroomID("eq", chatRoom?.id),
            {
                sort: message => message.createdAt(SortDirection.DESCENDING)
            }
        );
        setMessages(fetchedMessages);
    };

    //console.warn("Displaying chat room: ", route.params?.id)        
    
    navigation.setOptions({title:ChatRoom})

    if (!chatRoom) {
        return <ActivityIndicator/>
    }

    return (
        <SafeAreaView style={styles.page}>
            <FlatList
                data = {messages}
                renderItem = {({item}) => (<Message message={item} setAsMessageReply={() => setMessageReplyTo(item)}/>)}
                inverted
            />
            <MessageInput chatRoom={chatRoom} messageReplyTo={messageReplyTo} 
                removeMessageReplyTo = {() => setMessageReplyTo(null)}/>
        </SafeAreaView>
    )    

};

const styles = StyleSheet.create({

    page: {
        backgroundColor: Constants.offWhite,
        flex: 1,
    },
})