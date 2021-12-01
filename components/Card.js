import React from "react";
import { StyleSheet, View } from "react-native";

const Card = (props) => {
    return <View style={{...styles.card, ...props.style}}>{props.children}</View>
}

const styles = StyleSheet.create({
    card: {
        // ONLY WORKS FOR IOS
        shadowColor: 'black',
        shadowOffset: { height: 0, width: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,

        // FOR ANDROID (SHADOW DEFAULTS)
        elevation: 5,

        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    }
})

export default Card