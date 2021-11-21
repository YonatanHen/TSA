import React, { useEffect, useState } from 'react'
import { Button, View, StyleSheet, TextInput, Alert } from 'react-native'

const ResetPassword = props => {
    [passwords, setPasswords] = useState({
        newPassword: '',
        confirmedPassword: ''
    })

    const submitHandler = () => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*[0-9]).*$/
        if (passwords.newPassword !== passwords.confirmedPassword) {
            Alert.alert('Error!', 'Passwords does not match')
        }
        else if (!passwordRegex.test(passwords.newPassword) || (passwords.newPassword)) {
            Alert.alert('Error!', 'Password must contain 6 characters that includes numbers and letters')
        }
    }

    return (

        <View style={styles.inputForm}>
            <TextInput
                style={styles.input}
                required
                placeholder="New password"
                keyboardType="default"
                initialValue=''
                onChangeText={(text) => setPasswords({ ...passwords, newPassword: text })}
            />

            <TextInput
                style={styles.input}
                required
                placeholder="Confirm the new password"
                keyboardType="default"
                initialValue=''
                onChangeText={(text) => setPasswords({ ...passwords, confirmedPassword: text })}
            />
            <View style={{ marginTop: 10 }}>
                <Button title='Reset Password' onPress={submitHandler} color="deepskyblue"/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
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

export default ResetPassword
