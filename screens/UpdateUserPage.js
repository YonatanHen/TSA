import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { DrawerActions } from '@react-navigation/native';

import HeaderButton from '../components/UI/HeaderButton';

const UpdateUserPage = props => {

    return (
        <Text>
           Update user data page
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

export default UpdateUserPage