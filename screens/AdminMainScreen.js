import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, SectionList, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { DrawerActions } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import HeaderButton from '../components/buttons/HeaderButton'


const AdminMainScreen = props => {
    const users = useSelector(state => state.representationLists.usersList)
    const adminInstitue = useSelector(state => state.auth.institue)

    return (
        <View>
            <SectionList
                sections={[
                    {
                        title: 'Tutors', data: users.tutors !== undefined ? [...Object.entries(users.tutors)]
                        .filter(tutor => tutor[1].institue === adminInstitue)
                        .map(tutor => tutor[1].firstName + ' ' + tutor[1].lastName) : []
                    },
                    {
                        title: 'Students', data: users.students !== undefined ? [...Object.entries(users.students)]
                        .filter(student => student[1].institue === adminInstitue)
                        .map(student => student[1].firstName + ' ' + student[1].lastName) : []
                    }
                ]}
                renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
            />

        </View>
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

const styles = StyleSheet.create({
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    }
})

export default AdminMainScreen