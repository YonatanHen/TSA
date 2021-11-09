import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'

const StudentMain = props => {
    const { loggedInUser, users, navigation } = props
    const tutors = Object.fromEntries(users.tutors)
    return (
        <View>
            {loggedInUser.lessons && loggedInUser.lessons !== {} ? (
                <ScrollView>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.title}>Upcoming Lessons</Text>
                    </View>
                    {Object.entries(loggedInUser.lessons).map(date => {
                        return Object.entries(date[1]).map(lesson => {
                            return (
                                <View key={`${date[0]} - ${lesson[0]}`} style={{ alignItems: 'center', marginTop: 5 }}>
                                    <Card style={{ backgroundColor: 'honeydew', elevation: 8 }}>
                                        <Card.Content style={{ alignItems: 'center' }}>
                                            <Title style={{ color: 'deepskyblue' }}>{date[0]} at {lesson[0]}</Title>
                                            <Paragraph style={{ fontWeight: '600' }}>
                                                {tutors[lesson[1].tutorId].firstName} {tutors[lesson[1].tutorId].lastName}- {lesson[1].course}
                                            </Paragraph>
                                            <View style={styles.icons}>
                                                <Ionicons
                                                    name="person"
                                                    size={25}
                                                    color="slategray"
                                                    onPress={() => {
                                                        navigation.navigate("Main", { screen: 'User Profile', params: { user: tutors[lesson[1].tutorId] } })
                                                    }}
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

export default StudentMain