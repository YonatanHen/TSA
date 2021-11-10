import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'
import { useDispatch } from 'react-redux';

import { cancelLesson } from '../../store/actions/data/lessonsData'

const StudentMain = props => {
    const { loggedInUser, tutors, lessons, navigation } = props

    const dispatch = useDispatch()

    const cancelLessonHandler = (tutorId, date, time) => {
        Alert.alert('Are you sure?', 'Do you want to cancel this lesson?', [
            {
                text: 'Yes',
                onPress: () => dispatch(cancelLesson(tutorId, date, time)),
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
            {lessons !== {} ? (
                <ScrollView>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.title}>Upcoming Lessons</Text>
                    </View>
                    {Object.entries(lessons).map(tutorLessons => {
                        return (
                            Object.entries(tutorLessons[1]).map(date => {
                                return (
                                    date[1].filter(lesson => lesson.studentId === loggedInUser.uid)
                                        .map((lesson, index) => {
                                            return (
                                                <Card style={{ backgroundColor: 'honeydew', elevation: 8, marginBottom: 10 }} key={index} >
                                                    <Card.Content style={{ alignItems: 'center' }}>
                                                        <Title style={{ color: 'deepskyblue' }}>{date[0]} at {lesson.time}</Title>
                                                        <Paragraph style={{ fontWeight: '600' }}>
                                                            {tutors[tutorLessons[0]].firstName} {tutors[tutorLessons[0]].lastName}- {lesson.course}
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
                <Text style={styles.title}>No lessons has been planned.</Text>
            )
            }
        </View >
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

export default StudentMain

// return (
//     <View key={`${date[0]} - ${lesson[0]}`} style={{ alignItems: 'center', marginTop: 5 }}>
//         <Card style={{ backgroundColor: 'honeydew', elevation: 8 }}>
//             <Card.Content style={{ alignItems: 'center' }}>
//                 <Title style={{ color: 'deepskyblue' }}>{date[0]} at {lesson[0]}</Title>
//                 <Paragraph style={{ fontWeight: '600' }}>
//                     {tutors[lesson[1].tutorId].firstName} {tutors[lesson[1].tutorId].lastName}- {lesson[1].course}
//                 </Paragraph>
//                 <View style={styles.icons}>
//                     <Ionicons
//                         name="person"
//                         size={25}
//                         color="slategray"
//                         onPress={() => {
//                             navigation.navigate("Main", { screen: 'User Profile', params: { user: tutors[lesson[1].tutorId] } })
//                         }}
//                     />
//                     <Ionicons
//                         name="close"
//                         size={25}
//                         color="red"
//                     // onPress={() => openUrl('whatsapp')}
//                     />
//                 </View>
//             </Card.Content>
//         </Card>
//     </View>
// )