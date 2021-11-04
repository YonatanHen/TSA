import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { DrawerActions } from '@react-navigation/native';
import { Card, Title, Paragraph } from 'react-native-paper'

import HeaderButton from '../../components/buttons/HeaderButton';
import AgendaCalendar from '../../components/calendar/agendaCalendar';
import { useSelector } from 'react-redux';

const MainPage = props => {
    const loggedInUser = useSelector(state => state.data)

    return (
        <View style={{ alignItems: 'center' }}>
            {loggedInUser.lessons !== {} ? (
                <ScrollView>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.title}>Upcoming Lessons</Text>
                    </View>
                    {Object.entries(loggedInUser.lessons).map(date => {
                        return Object.entries(date[1]).map(lesson => {
                            console.log(lesson)
                            return (
                                <View key={`${date[0]} - ${lesson[0]}`} style={{ alignItems: 'center', marginTop: 5 }}>
                                    <Card>
                                        <Card.Content style={{ alignItems: 'center' }}>
                                            <Title>{date[0]} at {lesson[0]}</Title>
                                            <Paragraph style={{ fontWeight: '600'}}>
                                                {lesson[1].tutor} - {lesson[1].course}
                                            </Paragraph>
                                        </Card.Content>
                                    </Card>
                                </View>
                            )
                        })
                    })}
                </ScrollView>
            ) : (
                <Text style={styles.title}>No lessons planned.</Text>
            )}
        </View>
    )
}

export const screenOptions = navData => {
    return {
        headerTitle: 'Students Scheduler',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    onPress={() => {
                        navData.navigation.dispatch(DrawerActions.toggleDrawer());
                    }}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'dodgerblue',
        fontSize: 26,
        fontWeight: 'bold'
    }
})

export default MainPage