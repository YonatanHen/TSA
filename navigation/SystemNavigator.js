import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import AuthScreen from '../screens/AuthScreen'

const AuthStackNavigator = createStackNavigator()

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator>
            <AuthStackNavigator.Screen name="Auth" component={ AuthScreen } options= {{headerTitle: 'Welcome to the Students Scheduler App!'}} />
        </AuthStackNavigator.Navigator>
    )
}