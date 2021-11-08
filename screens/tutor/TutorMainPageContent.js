import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'

import { useSelector } from 'react-redux';

const TutorMain = props => {
    const loggedInUser = useSelector(state => state.data)

    return (
        <View>
            {loggedInUser.lessons && loggedInUser.lessons !== {} ? (
                <ScrollView>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.title}>Upcoming Lessons</Text>
                    </View>
                    {/* {Object.entries(loggedInUser.lessons).map(date => {
                        return Object.entries(date[1]).map(lesson => {
                            return (
                                <View key={`${date[0]} - ${lesson[0]}`} style={{ alignItems: 'center', marginTop: 5 }}>
                                    <Card style={{ backgroundColor: 'honeydew' , elevation: 8 }}>
                                        <Card.Content style={{ alignItems: 'center' }}>
                                            <Title style={{ color: 'deepskyblue' }}>{date[0]} at {lesson[0]}</Title>
                                            <Paragraph style={{ fontWeight: '600'}}>
                                                {lesson[1].tutor} - {lesson[1].course}
                                            </Paragraph>
                                        </Card.Content>
                                    </Card>
                                </View>
                            )
                        })
                    })} */}
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
    }
})

export default TutorMain