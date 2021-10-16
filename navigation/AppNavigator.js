import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import { AuthNavigator, OptionsNavigator, MainNavigator, AdminNavigator, TabsNavigator } from './SystemNavigator'


const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.userData.token)
    const isSignUp = useSelector(state => !!state.userData.signedUp)
    const user = useSelector(state => state.userData)

return (
    <NavigationContainer>
        {/* <MyTabs /> */}
        {isAuth && user.role === 'admin' && <AdminNavigator />}
        {isAuth && isSignUp && user.role !== 'admin' && <MainNavigator />}
        {isAuth && !isSignUp && user.role !== 'admin' && <TabsNavigator user={user}/>}
        {!isAuth && <AuthNavigator />}
    </NavigationContainer>
)
}

export default AppNavigator