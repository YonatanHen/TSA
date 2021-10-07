import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { DrawerActions } from '@react-navigation/native';

import HeaderButton from '../components/buttons/HeaderButton';

const AdminMainScreen = props => {

    return (
        <Text>
            Here we will show all of the users in the institue of the admin.
        </Text>
    )
}

export const screenOptions = navData => {
    return {
        headerTitle: 'Institute Users',
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

export default AdminMainScreen