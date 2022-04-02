import React from 'react'
import { StyleSheet, Text, View, Button, ScrollView, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';

import { ProfileCommonData } from '../../components/userProfile/profileCommonData'
import { disableEnableUser } from '../../store/actions/data/adminData'
import { colors } from '../../constants/colors';

const UserProfile = (props) => {
    const loggedInUser = useSelector(state => state.data)
    const user = props.route.params.user

    const dispatch = useDispatch()

    const disableUserHandler = () => {
        Alert.alert(
            "Are you sure?", `Do you want to ${user.disabled ? 'enable' : 'disable'} ${user.firstName} ${user.lastName}?`,
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        dispatch(disableEnableUser(user))
                        props.navigation.goBack()

                    }
                }
            ]
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flexDirection: 'column' }}>
                <ProfileCommonData user={user} loggedInUser={loggedInUser} />
                {user.role === 'tutor' && (
                    <>
                        <View style={styles.row}>
                            <View style={styles.sectionTitle}>
                                <Text style={{ fontSize: 16, ...styles.sectionTitleText }}>
                                    Courses:
                        </Text>
                            </View>
                            <View style={styles.sectionContent}>
                                {user.courses && user.courses.length > 0 ? (user.courses.map((course) => {
                                    return (
                                        <Text key={course} style={{ fontSize: 16 }}>
                                            {course}
                                        </Text>
                                    )
                                })) : (
                                    <Text style={{ fontSize: 16 }}>No courses selected.</Text>
                                )}

                            </View>
                        </View>

                        {(loggedInUser.role === 'student' || loggedInUser.role === 'admin') &&
                            <View style={{ alignItems: 'center', marginTop: 10 }}>
                                <Button
                                    title={loggedInUser.role === 'student' ? `Schedule a lesson with ${user.firstName}` : `See ${user.firstName} Lessons`}
                                    onPress={() =>
                                        props.navigation.navigate({
                                            name: loggedInUser.role === 'student' ? 'Schedule a Meeting' : 'Tutor Lessons',
                                            params: { user: user }
                                        })
                                    }
                                />
                            </View>
                        }
                    </>
                )}
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <Button
                        color={colors.primary}
                        title={`Go Back`}
                        onPress={() => props.navigation.dispatch(StackActions.pop(1))}
                    />
                </View>
                {loggedInUser.role === 'admin' && (
                    <View style={{
                        alignItems: 'center',
                        top: 10,
                        marginBottom: 20
                    }}>
                        <Ionicons //disable/enable user
                            name={user.disabled ? 'cloud-sharp' : 'cloud-offline-sharp'}
                            size={30}
                            color={user.disabled ? 'green' : 'red'}
                            onPress={() => disableUserHandler()}
                        />
                    </View>
                )}
            </ScrollView>
        </View>
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
    },
})

export default UserProfile