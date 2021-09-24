import Constants from '../../constants/Constants';
import { StyleSheet, useWindowDimensions} from 'react-native';

const styles = StyleSheet.create({

    root: {
      flexDirection: 'row',    
      justifyContent: 'space-between',  
      padding: 10,    
      alignItems: 'center',
      backgroundColor: Constants.white,
    },
  
    headerText: {
      fontSize: 24,
      color: Constants.black,
      fontWeight: 'bold',    
      textAlign: 'center',
      flex: 1,
      marginLeft: 70,
    },  
  
    userIcon: {
      width: 30, 
      height: 30,
      borderRadius: 30,
    },
  
    iconRow: {
      marginLeft: 30,
      right: -18,
      bottom: -4,
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'space-between',
    },
  
    headerIcon: {
      width: 30, 
      height: 30,
      marginRight: 20,
    },
    
  
})

export default styles  