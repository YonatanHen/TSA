import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, View, StyleSheet, ScrollView } from 'react-native'
import { useSelector } from 'react-redux';

import ImagePicker from '../../components/pickers/ImagePicker'

const ProfileImageHandler = props => {
    const user = useSelector(state => state.data)

    const [selectedImage, setSelectedImage] = useState()
    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath)
    }

    useEffect(() => {

    }, [])


    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={0}
            style={styles.screen}
        >
            <View style={styles.ImagePicker}>
                <ScrollView>
                    <ImagePicker
                        onImageTaken={imageTakenHandler}
                        uri={user.imageUrl}
                        editPage
                    />
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white'
    },
    ImagePicker: {
        width: '100%',
        padding: 10,
    }
})

export default ProfileImageHandler

