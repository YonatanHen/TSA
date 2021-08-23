import React from 'react'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { AuthNavigator } from './SystemNavigator'



const AppNavigator = props => {
    

    return (
        <NavigationContainer>
            <AuthNavigator />
        </NavigationContainer>
    )
}

export default AppNavigator