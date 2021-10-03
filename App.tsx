import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation/index';
import { withAuthenticator } from 'aws-amplify-react-native';

import { Messages, User } from './src/models';

import Amplify, { Hub } from '@aws-amplify/core';
import config  from './src/aws-exports';
import { DataStore } from '@aws-amplify/datastore';
import Auth from '@aws-amplify/auth';
import moment from 'moment';

Amplify.configure(config);

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {
    const listener = Hub.listen("datastore", async hubData => {
      const { event, data } = hubData.payload;
      if (event === 'networkStatus' ) {
        console.log(`User has a network connection: ${data.active}`)
      }

      if (event === `outboxMutationProcessed` 
        && data.model === Messages 
        && !["DELIVERED", "READ"].includes(data.element.status) 
      ) {         
          // set the message status to be delivered
          DataStore.save(
            Messages.copyOf(data.element, (updated) => {
              updated.status = "DELIVERED";
            })
          );        
        }        
      }
    );

    //Remove listener
    return () => listener();
  }, []);

  useEffect(() => {
    if (!user) { 
      return;
    }

    const subscription = DataStore.observe(User, user.id).subscribe((usr) => {        
        if (usr.model === User && usr.opType === 'UPDATE') {
            setUser((curUser) => ({...curUser, ...usr.element}));
        }
      });
      return () => subscription.unsubscribe();
  }, [user?.id]);

  useEffect(() => {
    const interval = setInterval(async () => {  
      await updateLastOnline();
    }, 1*60*1000);
    return () => clearInterval(interval);
  }, [user])

  useEffect(() => {
    fetchUser();
  }, []);

const fetchUser = async () => {
  const userData = await Auth.currentAuthenticatedUser();
  const user = await DataStore.query(User, userData.attributes.sub);
  if (user) {
    setUser(user);
  }
}

const updateLastOnline = async () => {

  const userData = await Auth.currentAuthenticatedUser();
  const user = await DataStore.query(User, userData.attributes.sub);

  if (!user) {
    return;
  }
  const response = await DataStore.save(
    User.copyOf(user, (updated) => {
      updated.lastOnlineAt = +new Date() ;
    })
  );
  setUser(response);
}

if (!isLoadingComplete) {
  return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar/>
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);