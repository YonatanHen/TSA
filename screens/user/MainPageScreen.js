import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { DrawerActions } from '@react-navigation/native';
import { Card, Title, Paragraph } from 'react-native-paper'

import HeaderButton from '../../components/buttons/HeaderButton';
import { useSelector } from 'react-redux';

import StudentMain from '../student/StudentMainPageContent'
import TutorMain from '../tutor/TutorMainPageContent'

const MainPage = props => {
    const loggedInUser = useSelector(state => state.data)
    const users = useSelector(state => state.representationLists.usersList)
    return (
        <View style={{ alignItems: 'center', backgroundColor: 'white', height: '100%' }}>
            {loggedInUser.role === 'student' && <StudentMain loggedInUser={loggedInUser} users={users} navigation={props.navigation} />}
            {loggedInUser.role === 'tutor' && <TutorMain loggedInUser={loggedInUser} users={users} navigation={props.navigation} />}
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

const styles = StyleSheet.create({})

export default MainPage