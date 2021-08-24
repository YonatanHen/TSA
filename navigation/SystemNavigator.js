import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import AuthScreen from '../screens/AuthScreen'
import MainPage from '../screens/MainPageScreen'

const AuthStackNavigator = createStackNavigator()

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator>
            <AuthStackNavigator.Screen name="Auth" component={ AuthScreen } options= {{headerTitle: 'Welcome to the Students Scheduler App!'}} />
        </AuthStackNavigator.Navigator>
    )
}



// export const AppNavigator = () => {
//     return (

//     )
// }