import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { useSelector } from 'react-redux';


const Inbox = props => {
    const user = useSelector(state => state.data)

    useEffect(() => {

    }, [])


    return (
        <>
            <Text>INBOX PAGE</Text>
        </>
    )
}



const styles = StyleSheet.create({})

export default Inbox