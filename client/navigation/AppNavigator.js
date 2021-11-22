import React from 'react'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { AuthNavigator, MainNavigator, AdminNavigator, TabsStudentNavigator, TabsTutorNavigator } from './SystemNavigator'


const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.data.token)
    const isSignUp = useSelector(state => !!state.data.signedUp)
    const user = useSelector(state => state.data)

    return (
        <NavigationContainer>
            {/* <MyTabs /> */}
            {isAuth && user.role === 'admin' && <AdminNavigator />}
            {isAuth && isSignUp && user.role !== 'admin' && <MainNavigator />}
            {isAuth && !isSignUp && user.role === 'student' && <TabsStudentNavigator user={user} />}
            {isAuth && !isSignUp && user.role === 'tutor' && <TabsTutorNavigator user={user} />}
            {!isAuth && <AuthNavigator />}
        </NavigationContainer>
    )
}

export default AppNavigator