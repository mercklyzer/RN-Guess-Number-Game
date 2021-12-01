import React from "react";
import { StyleSheet, Text } from "react-native";

const Title = (props) => {
    return <Text style={{...props.style, ...styles.title}}>{props.children}</Text>
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold'
    }
})

export default Title