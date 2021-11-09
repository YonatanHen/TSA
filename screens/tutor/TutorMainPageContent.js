import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';


const TutorMain = props => {
    const { loggedInUser, users, navigation } = props
    const students = Object.fromEntries(users.students)
    return (
        <View>
            {loggedInUser.lessons && loggedInUser.lessons !== {} ? (
                <ScrollView>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.title}>Upcoming Lessons</Text>
                    </View>
                    {Object.entries(loggedInUser.lessons).map(date => {
                        console.log(date)
                        return date[1].filter(lesson => lesson.studentId !== undefined).map(lesson => {
                            return (
                                <View key={`${date[0]} - ${lesson.time}`} style={{ alignItems: 'center', marginTop: 5 }}>
                                    <Card style={{ backgroundColor: 'honeydew', elevation: 8 }}>
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
                                                // onPress={() => openUrl('whatsapp')}
                                                />
                                            </View>
                                        </Card.Content>
                                    </Card>
                                </View>
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