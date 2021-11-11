import React, { useState } from 'react'
import { Text, View, TextInput, StyleSheet, Button } from 'react-native'
import { useSelector } from 'react-redux'

import ContactForm from '../../components/contact/contact'
import sendMailToAdmin from '../../utilities/sendMailToAdmin'

const Contact = props => {
    const user = useSelector(state => state.data)
    const [content, contentHandler] = useState('')

    const sendHandler = () => {

    }

    return (
        <View>
            <TextInput
                numberOfLines={8}
                multiline
                placeholder="Write a message to your institute admin"
                style={styles.textAreaInput}
                onChangeText={(text) => contentHandler(text)}
            />
            <View style={styles.buttonContainer}>
                <Button title={"send"} onPress={sendHandler}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textAreaInput: {
        borderColor: '#ccc',
        borderWidth: 2,
        marginVertical: 20,
        marginHorizontal: 10,
        padding: 5,
        paddingBottom: 95,
        textAlignVertical: 'top',
        borderColor: '#000000',
        borderWidth: 1
    },
    buttonContainer: {
        marginTop: 50,
        paddingHorizontal: 20
    }
})

export default Contact