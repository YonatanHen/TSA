import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native'

import DistancePicker from '../../components/pickers/distancePicker'
import Input from '../../components/Inputs/Search/Input'
import TutorItem from '../../components/List Items/TutorSearchItem'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'

import distanceCalc from '../../utilities/calculateDistance'



const FindTutor = props => {
    const users = useSelector(state => state.representationLists.usersList)
    const LoggedInUser = useSelector(state => state.userData)

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
                {users ? (users.tutors !== undefined ? (<ScrollView>
                    {[...Object.entries(users.tutors)]
                        .filter(tutor => tutor[1].institute === LoggedInUser.institute
                            && tutor[1].courses.some(course => course.toLowerCase().includes(formState.courseName.toLowerCase()))
                            && `${tutor[1].firstName} ${tutor[1].lastName}`.toLowerCase().includes(formState.TutorName.toLowerCase())
                            && (formState.distance == null
                                || distanceCalc(tutor[1].locationCords.lat, tutor[1].locationCords.lng, LoggedInUser.locationCords.lat, LoggedInUser.locationCords.lng) <= formState.distance))
                        .map(tutor => {
                            return (
                                <TouchableOpacity
                                    key={tutor[1].uid}
                                    onPress={
                                        () => props.navigation.navigate("Find Tutor", { screen: 'Read Only Profile', params: { user: tutor[1] } })
                                    }
                                >
                                    <TutorItem
                                        name={tutor[1].firstName + ' ' + tutor[1].lastName}
                                        userImage={tutor[1].imageUrl}
                                        distance={`${distanceCalc(tutor[1].locationCords.lat, tutor[1].locationCords.lng, LoggedInUser.locationCords.lat, LoggedInUser.locationCords.lng)}m`}
                                    />
                                </TouchableOpacity>
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

// export const screenOptions = navData => {
//     return {
//         headerTitle: 'Find Tutor',
//         // headerLeft: () => (
//         //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         //         <Item
//         //             title="Find Tutor"
//         //             onPress={() => {
//         //                 navData.navigation.dispatch(DrawerActions.toggleDrawer());
//         //             }}
//         //         />
//         //     </HeaderButtons>
//         // )
//     }
// }

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