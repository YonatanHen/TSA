import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import { cancelLesson, approveLesson } from '../../store/actions/data/lessonsData'
import { colors } from '../../constants/colors';


const TutorMain = props => {
    const { loggedInUser, students, lessons, navigation } = props
    
    const tutorLessons = lessons ? lessons[loggedInUser.uid] : undefined
    const today = new Date()

    const dispatch = useDispatch()

    const cancelLessonHandler = (student,date, time) => {
        Alert.alert('Are you sure?', 'Do you want to cancel this lesson?', [
            {
                text: 'Yes',
                onPress: () => dispatch(cancelLesson(student, date, time)),
                style: 'default'
            },
            {
                text: 'No',
                style: 'cancel'
            }
        ])
    }

    const approveLessonHandler = (student, date, time, flag) => {
        Alert.alert('Are you sure?', `Do you want to ${flag ? 'dis' : ''}approve this lesson?`, [
            {
                text: 'Yes',
                onPress: () => dispatch(approveLesson(student, date, time)),
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
            {tutorLessons &&
            (Object.entries(tutorLessons).filter(date => {
                return date[1].filter(lesson => lesson && lesson.studentId &&
                    new Date(new Date(`${date[0]}T${lesson.time.split(' ')[0]}`).setDate(new Date(date[0]).getDate() + 10)) >= today
                ).length > 0}).length) &&
            Object.entries(tutorLessons).find(date => date[1].some(lesson => lesson.studentId)) ? (
                <ScrollView>
                    <View style={{ alignItems: 'center', marginBottom: 5 }}>
                    </View>
                    {Object.entries(tutorLessons).map(date => {
                        return date[1].filter(lesson => lesson && lesson.studentId &&
                            //Filtering upcoming lessons + lessosns occured in the last 10 days.
                            new Date(new Date(`${date[0]}T${lesson.time.split(' ')[0]}`).setDate(new Date(date[0]).getDate() + 10)) >= today
                        )
                            .map((lesson, index) => {
                                return (

                                    <Card style={styles.card} key={index}>
                                        <Card.Content style={{ alignItems: 'center' }}>
                                            <Title style={{ color: colors.primary }}>{date[0]} at {lesson.time}</Title>
                                            <Paragraph style={{ fontWeight: '600' }}>
                                                {students[lesson.studentId] ?
                                                    `${students[lesson.studentId].firstName} ${students[lesson.studentId].lastName}- ${lesson.course}` :
                                                    'The student delete his account\nContact your institute for more info.'}
                                            </Paragraph>
                                            <View style={styles.icons}>
                                                {students[lesson.studentId] && <Ionicons
                                                    name="person"
                                                    size={25}
                                                    color="slategray"
                                                    onPress={() => {
                                                        navigation.navigate("Main", { screen: 'User Profile', params: { user: students[lesson.studentId] } })
                                                    }}
                                                />}
                                                {today < new Date(`${date[0]}T${lesson.time.split(' ')[0]}`)
                                                    && <>
                                                        {students[lesson.studentId]
                                                            && <Ionicons
                                                                name="checkmark"
                                                                size={25}
                                                                color={lesson.approved ? "darkgreen" : "lightgrey"}
                                                                onPress={() => approveLessonHandler(students[lesson.studentId], date[0], lesson.time, lesson.approved)}
                                                            />}
                                                        <Ionicons
                                                            name="close"
                                                            size={25}
                                                            color="red"
                                                            onPress={() => cancelLessonHandler(students[lesson.studentId], date[0], lesson.time)}
                                                        />
                                                    </>
                                                }
                                            </View>
                                        </Card.Content>
                                    </Card>
                                )
                            })
                    })}
                </ScrollView>
            ) : (
                <View style={styles.noLessonsContainer}>
                    <Text style={styles.title}>No lessons has been planned.</Text>
                </View>
            )
            }
        </View>
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

export default TutorMain