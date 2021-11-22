import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Picker } from '@react-native-community/picker'

const DistancePicker = props => {
    const [selectedValue, selectedValueHandler] = useState(null)

    const { onInputChange, id } = props;

    useEffect(() => {
        onInputChange(id, selectedValue);
      }, [selectedValue, selectedValueHandler, onInputChange]);

    return (
        <View style={styles.picker}>
            <View>
                <Text>Distance: </Text>
            </View>
            <View>
                <Picker
                    mode='dialog'
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => selectedValueHandler(itemValue)}
                >
                    <Picker.Item label="2000m" value={2000} />
                    <Picker.Item label="5000m" value={5000} />
                    <Picker.Item label="10000m" value={10000} />
                    <Picker.Item label="20000m" value={20000} />
                    <Picker.Item label="30000m" value={30000} />
                    <Picker.Item label="Not Limited" value={null} />
                </Picker>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    picker: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
})


export default DistancePicker