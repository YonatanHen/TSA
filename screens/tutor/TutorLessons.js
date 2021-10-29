import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { Card } from 'react-native-paper'
import 'intl';
import 'intl/locale-data/jsonp/en';

import DatePicker from '../../components/pickers/datePicker'


const TutorLessons = props => {
    const [items, setItems] = useState({
        '2021-10-22': [],
        '2021-10-23': [{ time: 'item 2 - any js object' }],
        '2021-10-24': [],
        '2021-10-25': [{ time: 'item 3 - any js object' }]
    })
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(null)

    useEffect(() => {
        console.log(items)
    },[items, setItems])

    const dateFormatter = (dateObj) => {
        return dateObj.toISOString().split('T')[0]
    }

    const renderDay = (item) => {
        return (
            <TouchableOpacity>
                <Card>
                    <Card.Content>
                        <Text>{item.time}</Text>
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
                items={items}
                selected={dateFormatter(new Date())}
                showClosingKnob={true}
                renderItem={renderDay}
                onDayPress={(day) => {
                    setDate(dateFormatter(new Date(day.dateString)))
                }}
            />
            <View style={styles.datePickerButtonContainer}>
                <Button color={'deepskyblue'} title="Add Lesson Option" onPress={showDatePicker} />
            </View>
            <DatePicker
                setDatePickerVisibility={setDatePickerVisibility}
                isDatePickerVisible={isDatePickerVisible}
                items={items}
                setItems={setItems}
                date={date}
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