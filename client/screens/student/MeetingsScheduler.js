//This component belongs to Admins as well

import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { Card } from 'react-native-paper'
import 'intl';
import 'intl/locale-data/jsonp/en';
import { useDispatch, useSelector } from 'react-redux';

import CoursePicker from '../../components/pickers/coursePicker'
import { scheduleLesson } from '../../store/actions/data/lessonsData'
import { pushToQueue, popFromQueue } from '../../store/actions/data/queueing';
import readUserData from '../../utilities/readWriteUserData/readUserData';

const ScheduleMeeting = props => {
    const user = useSelector(state => state.data)
    const tutorData = useSelector(state => state.representationLists.usersList.tutors).find(tutor => tutor[1].uid === props.route.params.user.uid)[1]
    const LessonsObject = useSelector(state => state.lessons.lessons)

    const [lessons, setLessons] = useState(LessonsObject[tutorData.institute] && LessonsObject[tutorData.institute][tutorData.uid] ? LessonsObject[tutorData.institute][tutorData.uid] : {})
    const [lessonsWithDates, setLessonsWithDates] = useState()
    const [isDialogVisible, setDialogVisibility] = useState(false)
    const [lessonDate, setLessonDate] = useState()
    const [lessonTime, setLessonTime] = useState()
    const [selectedCourse, setSelectedCourse] = useState()
    const [isQueueLoading, setIsQueueLoading] = useState(false)
    const [isLessonLoading, setIsLessonLoading] = useState(false)

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
            setIsLessonLoading(true)
            await dispatch(scheduleLesson(updatedLessons, tutorData))
            await setLessons(updatedLessons)
            setIsLessonLoading(false)
            Alert.alert('Lesson has been added successfully!', 'check the home screen to see lesson details.')
            props.navigation.goBack()
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
                    setIsQueueLoading(true)
                    await dispatch(pushToQueue(tutorData, user.uid, user.notificationsToken))
                    setIsQueueLoading(false)
                }
            },
            { text: "I'm not interested" }])
    }

    const popFromQueueHandler = async () => {
        setIsQueueLoading(true)
        await dispatch(popFromQueue(tutorData, user.uid))
        setIsQueueLoading(false)
    }

    const setLessonsWithDatesHandler = () => {
        if (lessons !== {}) {
            var tempLessons = { ...lessons }
            for (const [key, value] of Object.entries(tempLessons)) {
                tempLessons[key] = tempLessons[key].map(lesson => { return ({ ...lesson, date: key }) })
            }
            setLessonsWithDates(tempLessons)
        }
    }

    useEffect(() => {
        setLessonsWithDatesHandler()
    }, [LessonsObject, setSelectedCourse, setLessons, renderDay])



//new Date() < new Date(lesson.date)

    const renderDay = (lesson) => {
        return (
            <View style={styles.cardContainer}>
                <TouchableOpacity onPress={async () => {
                    if (user.role !== 'admin') {
                        if (new Date() < new Date(lesson.time)) Alert.alert('Date has been passed', "You can't shcedule this lesson.", [{ text: 'Okay' }])
                        else if (!lesson.studentId) onTimeClickHandler(lesson)
                        else Alert.alert('Alert', "You can't schedule taken lesson.", [{ text: 'Okay' }])
                    } else if (user.role === 'admin' && lesson.studentId) {
                        console.log(props.navigation)
                        const student =await readUserData(lesson.studentId)
                        props.navigation.navigate("User Profile", { user: student })
                    }
                }}>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{lesson.time}</Text>
                            {lesson.studentId ? (
                                <View>
                                    <Text style={{ color: 'red', fontWeight: 'bold', marginLeft: '0.5%' }}>
                                        {user.role === 'admin' ? `Registered student: ${lesson.studentId}` : 'Busy'}
                                    </Text>
                                </View>
                            ) : (
                                new Date() <= new Date(lesson.date) ? (
                                    <Text style={{ color: 'green', fontWeight: 'bold', marginLeft: '0.5%' }}>
                                        Available!
                                    </Text>
                                ) : (
                                    <Text style={{ color: 'grey', fontWeight: 'bold', marginLeft: '0.5%' }}>
                                        Date passed
                                    </Text>
                                )
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
                pastScrollRange={24}
                futureScrollRange={6}
                refreshing={isLessonLoading}
                onRefresh={() => console.log('refreshing...')}
            // refreshControl={null}
            />
            {user.role !== 'admin' &&
                <View style={{ alignItems: 'center', marginBottom: 2, backgroundColor: '#f5f5f5' }}>
                    {!isQueueLoading ? (tutorData['studentsQueue'] && tutorData['studentsQueue'].filter(u => user.uid === u.id).length > 0 ? (
                        <TouchableOpacity onPress={popFromQueueHandler}>
                            <Text style={{ color: 'dodgerblue', borderBottomWidth: 3, borderBottomColor: 'dodgerblue', fontSize: 16 }}>
                                Click here to quit the queue
                                </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={noPlaceClickHandler}>
                            <Text style={{ color: 'dodgerblue', borderBottomWidth: 3, borderBottomColor: 'dodgerblue', fontSize: 16 }}>
                                No Place? Click here to enter the queue!
                                </Text>
                        </TouchableOpacity>
                    )) : (
                        <ActivityIndicator size='small' color='dodgerblue' />
                    )}

                </View>
            }

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
        marginVertical: 10,
        borderWidth: 2,
        borderColor: 'grey'
    }
})

export default ScheduleMeeting