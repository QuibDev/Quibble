import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Constants from '../../constants/Constants';

const styles = StyleSheet.create({

    container: {
      flexDirection: 'row',
      padding: 10,
    },
  
    badgeContainer: {
      backgroundColor: Constants.blue,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 10,
      position: 'absolute',
      left: 50,
      top: 16,
    },
  
    badgeText: {
      color: 'white',
      fontSize: 12,
    },
  
    row: {
      flexDirection: 'row',    
      justifyContent: 'space-between',
      alignItems: 'baseline'
    },
  
    rightContainer: {
      flexDirection: 'column',    
      flex: 1,
      justifyContent: 'center',
    },
  
    image: {
      height: 50,
      width: 50,
      borderRadius: 30,
      marginRight: 15,
      marginLeft: 5,
      marginTop: 10,
    },
    messageText: {
      color: Constants.grey,
      fontSize: 17,
    },
    timestampText: {
      color: Constants.grey
    },
    usernameText: {
      fontSize: 19,
      fontWeight: "bold",
      marginBottom: 3,
      marginTop: 5,
  
    },
  
  
  
  })

  export default styles