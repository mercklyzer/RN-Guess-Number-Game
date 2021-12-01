import React, { useEffect, useState } from "react";
import * as ScreenOrientation from 'expo-screen-orientation'

import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import Title from "../components/Title";
import Colors from "../constants/colors";

const GameOverScreen = (props) => {
    ScreenOrientation.unlockAsync()

    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
 
    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);    
        };

        Dimensions.addEventListener('change', updateLayout);
        
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });
 

    return (
        <ScrollView>
            <View style={styles.screen}>
                <Title>The Game is Over!</Title>
                <View style={{...styles.imageContainer, 
                    width: availableDeviceWidth * 0.7,
                    height: availableDeviceWidth * 0.7,
                    borderRadius: (availableDeviceWidth * 0.7) / 2,
                    marginVertical: availableDeviceHeight / 30
                }}>
                    <Image 
                        // source={require('../assets/success.png')} 
                        fadeDuration={300} // fading time of image once loaded
                        source={{uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'}} 
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>

                {/* styles in text is inherited */}
                <View style={{...styles.resultContainer, marginVertical: availableDeviceHeight / 60}}>
                    <BodyText style={{...styles.resultText, fontSize: availableDeviceHeight < 400 ? 16 : 20}}>
                        Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>.
                    </BodyText>
                </View>
                <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    imageContainer: {
        borderRadius: Dimensions.get('window').width * 0.7 * 0.5,
        borderWidth:3,
        borderColor: 'black',
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height /30
    },
    image: {
        width: '100%',
        height: '100%',
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height /60
    },
    resultText: {
        textAlign:'center',
        fontSize: Dimensions.get('window').height < 400? 16:20
    },
})

export default GameOverScreen