import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Colors from '../constants/colors'
import Title from "./Title";

const Header = (props) => {
    return (
        <View 
            style={{
                ...styles.headerBase, 
                ...Platform.select({ios: styles.headerIOS, android: styles.headerAndroid})
            }}
        >
            <Title style={styles.headerTitle}>{props.title}</Title>
        </View>
    )
}

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',

    },
    headerIOS: {
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderWidth:  1
    },
    headerAndroid: {
        backgroundColor: Colors.primary
    },
    headerTitle: {
        fontSize: 18,
        color: Platform.OS === 'ios'? Colors.primary : 'white'
    },

})

export default Header