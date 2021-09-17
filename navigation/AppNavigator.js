import React from 'react'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { AuthNavigator, OptionsNavigator } from './SystemNavigator'



const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token)
    
    return (
        <NavigationContainer>
            {isAuth && <OptionsNavigator />}
            {!isAuth && <AuthNavigator />}
        </NavigationContainer>
    )
}

export default AppNavigator