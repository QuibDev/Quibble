import { StyleSheet } from "react-native";
import Constants from "../../constants/Constants";

const styles = StyleSheet.create({          

    leftContainerMe: {
        backgroundColor: Constants.blue,
        marginLeft: 10,
        marginRight: 'auto',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: '75%',
        flexDirection: 'row'
    },

    rightContainer: {
        backgroundColor: Constants.lightgrey,
        marginLeft: 'auto',
        marginRight: 10,
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: '75%',
        flexDirection: 'row'
    },

    row: {
        flexDirection: 'row'
    },

    column: {
        flexDirection: 'column'
    },

    text: {
        color: Constants.white,        
        backgroundColor: Constants.red,
    },

    statusIcon: {
        padding: 10,
    },


});

export default styles