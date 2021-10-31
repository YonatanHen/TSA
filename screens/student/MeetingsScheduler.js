import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { Card } from 'react-native-paper'
import 'intl';
import 'intl/locale-data/jsonp/en';
import { useSelector } from 'react-redux';


const ScheduleMeeting = props => {
    const user = useSelector(state => state.data)

    const [lessons, setLessons] = useState(props.route.params.lessons ? props.route.params.lessons : {})


    useEffect(() => {
        console.log(lessons)
    },[setLessons])


    const renderDay = (lesson) => {
        return (
            <TouchableOpacity onPress={() => {}}>
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