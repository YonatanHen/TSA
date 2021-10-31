import React from 'react'
import { StyleSheet, Text, View, Button, ScrollView, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';

import { ProfileCommonData } from '../../components/userProfile/profileCommonData'
import { disableEnableUser } from '../../store/actions/data/userData'
import { updateOneUser } from '../../store/actions/representation'

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
                                {user.courses.map((course) => {
                                    return (
                                        <Text key={course}>
                                            {course}
                                        </Text>
                                    )
                                })}

                            </View>
                        </View>
                        
                        {loggedInUser.role === 'student' &&
                            <View style={{ alignItems: 'center', marginTop: 10 }}>
                                <Button
                                    title={`Schedule a Meeting with ${user.firstName}`}
                                    onPress={() => props.navigation.navigate({name: 'Schedule a Meeting' , params: { lessons: user.lessons } })}
                                />
                            </View>
                        }
                    </>
                )}
            </ScrollView>

            {loggedInUser.role === 'admin' && (<View style={styles.adminIcons}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Ionicons //edit user
                        name='create-sharp'
                        size={40}
                        color="deepskyblue"
                        onPress={() => console.log('pressed')}
                    />
                    <Ionicons //disable/enable user
                        name={user.disabled ? 'cloud-sharp' : 'cloud-offline-sharp'}
                        size={40}
                        color={user.disabled ? 'green' : 'red'}
                        onPress={() => disableUserHandler()}
                    />
                </View>
            </View>
            )}
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
    },
    adminIcons: {
        flex: 1,
        alignItems: 'center',
    }
})

export default UserProfile