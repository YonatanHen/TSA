import React, { useState } from 'react'
import { Text, View, TextInput, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux'

import sendMailToAdmin from '../../utilities/sendMailToAdmin'

const Contact = props => {
    const user = useSelector(state => state.data)
    const [content, contentHandler] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const sendHandler = async () => {
        try {
            setIsLoading(true)
            await sendMailToAdmin(user.institute, user.email, `${user.firstName} ${user.lastName}`, content)
            Alert.alert('Message has been sent successfully')
        } catch (err) {
            console.log(err)
            Alert.alert('Error!', 'An error occured while sending the email, please try again later')
        }

        setIsLoading(false)
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
                {isLoading ? (<ActivityIndicator size='small' color='deepskyblue' />)
                    : (<Button title={"send"} onPress={sendHandler} />)}
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