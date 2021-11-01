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
    const [lessonDate, setLessonDate] = useState({
        day: null,
        time: null
    })
    const [selectedCourse, setSelectedCourse] = useState()

    const dispatch = useDispatch()

    const scheduleLessonHandler = async () => {
        const updatedLessons = {
            ...lessons,
            [lessonDate.day]: await lessons[lessonDate.day].map(item => {
                if (item.time === lessonDate.time) {
                    return (
                        lessonDate.time = {
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
            await dispatch(scheduleLesson(updatedLessons, tutorData))
            await setLessons(updatedLessons)
        } catch (err) {
            Alert.alert('An Error occured!', err, [{ text: 'Okay' }])
        }
    }

    const onTimeClickHandler = (lesson) => {
        setDialogVisibility(true)
        setLessonDate({ ...lessonDate, time: lesson.time })
    }


    useEffect(() => {
        // console.log(lessonDate)
    }, [setLessons, scheduleLesson, scheduleLessonHandler])


    const renderDay = (lesson) => {
        console.log(lesson)
        return (
            <TouchableOpacity onPress={() => onTimeClickHandler(lesson)}>
                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={{ fontWeight: 'bold' }}>{lesson.time}</Text>
                        {lesson.student !== undefined ? (
                            <View>
                                <Text>{lesson.student}</Text>
                                <Text>{lesson.course}</Text>
                            </View>
                        ) : (
                            <Text style={{ color: 'deepskyblue' }}>Available!</Text>
                        )}

                    </Card.Content>
                </Card>
            </TouchableOpacity>
        )
    }


    return (
        <>
            <Agenda
                items={lessons}
                // selected={dateFormatter(new Date())}
                showClosingKnob={true}
                renderItem={renderDay}
                onDayPress={(day) => { setLessonDate({ ...lessonDate, day: day.dateString }) }}
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
    datePickerButtonContainer: {
        margin: 2,
        padding: 5
    },
    card: {
        marginVertical: 10,
    }
})

export default ScheduleMeeting