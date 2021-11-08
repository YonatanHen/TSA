import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, View, StyleSheet, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

import ImagePicker from '../../components/pickers/ImagePicker'

import * as ImageActions from '../../store/actions/data/profilePictureActions'

const ProfileImageHandler = props => {
    const user = useSelector(state => state.data)

    const [selectedImage, setSelectedImage] = useState()
    const [isDeleted, setIsDeleted] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
    }, [selectedImage, setSelectedImage])

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath)
        dispatch(ImageActions.addProfilePicture(imagePath))
    }

    const deleteImageHandler = () => {
        setSelectedImage()
        dispatch(ImageActions.deleteProfilePicture())
    }





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
                        onDeleteImage={deleteImageHandler}
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

