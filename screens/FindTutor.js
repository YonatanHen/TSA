import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { DrawerActions } from '@react-navigation/native';

import HeaderButton from '../components/buttons/HeaderButton';

const FindTutor = props => {

    return (
        <Text>
            Find Tutor screen
        </Text>
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

export default FindTutor