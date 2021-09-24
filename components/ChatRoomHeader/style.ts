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
  
    headerText: {
      fontSize: 24,
      color: Constants.black,
      fontWeight: 'bold',    
      marginLeft: 10,
      flex: 1,
    },  
  
    userIcon: {
      width: 30, 
      height: 30,
      borderRadius: 30,
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