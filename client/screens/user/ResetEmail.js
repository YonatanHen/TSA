import React, { useEffect, useState } from 'react'
import { Button, View, StyleSheet, TextInput, Alert } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { colors } from '../../constants/colors'

import { changeEmail } from '../../store/actions/data/userData'

const ResetEmail = props => {
    const userEmail = useSelector(state => state.data.email)
    const [email, setEmail] = useState(userEmail)
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const submitHandler = async () => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email.toLowerCase())) {
            Alert.alert('Error!', 'Email format is not valid')
        }
        else {
            try {
                setIsLoading(true)
                dispatch(changeEmail(email))
                await setIsLoading(false)
                Alert.alert('Email changed successfully, You will log out in few seconds')
            } catch (error) {
                Alert.alert('Error!', error.message)
            }  
        }
    }

    return (
        <View style={styles.screen}>
            <View style={styles.inputForm}>
                     <TextInput
                        style={styles.input}
                        required
                        placeholder="New E-Mail"
                        keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                <View style={{ marginTop: 10 }}>
                    {!isLoading ? (
                        <Button title='Reset Email' onPress={submitHandler} color={colors.primary} />
                    ) : (
                        <ActivityIndicator size="small" color="grey" />
                    )}
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white'
    },
    inputForm: {
        width: '100%',
        padding: 10,
    },
    input: {
        // flex: 1,
        paddingHorizontal: 2,
        paddingVertical: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 2,
        marginBottom: 2
    },
})

export default ResetEmail
