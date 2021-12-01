import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import {Ionicons} from '@expo/vector-icons'
import * as ScreenOrientation from 'expo-screen-orientation'

import Card from "../components/Card";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import Title from "../components/Title";
import BodyText from '../components/BodyText'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    const rndNum = Math.floor(Math.random() * (max - min) + min)

    if(rndNum === exclude){
        return generateRandomBetween(min, max, exclude)
    }
    else{
        return rndNum
    }
}

// const renderListItem = (value, numOfRound) => {
//     return (
//         <View key={value} style={styles.listItem}>
//             <BodyText>#{numOfRound}</BodyText>
//             <BodyText>{value}</BodyText>
//         </View>
//     )
// }

const renderListItem = (listLength, itemData) => {
    return (
        <View style={styles.listItem}>
            <BodyText>#{listLength - itemData.index}</BodyText>
            <BodyText>{itemData.item}</BodyText>
        </View>
    )
}

const GameScreen = (props) => {
    // can lock orientation, and detect what the orientation is
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)

    const initialGuess =generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)

    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()])

    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width)
            setAvailableDeviceHeight(Dimensions.get('window').height)
        }

        Dimensions.addEventListener('change' , updateLayout)

        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })



    // difference of useRef from useState is if value changes, it won't re-render.
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const {userChoice, onGameOver} = props

    useEffect(() => {
        if(currentGuess === userChoice){
            onGameOver(pastGuesses.length)
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = (direction) => {
        if((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)){
            Alert.alert(
                'Don\'t lie!',
                'You know that this is wrong...',
                [{
                    text: 'Sorry!',
                    style: 'cancel'
                }]
            )
            return
        }

        if(direction === 'lower'){
            currentHigh.current = currentGuess
        }
        else{
            currentLow.current = currentGuess + 1
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        setPastGuesses((curPastGuesses) => [nextNumber.toString(), ...curPastGuesses])
    }

    let listContainerStyle = styles.listContainer

    if(availableDeviceWidth < 350){
        listContainerStyle = styles.listContainerBig
    }

    let gameControls = (
        <React.Fragment>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
        </React.Fragment>
    );

    if(availableDeviceHeight < 500){
        gameControls =  (
            <View style={styles.controls}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            {gameControls}
            <View style={listContainerStyle}>
                {/* do not directly style scrollview */}
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) =>  renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList 
                    keyExtractor={(item) => item}
                    contentContainerStyle={styles.list}
                    data={pastGuesses} 
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '80%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // marginTop: Dimensions.get('window').height > 600 ? 20: 10 ,
        width: 400,
        maxWidth: '90%'
    },
    listContainer: {
        // width: '80%',
        // width: '60%',
        width: '60%',
        flex: 1, //important to so that it is scrollable in android
    },
    listContainerBig: {
        width: '80%',
        flex: 1, //important to so that it is scrollable in android
    },
    list:{
        // alignItems: 'center',
        justifyContent: 'flex-end',
        flexGrow: 1 // more appropriate than flex in scrollview
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'

    },
})

export default GameScreen