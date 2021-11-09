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
    const lessons = useSelector(state => state.lessons.lessons)
    const users = useSelector(state => state.representationLists.usersList)
    const [tutorLessons, setLessons] = useState(lessons[user.institute][user.uid] ? lessons[user.institute][user.uid] : {})
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(null)

    const students = Object.fromEntries(users.students)

    useEffect(() => {
        console.log(tutorLessons)
    }, [setLessons])

    const dateFormatter = (dateObj) => {
        //Formats the date to the pattern of yyyy-mm-dd
        return dateObj.toISOString().split('T')[0]
    }

    const renderDay = (lesson) => {
        return (
            <View style={styles.cardContainer}>
                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{lesson.time}</Text>
                        {lesson.studentId ? (
                            <View>
                                <Text>student: {students[lesson.studentId].firstName} {students[lesson.studentId].lastName}</Text>
                                <Text>course: {lesson.course}</Text>
                            </View>
                        ) : (
                            <Text style={{ color: 'deepskyblue', fontWeight: 'bold' }}>Available!</Text>
                        )}

                    </Card.Content>
                </Card>
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
                    ...tutorLessons,
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
                lessons={tutorLessons}
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