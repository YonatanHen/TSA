import React from 'react'
import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import { cancelLesson, approveLesson } from '../../store/actions/data/lessonsData'
import { colors } from '../../constants/colors';


const TutorMain = props => {
    const { loggedInUser, students, lessons, navigation } = props

    const tutorLessons = lessons ? lessons[loggedInUser.uid] : undefined

    const isAScheduledLesson = tutorLessons && Object.entries(tutorLessons).find(lesson => lesson[1][0].studentId) //Respectively to database arrangement

    const dispatch = useDispatch()

    const today = new Date()

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

    const approveLessonHandler = (date, time, flag) => {
        Alert.alert('Are you sure?', `Do you want to ${flag ? 'dis' : ''}approve this lesson?`, [
            {
                text: 'Yes',
                onPress: () => dispatch(approveLesson(loggedInUser.uid, date, time)),
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
            {!!isAScheduledLesson ? (
                <ScrollView>
                    <View style={{ alignItems: 'center', marginBottom: 5 }}>
                        <Text style={styles.title}>Recent & Upcoming Lessons:</Text>
                    </View>
                    {Object.entries(tutorLessons).map(date => {
                        return date[1].filter(lesson => lesson && lesson.studentId &&
                            //Filtering upcoming lessons + lessosns occured in the last 10 days.
                            new Date(new Date(`${date[0]}T${lesson.time.split(' ')[0]}`).setDate(new Date(date[0]).getDate() + 10)) >= today
                        )
                            .map((lesson, index) => {
                                return (
                                    <Card style={{ backgroundColor: 'honeydew', elevation: 8, marginBottom: 10 }} key={index}>
                                        <Card.Content style={{ alignItems: 'center' }}>
                                            <Title style={{ color: colors.primary }}>{date[0]} at {lesson.time}</Title>
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
                                                    color={lesson.approved ? "darkgreen" : "lightgrey"}
                                                    onPress={() => approveLessonHandler(date[0], lesson.time, lesson.approved)}
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