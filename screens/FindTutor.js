import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/buttons/HeaderButton';
import DistancePicker from '../components/pickers/distancePicker';
import Input from '../components/Inputs/Search/Input'
import TutorItem from '../components/List Items/TutorSearchItem'
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const FindTutor = props => {
    const users = useSelector(state => state.representationLists.usersList)
    const LoggedInUser = useSelector(state => state.userData)

    const [formState, formStateHandler] = useState({
        distance: '2km',
        courseName: '',
        TutorName: ''
    })

    useEffect(() => {
        console.log(users.tutors)
    }, [users])


    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue) => {
            formStateHandler({
                value: inputValue,
                input: inputIdentifier
            })
        },
        [formStateHandler]
    )

    return (
        <>
            <View style={styles.formContainer}>
                <ScrollView>
                    <DistancePicker />
                    <Input
                        initialValue=""
                        placeholder="Enter course name"
                        onInputChange={inputChangeHandler}
                    />
                    <Input
                        initialValue=""
                        placeholder="Enter tutor name"
                        onInputChange={inputChangeHandler}
                    />
                </ScrollView>
            </View>

            <View style={styles.tutorsList}>
                {users ? (users.tutors !== undefined ? (<ScrollView>
                    {[...Object.entries(users.tutors)]
                        .filter(tutor => tutor[1].institute === LoggedInUser.institute)
                        .map(tutor => {
                            return (
                                <TutorItem
                                    name={tutor[1].firstName + ' ' + tutor[1].lastName}
                                    userImage ={tutor[1].imageUrl}
                                />
                            )
                        })}

                </ScrollView>
                ) : (
                    <Text>No Tutors found.</Text>
                )) : (
                    <ActivityIndicator size='large' color={'black'} />
                )}
            </View>


            {/* {users.tutors !== undefined ? [...Object.entries(users.tutors)]
                    .filter(tutor => tutor[1].institue === adminInstitue && `${tutor[1].firstName} ${tutor[1].lastName}`.includes(searchInput))
                    .map((tutor) => {
                        return (
                            
                    )
                    }) : ['No tutors found']} */}
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