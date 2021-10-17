import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/buttons/HeaderButton';
import DistancePicker from '../components/pickers/distancePicker';

const FindTutor = props => {
    return (
        <View style={styles.formContainer}>
            <DistancePicker />
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