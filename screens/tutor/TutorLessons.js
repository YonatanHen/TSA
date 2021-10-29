import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { Card } from 'react-native-paper'
import 'intl';
import 'intl/locale-data/jsonp/en';

import NewLessonPicker from '../../components/pickers/newLessonPicker'
import { useSelector } from 'react-redux';


const TutorLessons = props => {
    const user = useSelector(state => state.data)
    console.log(user)
    const [lessons, setLessons] = useState(user.lessons ? user.lessons : {})
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(null)


    useEffect(() => {
    },[setLessons])

    const dateFormatter = (dateObj) => {
        //Formats the date to the pattern of yyyy-mm-dd
        return dateObj.toISOString().split('T')[0]
    }

    const renderDay = (lesson) => {
        return (
            <TouchableOpacity>
                <Card>
                    <Card.Content>
                        <Text>{lesson.time}</Text>
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
                items={lessons}
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
            <NewLessonPicker
                setDatePickerVisibility={setDatePickerVisibility}
                isDatePickerVisible={isDatePickerVisible}
                items={lessons}
                setItems={setLessons}
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