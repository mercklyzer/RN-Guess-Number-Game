import React, {useEffect, useState} from "react";
import { Alert, Button, Dimensions, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import BodyText from "../components/BodyText";
import Card from "../components/Card";
import Input from "../components/Input";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import Title from "../components/Title";
import Colors from '../constants/colors'

const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)



    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4)
        }

        Dimensions.addEventListener('change', updateLayout)

        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

    

    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {
        setEnteredValue('')
        setConfirmed(false)
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)

        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            Alert.alert(
                'Invalid Number!', 
                'Number has to be between 1 and 99.', 
                [{text: 'Okay', style:'destructive', onPress:resetInputHandler}]
            )
            return
        }

        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
        Keyboard.dismiss()
    }

    let confirmedOutput

    if(confirmed){
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <BodyText>You selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
            </Card>
        )
    }


    return (
        <ScrollView>
         {/* to enable click outside, dismiss keyboard */}
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.screen}>
                        <Title style={styles.title}>Start a New Game!</Title>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                            <Input 
                                style={styles.input} 
                                blurOnSubmit 
                                autoCapitalize='none' 
                                autoCorrect={false} 
                                keyboardType='number-pad' 
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{width: buttonWidth}}>
                                    <Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/>
                                </View>
                                <View style={{width: buttonWidth}}>
                                    <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/>
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: '80%',
        minWidth: 300,
        maxWidth: '95%',
        // maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        // width: 100
        // (options: window (excluding status bar), screen (including status bar), only matters in android)
        // width: Dimensions.get('window').width / 4
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer:{
        marginTop: 20,
        alignItems: 'center'
    }
})

export default StartGameScreen