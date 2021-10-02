import { StyleSheet, Text, View } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import Constants from '../../constants/Constants';


const styles = StyleSheet.create({

    root: {
        padding: 10,
    },

    row: {
        flexDirection: "row",
    },

    column: {
        flexDirection: "column",
    },

    inputContainer: {
        backgroundColor: Constants.messageInputBackground,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5,
        marginRight: 12,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: Constants.messageInputBorder              
    },

    icon: {
        marginHorizontal: 5,
    },

    input: {
        flex: 1,
        marginHorizontal: 5,
    },


    buttonIcon: {
        color: 'white',
    },

    buttonContainer: {
        height: 40,
        width: 40,
        backgroundColor: Constants.blue,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',

    },
})

export default styles
