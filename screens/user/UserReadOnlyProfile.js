import React from 'react'
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'

import { ProfileCommonData } from '../../components/userProfile/profileCommonData'

const UserReadOnlyProfile = (props) => {
    const loggedInUser = useSelector(state => state.userData)
    const user = props.route.params.user

    return (
        <>
            <ScrollView style={{ flexDirection: 'column' }}>
                <ProfileCommonData user={user} />
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
                        {loggedInUser.role === 'student' && <View style={styles.row}>
                            <View style={{ alignItems: 'center' }}>
                                <Button title={`Schdule a Meeting with ${user.firstName}`} onPress={() => props.navigation.navigate('Schedule a Meeting')} />
                            </View>
                        </View>}
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