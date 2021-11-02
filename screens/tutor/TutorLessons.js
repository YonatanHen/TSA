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
        console.log(lessons)
    }, [setLessons])

    const dateFormatter = (dateObj) => {
        //Formats the date to the pattern of yyyy-mm-dd
        return dateObj.toISOString().split('T')[0]
    }

    const renderDay = (lesson) => {
        return (
            <View style={styles.cardContainer}>
                <TouchableOpacity onPress={() => console.log('Add delete lesson option here')}>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{lesson.time}</Text>
                            {lesson.student ? (
                                <View>
                                    <Text>student: {lesson.student}</Text>
                                    <Text>course: {lesson.course}</Text>
                                </View>
                            ) : (
                                <Text style={{ color: 'deepskyblue', fontWeight: 'bold' }}>Available!</Text>
                            )}

                        </Card.Content>
                    </Card>
                </TouchableOpacity>
            </View>
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
                    ...lessons,
                    '2021-11-01': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
                }}
                selected={dateFormatter(new Date())}
                showClosingKnob={true}
                renderItem={renderDay}
                onDayPress={(day) => {
                    setDate(dateFormatter(new Date(day.dateString)))
                }}
            />
            <View style={{ alignItems: 'center' }}>
                <View style={styles.datePickerButtonContainer}>
                    <Button color={'deepskyblue'} title="Add" onPress={showDatePicker} />
                </View>
            </View>
            <NewLessonPicker
                setDatePickerVisibility={setDatePickerVisibility}
                isDatePickerVisible={isDatePickerVisible}
                lessons={lessons}
                setLessons={setLessons}
                date={date}
            />
        </>
    )
}



const styles = StyleSheet.create({
    cardContainer: {
        paddingHorizontal: 10
    },
    datePickerButtonContainer: {
        margin: 2,
        padding: 5,
        width: '50%',
    },
    card: {
        marginVertical: 10,
    }
})

export default TutorLessons