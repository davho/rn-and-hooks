import React, { useState } from 'react'
import { StyleSheet, View, FlatList, Button } from 'react-native'

//Find the setupDevtools.js file at node_modules/react-native/Libraries/Core/setupDevtools.js. and change 'localhost' to your machine IP in order to use React Native Developer Tools (machine IP is under System Preferences\Network)
//This is a React Native AutoComplete plugin for Atom if you want to see prop types pop up everytime you type the name of a component which is part of the React Native library or even one of your own components
//https://www.youtube.com/watch?v=UhR0JuWWhGI
//https://atom.io/packages/atom-react-autocomplete

import FinishedInput from './components/FinishedInput'
import FieldInput from './components/FieldInput'

const App = () => {

    const [modalState, setModalState] = useState(false)

    const [finishedInputs, setFinishedInputs] = useState([]) //This hook manages the state of an array of text inputs and is initialized as an empty array

    const handleFinishedInputs = textField => { //The argument here could be called anything but I'm calling it textField, since that's exacly what's being sent to it from the child FieldInput component. In this handleFinishedInputs function, the setFinishedInputs function is called, which is part of the hook above, and simply passes the textField to it after rendering it into an object that Flatlist can understand and expanding the current array of finishedInputs first to update its entire state. I pretend this array is filled with objects with only two properties, one being the textField, of course, and the second being an id or a key mal-named uid, so that I can demonstrate how FlatList's keyExtractor translates it into a key by taking two arguments, item (the object) and index, and saying that item.uid is what the key should be. As of the most recent version of React Native, id can also be passed to keyExtractor as the key prop. The data prop is, of course, the array of the objects in finishedInputs, and the renderItem prop simply explains to use the item.val from the data, which is passed to the FinishedInput component as a prop called words (it could be called anything).
        if (textField.length < 1) { //Make sure there's at least one character here. Obviously, in a real scenario this wouldn't have such crude logic, it would test for specific characters.
            return
        }
        setFinishedInputs((finishedInputs) => [...finishedInputs, {uid: Math.random().toString(), val: textField }])
        setModalState(false)
    }

    const removeFinishedInput = (uid) => { //We could remove by index, of course, but we have access to the uid in the object so we should use that and the best array method for that is filter, which doesn't take an integer like index but a function, who's function takes an element and returns a new array based on a boolean match statement. In this case we make our match statement return false so that the new array doesn't have the uid that matches what we passed in to it.
        let newArray = finishedInputs.filter(i => i.uid !== uid) //let a new array equal the finishedInputs array with the uid filtered out
        setFinishedInputs(newArray) //call setFinishedInputs and pass it the new array
    }


    return (

        <View style={styles.screen}>

            <Button onPress={() => setModalState(!modalState)} title='Open modal'/>

            <FieldInput handleFinishedInputs={handleFinishedInputs} modalState={modalState} setModalState={setModalState}/>

            <FlatList keyExtractor={(item, index) => item.uid} data={finishedInputs} renderItem={itemData => <FinishedInput words={itemData.item.val} key={itemData.item.uid} removeFinishedInput={() => removeFinishedInput(itemData.item.uid)}/>}/>
        </View>
    )
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
})

export default App
