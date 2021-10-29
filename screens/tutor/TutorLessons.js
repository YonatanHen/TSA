import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { Card } from 'react-native-paper'
import 'intl';
import 'intl/locale-data/jsonp/en';

import DatePicker from '../../components/pickers/datePicker'
import { useDispatch } from 'react-redux';


const TutorLessons = props => {
    const [items, setItems] = useState({})
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        
        console.log(items)
    },[items, setItems])

    const dateFormatter = (dateObj) => {
        //Formats the date to the pattern of yyyy-mm-dd
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