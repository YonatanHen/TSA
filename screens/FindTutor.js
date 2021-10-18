import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/buttons/HeaderButton';
import DistancePicker from '../components/pickers/distancePicker';
import Input from '../components/Inputs/Search/Input'
import { ScrollView } from 'react-native-gesture-handler';

const FindTutor = props => {
    const [formState, formStateHandler] = useState({
        distance: '2km',
        courseName: '',
        TutorName: ''
    })


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
        alignItems: 'center',
        paddingTop: 10
    }
})

export default FindTutor