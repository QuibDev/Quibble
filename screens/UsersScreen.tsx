import React, { useState, useEffect} from 'react';
import {
  Text, 
  View, 
  Image, 
  StyleSheet, 
  ImageBackgroundComponent,
  Pressable,
} from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../src/models';
import { FlatList } from 'react-native-gesture-handler';
import NewChatItem from '../components/NewChatItem';
import Constants from '../constants/Constants';
import { Auth } from 'aws-amplify';


export default function UsersScreen() {

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    DataStore.query(User).then(setUsers);
  }, []);

  console.log(DataStore.query(User));

  return (  
    <View style={styles.page}>
      <FlatList 
        data = {users}
        renderItem={({item}) => <NewChatItem user={item}/>}      
        />    
    </View>    

  );
}

const styles = StyleSheet.create({

  page: {
    backgroundColor: Constants.white,
    flex: 1
  },

})