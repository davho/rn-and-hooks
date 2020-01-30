import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, TouchableHighlight, Text, StyleSheet, Modal } from 'react-native'

const FieldInput = props => {

    const [textField, setTextField] = useState('') //This hook manages the state of just the text field and is initialized as an empty string. The value property of the TextInput component is simply set to this hook's current state at any moment, which is textField. The hook's state management function, setTextField, is called by onChangeText and passed the character being typed. The entire component is passed the handleFinishedInputs function as a prop to be used by the "button" (the TouchableOpacity) and when it's used it simply passes this hook's current state, textField, to the parent component.

    return (
        <Modal visible={props.modalState} animationType='slide'>
            <View style={styles.inputContainer}>
                <TextInput placeholder='Enter something here' placeholderTextColor={'rgb(200,200,200)'} style={styles.input} onChangeText={(char) => setTextField(char)} value={textField}/>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[{backgroundColor: 'rgb(128,128,128)'}, styles.button]} onPress={() => {props.handleFinishedInputs(textField); setTextField('')}} activeOpacity={.1}><Text>Add Item</Text></TouchableOpacity>
                    <TouchableHighlight underlayColor={'green'} activeOpacity={.3} style={[{backgroundColor: 'rgb(192,192,192)'}, styles.button]} onPress={() => {props.setModalState(!props.modalState); setTextField('')}}><Text>Cancel</Text></TouchableHighlight>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1 //You can set flex to any value because it is the only child of the parent (the modal) but it has to be set to something. If you don't set flex it will only take up as much space as its child elements do, if you set flex, it will take up as much space as its parent element gives it. As the modal is the parent element and modals take up 100% of everything we get the inputContainer to take up the same amount of space by setting flex property to anything.
    },
    input: {
        width: '80%',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        color: 'black'
    },
    buttonContainer: {
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        height: 30,
        borderRadius: 20
    }
})

export default FieldInput
