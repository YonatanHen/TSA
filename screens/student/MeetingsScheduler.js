import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { DrawerActions } from '@react-navigation/native';

import HeaderButton from '../../components/buttons/HeaderButton';
import AgendaCalendar from '../../components/calendar/agendaCalendar';

const MeetingsScheduler = props => {

    return (
        <View style={{ flex: 1 }}>
            <AgendaCalendar />
        </View>
    )
}

const styles = StyleSheet.create({})

export default MeetingsScheduler