import React from 'react';
import { Text , View, Image, StyleSheet, useWindowDimensions} from 'react-native';
import { Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import styles from './style';
import Constants from '../../constants/Constants';


const ChatRoomHeader = (props) => {
 
    var {width} = useWindowDimensions();
    width = width-20;
 
    return (
      <View {...{width}} style={styles.root}>
  
        <Image 
        source={{uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png'}}      
        style={styles.userIcon}>        
        </Image>
  
        <Text numberOfLines={1} style={styles.headerText}>Elon</Text>      
  
        <View style={styles.iconRow}>        
            <FontAwesome5 name="video" size={20} color={Constants.black} style={styles.headerIcon}/>
            <MaterialIcons name="call" size={20} color={Constants.black} style={styles.headerIcon}/>
            <Entypo name="dots-three-vertical" size={18} color={Constants.black} style={styles.headerIcon}/>
        </View>
  
      </View>
  
    )}

export default ChatRoomHeader