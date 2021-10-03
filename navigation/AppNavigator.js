import React from 'react'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { AuthNavigator, OptionsNavigator,MainNavigator } from './SystemNavigator'



const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token)
    const isSignUp = useSelector(state => !!state.auth.signedUp)
    
    return (
        <NavigationContainer>
            {isAuth && isSignUp && <MainNavigator />}
            {isAuth && !isSignUp && <OptionsNavigator />}
            {!isAuth && <AuthNavigator />}
        </NavigationContainer>
    )
}

export default AppNavigator