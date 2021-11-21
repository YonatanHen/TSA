import React, { useEffect, useState } from 'react'
import { Button, View, StyleSheet, TextInput, Alert } from 'react-native'
import Input from '../../components/Inputs/LoginAndSignUp/Input'

const ResetPassword = props => {
    [passwords, setPasswords] = useState({
        newPassword: '',
        confirmedPassword: ''
    })

    useEffect(()=> {
        console.log(passwords)
    })

    const submitHandler = () => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*[0-9]).*$/
        if(passwords.newPassword !== passwords.confirmedPassword) {
            Alert.alert('Error!','Passwords does not match')
        }
        if (!passwordRegex.test(passwords.newPassword) || (passwords.newPassword)) {
            Alert.alert('Error!','Password must contain 6 characters that includes numbers and letters')
        }
    }

    return (

        <View style={styles.inputForm}>
            <TextInput
                required
                placeholder="New password"
                keyboardType="default"
                initialValue=''
                onChangeText={(text) => setPasswords({...passwords, newPassword: text})}
            />

            <TextInput
                required
                placeholder="Confirm the new password"
                keyboardType="default"
                initialValue=''
                onChangeText={(text) => setPasswords({...passwords, confirmedPassword: text})}
            />
            <Button title='Reset Password' onPress={submitHandler}/>
        </View>
    )
}


styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    label: {
        fontSize: 20
    },
    inputForm: {
        width: '100%',
        padding: 10,
    },
})

export default ResetPassword
