import React from 'react'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { AuthNavigator, OptionsNavigator, MainNavigator, AdminNavigator } from './SystemNavigator'



const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token)
    const isSignUp = useSelector(state => !!state.auth.signedUp)
    const userRole = useSelector(state => state.auth.role)

    return (
        <NavigationContainer>
            {isAuth && userRole === 'admin' && <AdminNavigator />}
            {isAuth && isSignUp && <MainNavigator />}
            {isAuth && !isSignUp && userRole !== 'admin' && <OptionsNavigator />}
            {!isAuth && <AuthNavigator />}
        </NavigationContainer>
    )
}

export default AppNavigator