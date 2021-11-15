import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { Card } from 'react-native-paper'
import 'intl';
import 'intl/locale-data/jsonp/en';
import { useDispatch, useSelector } from 'react-redux';

import CoursePicker from '../../components/pickers/coursePicker'
import { scheduleLesson } from '../../store/actions/data/lessonsData'
import {pushToQueue, popFromQueue} from '../../store/actions/data/queueing';


const ScheduleMeeting = props => {
    const user = useSelector(state => state.data)
    const tutorData = useSelector(state => state.representationLists.usersList.tutors).find(tutor => tutor[1].uid === props.route.params.user.uid)[1]
    const LessonsObject = useSelector(state => state.lessons.lessons)
    console.log(tutorData)
    const [lessons, setLessons] = useState(LessonsObject[tutorData.institute][tutorData.uid] ? LessonsObject[tutorData.institute][tutorData.uid] : {})
    const [lessonsWithDates, setLessonsWithDates] = useState()
    const [isDialogVisible, setDialogVisibility] = useState(false)
    const [lessonDate, setLessonDate] = useState()
    const [lessonTime, setLessonTime] = useState()
    const [selectedCourse, setSelectedCourse] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const scheduleLessonHandler = async () => {
        const lessonDay = lessons[lessonDate]
        const updatedLessons = {
            ...lessons,
            [lessonDate]: await lessonDay.map(item => {
                if (item.time === lessonTime) {
                    return (
                        {
                            time: item.time,
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
        await setLessonDate(lesson.date)
        await setLessonTime(lesson.time)
        setDialogVisibility(true)
    }

    const noPlaceClickHandler = () => {
        Alert.alert("Don't Worry!",
            'We can let you know when a new lesson with this tutor will be available by pressing on the OK button.',
            [{
                text: 'OK', onPress: async () => {
                    setIsLoading(true)
                    await dispatch(pushToQueue(tutorData, user.uid))
                    setIsLoading(false)
                }
            },
            { text: "I'm not interested" }])
    }

    const popFromQueueHandler = async () => {
        setIsLoading(true)
        await dispatch(popFromQueue(tutorData, user.uid))
        setIsLoading(false)
    }

    useEffect(() => {
        //Add date keys as fields to all of the objects.
        if (lessons !== {}) {
            var tempLessons = { ...lessons }
            for (const [key, value] of Object.entries(tempLessons)) {
                tempLessons[key] = tempLessons[key].map(lesson => { return ({ ...lesson, date: key }) })
            }
            setLessonsWithDates(tempLessons)
        }
    }, [])


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
                items={lessonsWithDates}
                showClosingKnob={true}
                renderItem={renderDay}
            />
            <View style={{ alignItems: 'center', marginBottom: 2 }}>
                {!isLoading ? (tutorData['studentsQueue'] && tutorData['studentsQueue'].includes(user.uid) ? (
                    <TouchableOpacity onPress={popFromQueueHandler}>
                        <Text style={{ color: 'dodgerblue', borderBottomWidth: 3, borderBottomColor: 'dodgerblue', fontSize: 16 }}>
                            Quit the queue
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={noPlaceClickHandler}>
                        <Text style={{ color: 'dodgerblue', borderBottomWidth: 3, borderBottomColor: 'dodgerblue', fontSize: 16 }}>
                            No Place? Enter the queue!
                        </Text>
                    </TouchableOpacity>
                )) : (
                    <ActivityIndicator size='small' color='dodgerblue' />
                )}

            </View>
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