import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { DrawerActions } from '@react-navigation/native';

import HeaderButton from '../../components/buttons/HeaderButton';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux'
import { CommonActions } from '@react-navigation/native'
import AgendaCalendar from '../../components/calendar/agendaCalendar';

const UserReadOnlyProfile = (props) => {
    const user = props.route.params.user

    return (
        <>
            <ScrollView style={{ flexDirection: 'column' }}>
                <View style={styles.profileContainer}>
                    <View style={styles.image}>
                        <Image style={{ width: 180, height: 180, borderRadius: 100, borderColor: 'deepskyblue', borderWidth: 5 }}
                            source={user.imageUrl ? { uri: user.imageUrl } : require('../../images/Default-Profile-Picture.png')} />
                    </View>
                    <View style={styles.nameHeader}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'dodgerblue' }}>
                            {user.firstName} {user.lastName}
                        </Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.sectionTitle}>
                        <Text style={{ fontSize: 16, ...styles.sectionTitleText }}>
                            Location:
                            </Text>
                    </View>
                    <View style={styles.sectionContent}>
                        <Text style={{ fontSize: 16 }}>
                            {user.country} , {user.city}
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.sectionTitle}>
                        <Text style={{ fontSize: 16, ...styles.sectionTitleText }}>
                            Phone:
                        </Text>
                    </View>
                    <View style={styles.sectionContent}>
                        <Text style={{ fontSize: 16 }}>
                            {user.phone ? user.phone : 'TBD'}
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.sectionTitle}>
                        <Text style={{ fontSize: 16, ...styles.sectionTitleText }}>
                            Bio:
                        </Text>
                    </View>
                    <View style={styles.sectionContent}>
                        <Text style={{ fontSize: 16 }}>
                            {user.bio ? user.bio : 'TBD'}
                        </Text>
                    </View>
                </View>
                {user.role === 'tutor' && (
                    <>
                        <View style={styles.row}>
                            <View style={styles.sectionTitle}>
                                <Text style={{ fontSize: 16, ...styles.sectionTitleText }}>
                                    Courses:
                        </Text>
                            </View>
                            <View style={styles.sectionContent}>
                                {user.courses.map(course => {
                                    return (
                                        <Text>
                                            {course}
                                        </Text>
                                    )
                                })}

                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={{ alignItems: 'center' }}>
                                <Button title={`Schdule a Meeting with ${user.firstName}`} onPress={() => props.navigation.navigate('Schedule a Meeting')} />
                            </View>
                        </View>
                    </>
                )}
            </ScrollView>
        </>

    )
}


const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        marginBottom: '5%'
    },
    image: {
        marginTop: '5%'
    },
    nameHeader: {
        marginTop: '3%',
    },
    row: {
        flexDirection: 'row',
        marginBottom: '3%'
    },
    sectionTitle: {
        flex: 5,
        paddingStart: '2%',
        alignItems: 'center'
    },
    sectionContent: {
        flex: 14,
        alignItems: 'center'
    },
    sectionTitleText: {
        fontWeight: 'bold',
        color: 'deepskyblue'
    }
})

export default UserReadOnlyProfile