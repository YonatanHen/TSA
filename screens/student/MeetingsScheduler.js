import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { Card } from 'react-native-paper'
import 'intl';
import 'intl/locale-data/jsonp/en';
import { useDispatch, useSelector } from 'react-redux';

import CoursePicker from '../../components/pickers/coursePicker'


const ScheduleMeeting = props => {
    const user = useSelector(state => state.data)

    const tutorData = props.route.params.user

    const [lessons, setLessons] = useState(tutorData.lessons ? tutorData.lessons : {})
    const [isDialogVisible, setDialogVisibility] = useState(false)

    // const dispatch = useDispatch()

    // const scheduleLesson = async () => {
    //     try {

    //         // await dispatch(scheduleLesson(tutorData, `${user.firstName} ${user.lastName}`, selectedCourse, lessonDate, lessonTime))
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }


    useEffect(() => {
        console.log(lessons)
    },[setLessons])


    const renderDay = (lesson) => {
        return (
            <TouchableOpacity onPress={() => setDialogVisibility(true)}>
                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={{ fontWeight: 'bold' }}>{lesson.time}</Text>
                        {lesson.student ? (
                            <View>
                                <Text>{user.firstName} {user.lastName}</Text>
                                <Text>Add here lesson topic details</Text>
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
            />
            <CoursePicker 
                visible={isDialogVisible}
                setDialogVisibility={setDialogVisibility}
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