import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation/index';
import { withAuthenticator } from 'aws-amplify-react-native';

import { Messages } from './src/models';

import Amplify, { Hub } from '@aws-amplify/core';
import config  from './src/aws-exports';
import { DataStore } from '@aws-amplify/datastore';

Amplify.configure(config);

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

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