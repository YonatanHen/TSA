import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'
import { useDispatch } from 'react-redux';
import { colors } from '../../constants/colors';

import { cancelLessonStudent } from '../../store/actions/data/lessonsData'

const StudentMain = props => {
    const { loggedInUser, tutors, lessons, navigation } = props

    const today = new Date()

    const upcomingLessons = (lessons ? Object.entries(lessons).map(tutorLessons => {
        return (
            Object.entries(tutorLessons[1]).map(date => {
                return (
                    date[1].filter(lesson => lesson.studentId === loggedInUser.uid &&
                        today <= new Date(`${date[0]}T${lesson.time.split(' ')[0]}`)
                        ))
            }))
    }).flat().flat() : [])

    const dispatch = useDispatch()

    const cancelLessonHandler = (tutorId, date, time) => {
        Alert.alert('Are you sure?', 'Do you want to cancel this lesson?', [
            {
                text: 'Yes',
                onPress: () => dispatch(cancelLessonStudent(tutorId, date, time)),
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
            {upcomingLessons.length > 0 ? (
                <ScrollView style={{marginTop: 5}}>
                    {Object.entries(lessons).map(tutorLessons => {
                        return (
                            Object.entries(tutorLessons[1]).map(date => {
                                return (
                                    date[1].filter(lesson => lesson.studentId === loggedInUser.uid
                                        &&
                                        today <= new Date(`${date[0]}T${lesson.time.split(' ')[0]}`)
                                    )
                                        .map((lesson, index) => {
                                            return (
                                                <Card style={styles.card} key={index} >
                                                    <Card.Content style={{ alignItems: 'center' }}>
                                                        <Title style={{ color: colors.primary }}>{date[0]} at {lesson.time}</Title>
                                                        <Paragraph style={{ fontWeight: '600', textAlign: 'center' }}>
                                                            {tutors[tutorLessons[0]].firstName} {tutors[tutorLessons[0]].lastName}- {lesson.course}
                                                            {lesson.approved && <Text style={{ color: 'green' }}>{'\n'}Lesson Approved</Text>}
                                                        </Paragraph>
                                                        <View style={styles.icons}>
                                                            <Ionicons
                                                                name="person"
                                                                size={25}
                                                                color="slategray"
                                                                onPress={() => {
                                                                    navigation.navigate("Main", { screen: 'User Profile', params: { user: tutors[tutorLessons[0]] } })
                                                                }}
                                                            />
                                                            <Ionicons
                                                                name="close"
                                                                size={25}
                                                                color="red"
                                                                onPress={() => cancelLessonHandler(tutorLessons[0], date[0], lesson.time)}
                                                            />
                                                        </View>
                                                    </Card.Content>
                                                </Card>
                                            )
                                        })
                                )
                            })
                        )
                    })}
                </ScrollView>
            ) : (
                <View style={styles.noLessonsContainer}>
                    <Text style={styles.title}>No lessons has been planned.</Text>
                </View>
            )
            }
        </View >
    )
}


const styles = StyleSheet.create({
    title: {
        color: colors.primary,
        fontSize: 26,
        fontWeight: 'bold'
    },
    card: {
        backgroundColor: 'honeydew',
        elevation: 1, 
        marginBottom: 10, 
        borderRadius: 30
    },
    noLessonsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icons: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10
    }
})

export default StudentMain
