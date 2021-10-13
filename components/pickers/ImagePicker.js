import React, { useState } from 'react'
import { View, Button, Text, StyleSheet, Image, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

import { uploadImage } from '../../utilities/uploadImage'

const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState()

    const verifyPermissions = async () => {
        //Related to ios permissions
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
        if (result.status !== 'granted') {
            Alert.alert('Insufficicent permissions!', 'you need to grant permissions to use this app.', [{ text: 'Okay' }])
            return false
        }
        return true
    }

    const selectImageHandler = async (action) => {
        const hasPermission = await verifyPermissions()
        if (!hasPermission) {
            return
        }

        const image = action === 'select' ? (await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
            base64: true,
        })
        ) : (
            await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [16, 9],
                quality: 0.5,
                base64: true,
            })
        )
        console.log(image)
        setPickedImage(image.uri)
        props.onImageTaken(image.uri)
        uploadImage(image)
    }

    return <View style={styles.ImagePicker}>
        <View style={styles.imagePreview}>
            {!pickedImage ? (<Text>No Image picked yet.</Text>) :
                (<Image style={styles.image} source={{ uri: pickedImage }} />)}
        </View>
        <View style={styles.selectImageButtonsContainer}>
            <Button title="Take Image" onPress={() => selectImageHandler('take')} />
            <Button title="Selcet from gallery" onPress={() => selectImageHandler('select')} />
        </View>
    </View>
}

const styles = StyleSheet.create({
    imagePicker: {
        marginBottom: 15,
    },
    imagePreview: {
        width: '50%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        flex: 1
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
    },
    selectImageButtonsContainer: {
        flex: 1,
        width: '70%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10
    }
})

export default ImgPicker