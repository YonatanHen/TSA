import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { Card } from 'react-native-paper'
import 'intl';
import 'intl/locale-data/jsonp/en';

import NewLessonPicker from '../../components/pickers/newLessonPicker'
import { useSelector } from 'react-redux';
import { colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import { deleteLesson } from '../../store/actions/data/lessonsData'


const TutorLessons = props => {
    const user = useSelector(state => state.data)
    const lessons = useSelector(state => state.lessons.lessons)
    const users = useSelector(state => state.representationLists.usersList)
    const [tutorLessons, setLessons] = useState(lessons && lessons[user.institute] && lessons[user.institute][user.uid] ? lessons[user.institute][user.uid] : {})
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(null)

    const students = Object.fromEntries(users.students)
    const dispatch = useDispatch()

    useEffect(() => {
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
                            <View>
                                <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Available!</Text>
                                {(new Date(lesson.date).getTime() === new Date(date).getTime()) && <TouchableOpacity onPress={() => {
                                    try {
                                        console.log(lessons[user.institute][user.uid][date])
                                        dispatch(deleteLesson(user.uid, date, lesson.time))
                                        let newLessons = { ...lessons[user.institute][user.uid], [date]: lessons[user.institute][user.uid][date].filter(l => (l.time !== lesson.time && new Date(lesson.date).getTime() === new Date(date).getTime())) }
                                        if (lessons[user.institute][user.uid][date].length == 0) delete lessons[user.institute][user.uid][date]
                                        setLessons(newLessons)
                                    } catch (err) {
                                        console.log(err)
                                        Alert.alert('Error!', 'make sure that you select the correct date for the lesson you are trying to delete.')
                                    }
                                }}>
                                    <Text style={{ color: 'red', letterSpacing: 0.5, textDecorationLine: 'underline' }} >Delete</Text>
                                </TouchableOpacity>}
                            </View>
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
                items={tutorLessons}
                showClosingKnob={true}
                renderItem={renderDay}
                onDayPress={(day) => {
                    setDate(dateFormatter(new Date(day.dateString)))
                }}
            />
            <View style={{ alignItems: 'center' }}>
                <View style={styles.datePickerButtonContainer}>
                    <Button color={colors.primary} title="Add" onPress={showDatePicker} />
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