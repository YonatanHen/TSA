import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { Card } from 'react-native-paper'
import 'intl';
import 'intl/locale-data/jsonp/en';
import { useDispatch, useSelector } from 'react-redux';

import CoursePicker from '../../components/pickers/coursePicker'
import { scheduleLesson } from '../../store/actions/data/lessonsData'


const ScheduleMeeting = props => {
    const user = useSelector(state => state.data)

    const tutorData = props.route.params.user
    const LessonsObject = useSelector(state => state.lessons.lessons)

    const [lessons, setLessons] = useState(LessonsObject[tutorData.institute][tutorData.uid] ? LessonsObject[tutorData.institute][tutorData.uid] : {})
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
                            studentId: user.uid,
                            course: selectedCourse,
                            approved: false
                        }
                    )
                } else return item
            })
        }

        try {
            await dispatch(scheduleLesson(updatedLessons, tutorData))
            await setLessons(updatedLessons)
        } catch (err) {
            Alert.alert('An Error occured!', err, [{ text: 'Okay' }])
        }
    }

    const onTimeClickHandler = async (lesson) => {
        if (!lessonDate) {
            Alert.alert('Select a Date from the calendar first!')
        } else if (lessons[lessonDate].find(lessonObj => lessonObj.time === lesson.time) == undefined) {
            Alert.alert('The selected lesson is not match to the selected date')
        } else {
            setDialogVisibility(true)
            await setLessonTime(lesson.time)
        }
    }


    useEffect(() => {
    }, [setLessons, scheduleLesson, scheduleLessonHandler])


    const renderDay = (lesson) => {
        return (
            <View style={styles.cardContainer}>
                <TouchableOpacity onPress={() => {
                    if (!lesson.studentId) onTimeClickHandler(lesson)
                    else Alert.alert('Alert', "You can't schedule taken lesson.", [{ text: 'Okay' }])
                }}>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{lesson.time}</Text>
                            {lesson.studentId ? (
                                <View>
                                    <Text style={{ fontWeight: 'bold' }}>Busy</Text>
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
                showClosingKnob={true}
                renderItem={renderDay}
                onDayPress={async (day) => { setLessonDate(day.dateString) }}
            />
            <CoursePicker
                visible={isDialogVisible}
                date={lessonDate}
                time={lessonTime}
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