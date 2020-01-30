import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const FinishedInput = props => {
    //This component is a true dumb component with no state, it simply takes each of the words props that FlatList in App.js gives it and styles them.
    return (
        <TouchableOpacity style={styles.listItems} onPress={props.removeFinishedInput}>
            <Text>{props.words}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    listItems: {
        width: '95%',
        padding: 10,
        marginVertical: 5,
        backgroundColor: 'rgb(228,228,255)',
        borderColor: 'rgb(128,128,128)',
        borderWidth: StyleSheet.hairlineWidth
    }
})

export default FinishedInput
