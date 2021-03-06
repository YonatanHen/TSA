import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'

import { GEOPIFY_API } from '@env'

const MapPreview = props => {
    let imagePreviewUrl


    if (props.location) {
        imagePreviewUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=400&height=200&center=lonlat:${props.location.lng},${props.location.lat}&zoom=14&apiKey=${GEOPIFY_API}`
    }
    

    return (
        <TouchableOpacity onPress={props.onPress} style={{ ...styles.mapPreview, ...props.style }}>
            {(props.location) ? (<Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />) : (props.children)}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapImage: {
        width: '100%',
        height: '100%'
    }
})

export default MapPreview