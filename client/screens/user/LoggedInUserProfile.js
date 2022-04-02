import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'

import { ProfileCommonData } from '../../components/userProfile/profileCommonData'
import { colors } from '../../constants/colors'

const LoggedInUserProfile = (props) => {
    const user = useSelector(state => state.data)

    return (
        <>
            <ScrollView style={{ flexDirection: 'column' }}>
                <ProfileCommonData user={user} />
                {user.role === 'tutor' && (
                    <View style={styles.row}>
                        <View style={styles.sectionTitle}>
                            <Text style={{ fontSize: 16, ...styles.sectionTitleText }}>
                                Courses:
                        </Text>
                        </View>
                            <View style={styles.sectionContent}>
                                {user.courses && user.courses.length > 0 ? (
                                user.courses.map(course => {
                                    return (
                                        <Text key={course}>
                                            {course}
                                        </Text>
                                    )
                                })) : (
                                    <Text style={{ fontSize: 16 }}>
                                        No courses selected.
                                    </Text>
                                )}
                            </View>
                    </View>
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
        color: colors.primary
    }
})

export default LoggedInUserProfile