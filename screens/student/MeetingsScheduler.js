import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { DrawerActions } from '@react-navigation/native';

import HeaderButton from '../../components/buttons/HeaderButton';
import AgendaCalendar from '../../components/calendar/agendaCalendar';

const MeetingsScheduler = props => {

    return (
        <AgendaCalendar />
    )
}

const styles = StyleSheet.create({})

export default MeetingsScheduler