import React, { useState } from 'react'
import { Text, View, TextInput, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux'
import { colors } from '../../constants/colors'

import sendMailToAdmin from '../../utilities/sendMailToAdmin'
import sendMailToAppTeam from '../../utilities/sendMailToAppTeam'

const Contact = props => {
    const user = useSelector(state => state.data)
    const [content, contentHandler] = useState('')
    const [email, emailaddressHandler] = useState(user.email ? user.email : '')
    const [isLoading, setIsLoading] = useState(false)

    const sendHandler = async () => {
        try {
            setIsLoading(true)
            if (props.sendMailToAppTeam) {
                sendMailToAppTeam(email, `${user.firstName} ${user.lastName}`, content)
            } else {
                await sendMailToAdmin(user.institute, user.email, `${user.firstName} ${user.lastName}`, content)
            }
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
                style={styles.textInput}
                placeholder='Type your email, make sure that address is valid.'
                value={user.email ? user.email : email}
                onChangeText={(text) => emailaddressHandler(text)}
            />
            <TextInput
                numberOfLines={8}
                multiline
                placeholder={`Write a message to ${props.sendMailToAppTeam ? 'app team' : 'your institute admin'}`}
                style={styles.textAreaInput}
                onChangeText={(text) => contentHandler(text)}
            />
            <View style={styles.buttonContainer}>
                {isLoading ? (<ActivityIndicator size='small' color={colors.primary} />)
                    : (<Button title={"send"} onPress={sendHandler} color={colors.primary} />)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 2,
        marginBottom: 5,
        padding: 5,
        marginHorizontal: 10
    },
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