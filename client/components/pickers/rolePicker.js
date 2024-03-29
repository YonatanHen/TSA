import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'

const RolePicker = props => {
    const [selectedValue, setSelectedValue] = useState("admin")

    const { onInputChange, id } = props;

    useEffect(() => {
        onInputChange(id, selectedValue, true);
    }, [selectedValue, onInputChange, id]);

    return (
        <View style={styles.picker}>
            <View>
                <Text style={{ color: '#b5b5b5' }}>Select Role: </Text>
            </View>
            <View>
                <Picker
                    mode='dialog'
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150, color: '#969696' }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="Admin" value="admin" />
                    <Picker.Item label="Tutor" value="tutor" />
                    <Picker.Item label="Student" value="student" />
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


export default RolePicker