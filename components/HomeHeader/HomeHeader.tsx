import * as React from 'react';
import { 
  Text,
  View,
  Image,
  useWindowDimensions,
  Pressable
} from 'react-native';

import { Feather, MaterialIcons } from '@expo/vector-icons';
import styles from './style';
import Constants from '../../constants/Constants';


import { Auth } from '@aws-amplify/auth/lib-esm/Auth';


const HomeHeader = (props) => {

    const { width } = useWindowDimensions();

    const logOut = () => {
      Auth.signOut();
    }
  
    return (
      <View style={styles.root}>          
          <Image 
          source={{uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg'}}      
          style={styles.userIcon}>        
          </Image>
    
          <Text style={styles.headerText}>Messages</Text>      
    
          <View style={styles.iconRow}>
              <Pressable onPress={logOut} style={styles.iconRow}>               
                <MaterialIcons name="logout" size={26} color={Constants.black} style={styles.headerIcon}/>
              </Pressable>            
          </View>
    
      </View>
    )
  }

export default HomeHeader