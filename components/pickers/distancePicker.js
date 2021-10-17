import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Picker } from '@react-native-community/picker'

const DistancePicker = props => {
    const [selectedValue, setSelectedValue] = useState("5 km")

    // const { onInputChange, id } = props;

    // useEffect(() => {
    //     onInputChange(id, selectedValue, true);
    // }, [selectedValue, onInputChange, id]);

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
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="2 km" value={2} />
                    <Picker.Item label="5 km" value={5} />
                    <Picker.Item label="10 km" value={10} />
                    <Picker.Item label="20 km" value={20} />
                    <Picker.Item label="Not Limited" value={null} />
                </Picker>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    picker: {
        flexDirection: 'row',
        alignItems: 'center'
    },
})


export default DistancePicker