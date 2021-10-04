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
        alignItems: 'flex-start',
    },

    rightContainer: {
        backgroundColor: Constants.lightgrey,
        marginLeft: 'auto',
        marginRight: 10,
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: '75%',        
        alignItems: 'flex-start',
    },

    row: {
        flexDirection: 'row'
    },

    column: {
        flexDirection: 'column'
    },    

    statusIcon: {
        padding: 10,
        margin: 10,
    },

    RightMessageRepliedToBox: {
        backgroundColor: Constants.darkGrey,
        marginLeft: -5,
        padding: 10,
        marginTop: -2,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        borderLeftColor: Constants.white,
        borderLeftWidth: 4,
        borderTopLeftRadius: 10,        
    },

    LeftMessageRepliedToBox: {
        backgroundColor: Constants.darkBlue,
        marginLeft: -5,
        padding: 10,
        marginTop: -2,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        borderLeftColor: Constants.lightBlue,
        borderLeftWidth: 4,
        borderTopLeftRadius: 10,        
    },

    messageRepliedToContent: {
        color: Constants.white,
    }



});

export default styles