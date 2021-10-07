import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Picker } from '@react-native-community/picker'

const RolePicker = props => {
    const [selectedValue, setSelectedValue] = useState("admin")

    const { onInputChange, id } = props;

    useEffect(() => {
        onInputChange(id, selectedValue, true);
    }, [selectedValue, onInputChange, id]);

    return (
        <View style={styles.picker}>
            <Text>Select Role: </Text>
            <Picker
                mode='dialog'
                selectedValue={selectedValue}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Admin" value="admin" />
                <Picker.Item label="Tutor" value="tutor" />
                <Picker.Item label="Student" value="student" />
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    picker: {
        flexDirection: 'row',
    },
})


export default RolePicker