import React from 'react'
import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import { cancelLesson } from '../../store/actions/data/lessonsData'


const TutorMain = props => {
    const { loggedInUser, students, lessons, navigation } = props

    const tutorLessons = lessons ? lessons[loggedInUser.uid] : {}

    const dispatch = useDispatch()

    const cancelLessonHandler = (date, time) => {
        Alert.alert('Are you sure?', 'Do you want to cancel this lesson?', [
            {
                text: 'Yes',
                onPress: () => dispatch(cancelLesson(loggedInUser.uid, date, time)),
                style: 'default'
            },
            {
                text: 'No',
                style: 'cancel'
            }
        ])
    }

    return (
        <View>
            {tutorLessons !== {} ? (
                <ScrollView>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.title}>Upcoming Lessons</Text>
                    </View>
                    {Object.entries(tutorLessons).map(date => {
                        return date[1].filter(lesson => lesson.studentId !== undefined)
                            .map((lesson, index) => {
                                return (
                                    <Card style={{ backgroundColor: 'honeydew', elevation: 8, marginBottom: 10 }} key={index}>
                                        <Card.Content style={{ alignItems: 'center' }}>
                                            <Title style={{ color: 'deepskyblue' }}>{date[0]} at {lesson.time}</Title>
                                            <Paragraph style={{ fontWeight: '600' }}>
                                                {students[lesson.studentId].firstName} {students[lesson.studentId].lastName}- {lesson.course}
                                            </Paragraph>
                                            <View style={styles.icons}>
                                                <Ionicons
                                                    name="person"
                                                    size={25}
                                                    color="slategray"
                                                    onPress={() => {
                                                        navigation.navigate("Main", { screen: 'User Profile', params: { user: students[lesson.studentId] } })
                                                    }}
                                                />
                                                <Ionicons
                                                    name="checkmark"
                                                    size={25}
                                                    color="green"
                                                // onPress={() => openUrl('whatsapp')}
                                                />
                                                <Ionicons
                                                    name="close"
                                                    size={25}
                                                    color="red"
                                                    onPress={() => cancelLessonHandler(date[0], lesson.time)}
                                                />
                                            </View>
                                        </Card.Content>
                                    </Card>
                                )
                            })
                    })}
                </ScrollView>
            ) : (
                <Text style={styles.title}>No lessons has been planned.</Text>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    title: {
        color: 'dodgerblue',
        fontSize: 26,
        fontWeight: 'bold'
    },
    icons: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10
    }
})

export default TutorMain