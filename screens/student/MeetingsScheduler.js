import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { Card } from 'react-native-paper'
import 'intl';
import 'intl/locale-data/jsonp/en';
import { useDispatch, useSelector } from 'react-redux';

import CoursePicker from '../../components/pickers/coursePicker'
import { scheduleLesson } from '../../store/actions/data/tutorData'


const ScheduleMeeting = props => {
    const user = useSelector(state => state.data)

    const tutorData = props.route.params.user

    const [lessons, setLessons] = useState(tutorData.lessons ? tutorData.lessons : {})
    const [isDialogVisible, setDialogVisibility] = useState(false)
    const [lessonDate, setLessonDate] = useState()
    const [lessonTime, setLessonTime] = useState()
    const [selectedCourse, setSelectedCourse] = useState()

    const dispatch = useDispatch()

    const scheduleLessonHandler = async () => {
        const lessonDay = lessons[lessonDate]
        const updatedLessons = {
            ...lessons,
            [lessonDate]: await lessonDay.map(item => {
                if (item.time === lessonTime) {
                    return (
                        {
                            ...item,
                            studentUid: user.uid,
                            student: `${user.firstName} ${user.lastName}`,
                            course: selectedCourse
                        }
                    )
                } else return item
            })
        }

        try {
            await dispatch(scheduleLesson(updatedLessons, tutorData, lessonDate, lessonTime, selectedCourse))
            await setLessons(updatedLessons)
        } catch (err) {
            Alert.alert('An Error occured!', err, [{ text: 'Okay' }])
        }
    }

    const onTimeClickHandler = async (lesson) => {
        if (lessonDate) {
            setDialogVisibility(true)
            await setLessonTime(lesson.time)
        } else Alert.alert('Select a Date from the calendar first!')
    }


    useEffect(() => {
        // console.log(lessonDate)
    }, [setLessons, scheduleLesson, scheduleLessonHandler])


    const renderDay = (lesson) => {
        return (
            <View style={styles.cardContainer}>
                <TouchableOpacity onPress={() => {
                    if (!lesson.student) onTimeClickHandler(lesson)
                    else Alert.alert('Alert', "You can't schedule taken lesson.", [{ text: 'Okay' }])
                }}>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{lesson.time}</Text>
                            {lesson.student ? (
                                <View>
                                    <Text style={{ fontWeight: 'bold' }}>Taken</Text>
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


    return (
        <>
            <Agenda
                items={lessons}
                // selected={dateFormatter(new Date())}
                showClosingKnob={true}
                renderItem={renderDay}
                onDayPress={async (day) => { setLessonDate(day.dateString) }}
            />
            <CoursePicker
                visible={isDialogVisible}
                setDialogVisibility={setDialogVisibility}
                coursesList={tutorData.courses}
                scheduleLessonHandler={scheduleLessonHandler}
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
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
        padding: 5
    },
    card: {
        marginVertical: 10
    }
})

export default ScheduleMeeting