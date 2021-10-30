import React, { useState } from 'react'
import { View, Button, Text, StyleSheet, Image, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

// import DeleteImage from '../../utilities/cloudinary/deleteImage'

const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState(props.uri)

    const verifyPermissions = async () => {
        //Related to ios permissions
        const result = await ImagePicker.requestMediaLibraryPermissionsAsync()
        console.log(result)
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
        props.onImageTaken(image)
    }

    // const deleteImageHandler = async () => {
    //     DeleteImage(props.uri)
    //     setPickedImage()
    //     props.onImageTaken()
    // }

    return <View style={styles.ImagePicker}>
        <View style={styles.imagePreview}>
            {!pickedImage ? (<Text>No Image picked</Text>) :
                (<Image style={styles.image} source={{ uri: pickedImage }} />)}
        </View>
        <View style={styles.selectImageButtonsContainer}>
            <Button title="Take image" onPress={() => selectImageHandler('take')} />
            <Button title="Selcet from gallery" onPress={() => selectImageHandler('select')} />
            {/* {props.editPage && <Button title="Delete image" onPress={deleteImageHandler} />} */}
        </View>
    </View>
}

const styles = StyleSheet.create({
    imagePicker: {
        marginBottom: 15,
    },
    imagePreview: {
        width: 180,
        height: 180,
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