import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, LogBox } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { colors } from '../../constants/colors';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
 ]);

const MapScreen = props => {
  const [selectedLocation, setSelectedLocation] = useState()
  
  const mapRegion = {
    latitude: 31.771959,
    longitude: 35.217018,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  const selectLocationHandler = event => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    })
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      console.log('LOCATION NOT SELECTED')
      return
    }
    props.navigation.navigate('Edit User', { pickedLocation: selectedLocation })
  }, [selectedLocation])

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler })
  }, [savePickedLocationHandler])

  let markerCoordinates

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    }
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={mapRegion}
      onPress={selectLocationHandler}
      provider={PROVIDER_GOOGLE}
    >
      {markerCoordinates && <Marker title='Picked Location' coordinate={markerCoordinates} />}
    </ MapView>
  );
};

export const ScreenOptions = (navData) => {

  if (navData.route.params) {
    const { saveLocation } = navData.route.params
    return {
      headerRight: () => (<TouchableOpacity styles={styles.headerButton} onPress={saveLocation}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
      )
    }
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: colors.primary
  }
});

export default MapScreen;
