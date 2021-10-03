import Constants from '../../constants/Constants';
import { StyleSheet, useWindowDimensions} from 'react-native';


const styles = StyleSheet.create({

    root: {
      flexDirection: 'row',    
      justifyContent: 'space-between',  
      padding: 10,    
      left: -30,
      alignItems: 'center',
      alignContent: 'center',
      backgroundColor: Constants.white,
      flex: 1,
    },

    UserDetails: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: 10,
    },
  
    userName: {
      fontSize: 20,
      color: Constants.black,
      fontWeight: 'bold',          
    },  

    UserStatus: {
      fontSize: 12,
      color: Constants.grey
    },
  
    userIcon: {
      width: 36, 
      height: 36,
      borderRadius: 36,
    },
  
    iconRow: {
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'space-between',
      bottom: -6,
    },
  
    headerIcon: {
      width: 30, 
      height: 30,
      borderRadius: 30,
      marginHorizontal: 5,
    },
  
})

export default styles  