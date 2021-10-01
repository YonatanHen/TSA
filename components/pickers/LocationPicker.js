import React, { useState, useEffect } from 'react'
import { View, Button, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

import MapPreview from './MapPreview'

const LocationPicker = props => {
    const [isFetching, setIsFetching] = useState(false)
    const [pickedLocation, setPickedLocation] = useState()

    const mapPickedLocation = props.navigation.getParam('pickedLocation')

    const {onLocationPicked} = props

    useEffect(() => {
        if(mapPickedLocation) {
            setPickedLocation(mapPickedLocation)
            props.onLocationPicked(mapPickedLocation)
        }
    }, [mapPickedLocation, onLocationPicked])

    const verifyPermissions = async () => {
        //Related to ios permissions
        const result = await Permissions.askAsync(Permissions.LOCATION)
        if (result.status !== 'granted') {
            Alert.alert('Insufficicent permissions!', 'you need to grant location permissions to use this app.', [{ text: 'Okay' }])
            return false
        }
        return true
    }

    const getLocationHandler = async () => {
        setIsFetching(true)
        const hasPermission = await verifyPermissions()
        if (!hasPermission) {
            return
        }

        try {
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000
            })
            console.log(location)
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
            props.onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
        } catch (err) {
            Alert.alert('Could not fetch location!', 'Please try again later or pick a location on the map', [{ text: 'Okay' }])
        }
        setIsFetching(false)
    }

    const pickOnMapHandler = () => {
        props.navigation.navigate('Map')
    }

    return (
        <View style={styles.locationPicker}>
            <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={pickOnMapHandler}>
                {isFetching ? <ActivityIndicator size='large' /> : <Text>No location chosen yet!</Text>}
            </MapPreview>
            <View style={styles.actions}>
                <Button title='Get User Location' onPress={getLocationHandler} />
                <Button title='Pick on map' onPress={pickOnMapHandler} />
            </View>
        </View>
    )
    }

    const styles = StyleSheet.create({
        locationPicker: {
            marginBottom: 15,
        },
        mapPreview: {
            marginBottom: 10,
            width: '100%',
            height: 150,
            borderColor: '#ccc',
            borderWidth: 1,
        },
        actions: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%'
        }
    })

    export default LocationPicker