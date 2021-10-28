import React, { useState } from 'react'
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { Card } from 'react-native-paper'

import DatePicker from '../../components/pickers/datePicker'


const TutorLessons = props => {
    const [items, setItems] = useState(props.tutorDates ? props.tutorDates : {})
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

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

    return (
        <>
            <Agenda
                items={{
                    '2021-10-22': [],
                    '2021-10-23': [{ name: 'item 2 - any js object' }],
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
                    setOpen(true)
                }}
            />
            <DatePicker />
        </>
    )
}



const styles = StyleSheet.create({})

export default TutorLessons