import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'

import { ProfileCommonData } from '../../components/userProfile/profileCommonData'

const UserProfile = (props) => {
    const user = useSelector(state => state.userData)

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
                            {user.courses.map(course => {
                                return (
                                    <Text>
                                        {course}
                                    </Text>
                                )
                            })}

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
        color: 'deepskyblue'
    }
})

export default UserProfile