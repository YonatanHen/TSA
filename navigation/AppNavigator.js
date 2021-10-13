import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import { AuthNavigator, OptionsNavigator, MainNavigator, AdminNavigator } from './SystemNavigator'


const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token)
    const isSignUp = useSelector(state => !!state.auth.signedUp)
    const user = useSelector(state => state.auth)

return (
    <NavigationContainer>
        {/* <MainNavigator /> */}
        {isAuth && user.role === 'admin' && <AdminNavigator />}
        {isAuth && isSignUp && user.role !== 'admin' && <MainNavigator />}
        {isAuth && !isSignUp && user.role !== 'admin' && <OptionsNavigator user={user}/>}
        {!isAuth && <AuthNavigator />}
    </NavigationContainer>
)
}

export default AppNavigator