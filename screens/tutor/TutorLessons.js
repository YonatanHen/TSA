import React, { useState } from 'react'
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { Card } from 'react-native-paper'

import DatePicker from '../../components/pickers/datePicker'


const TutorLessons = props => {
    const [items, setItems] = useState(props.tutorDates ? props.tutorDates : {})
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)

    const dateFormatter = (dateObj) => {
        return Intl.DateTimeFormat('sv-SE').format(dateObj)
    }

    const renderDay = (item) => {
        return (
            <TouchableOpacity>
                <Card>
                    <Card.Content>
                        <Text>{item.name}</Text>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        )
    }

    const showDatePicker = () => {
        if (date) {
            setDatePickerVisibility(true);
        } else Alert.alert('Select a Date from the calendar first!')
    }

    return (
        <>
            <Agenda
                items={{
                    '2021-10-22': [],
                    '2021-10-23': [{ name: 'item 2 - any js object', time: '2:57:16 PM' }],
                    '2021-10-24': [],
                    '2021-10-25': [{ name: 'item 3 - any js object' }]
                }}
                selected={dateFormatter(new Date())}
                showClosingKnob={true}
                renderItem={renderDay}
                onDayPress={(day) => {
                    console.log(day)
                    console.log(new Date(day.dateString))
                    setDate(new Date(day.dateString))
                }}
            />
            <View style={styles.datePickerButtonContainer}>
                <Button color={'deepskyblue'} title="Add Lesson Option" onPress={showDatePicker} />
            </View>
            <DatePicker
                setDatePickerVisibility={setDatePickerVisibility}
                isDatePickerVisible={isDatePickerVisible}
                setTime={setTime}
            />
        </>
    )
}



const styles = StyleSheet.create({
    datePickerButtonContainer: {
        margin: 2,
        padding: 5
    }
})

export default TutorLessons