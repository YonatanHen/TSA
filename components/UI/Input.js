import React from 'react'
import { TextInput, StyleSheet, View } from 'react-native'


const Input = props => {

    return (
        <View style={styles.inputContainer}>
        <TextInput 
            {...props }
            style={styles.input}
        />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
      },
    input: {
        paddingHorizontal: 2,
        borderBottomColor: '#ccc',
        borderBottomWidth: 2,
    }
})

export default Input