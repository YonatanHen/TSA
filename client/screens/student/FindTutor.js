import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native'

import DistancePicker from '../../components/pickers/distancePicker'
import Input from '../../components/Inputs/Search/Input'
import TutorItem from '../../components/List Items/TutorSearchItem'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'

import distanceCalc from '../../utilities/calculateDistance'
import { colors } from '../../constants/colors'



const FindTutor = props => {
    const users = useSelector(state => state.representationLists.usersList)
    const LoggedInUser = useSelector(state => state.data)

    const [formState, formStateHandler] = useState({
        distance: null,
        courseName: '',
        TutorName: ''
    })

    useEffect(() => {
    }, [users, formState])

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue) => {
            formStateHandler({
                ...formState,
                [inputIdentifier]: inputValue
            })
        },
        [formStateHandler]
    )

    return (
        <>
            <View style={styles.formContainer}>
                <ScrollView>
                    <DistancePicker
                        id="distance"
                        onInputChange={inputChangeHandler}
                    />
                    <Input
                        id="courseName"
                        initialValue=""
                        placeholder="Enter course name"
                        onInputChange={inputChangeHandler}
                    />
                    <Input
                        id="TutorName"
                        initialValue=""
                        placeholder="Enter tutor name"
                        onInputChange={inputChangeHandler}
                    />
                </ScrollView>
            </View>

            <View style={styles.tutorsList}>
                {users ? (users.tutors !== [] ? (<ScrollView style={{ borderTopWidth: 1, borderTopColor: colors.primary}}>
                        {users.tutors.filter(tutor => tutor[1].institute === LoggedInUser.institute
                            && tutor[1].courses.some(course => course.toLowerCase().includes(formState.courseName.toLowerCase()))
                            && `${tutor[1].firstName} ${tutor[1].lastName}`.toLowerCase().includes(formState.TutorName.toLowerCase())
                            && (formState.distance == null
                                || distanceCalc(tutor[1].locationCords.lat, tutor[1].locationCords.lng, LoggedInUser.locationCords.lat, LoggedInUser.locationCords.lng) <= formState.distance))
                        .map(tutor => {
                            return (
                                <View
                                    key={tutor[1].uid.toString()}
                                >
                                    <TouchableOpacity
                                        onPress={
                                            () => props.navigation.navigate("Find Tutor", { screen: 'Read Only Profile', params: { user: tutor[1] } })
                                        }
                                    >
                                        <TutorItem
                                            name={tutor[1].firstName + ' ' + tutor[1].lastName}
                                            userImage={tutor[1].imageUrl}
                                            distance={`${distanceCalc(tutor[1].locationCords.lat, tutor[1].locationCords.lng, LoggedInUser.locationCords.lat, LoggedInUser.locationCords.lng)/1000} km`}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )
                        })}

                </ScrollView>
                ) : (
                    <Text>No Tutors found.</Text>
                )) : (
                    <ActivityIndicator size='large' color={'black'} />
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        paddingTop: 10,
        alignItems: 'center',

    },
    tutorsList: {
        flex: 1.5,
        marginTop: 5
    }
})

export default FindTutor