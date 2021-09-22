import React from 'react'
import { View, SafeAreaView, Button } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import AuthScreen from '../screens/AuthScreen'
import MainPage from '../screens/MainPageScreen'
import { useDispatch } from 'react-redux'

const AuthStackNavigator = createStackNavigator()

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator>
            <AuthStackNavigator.Screen name="Auth" component={AuthScreen} options={{ headerTitle: 'Welcome to the Students Scheduler App!' }} />
        </AuthStackNavigator.Navigator>
    )
}

const OptionsDrawerNavigator = createDrawerNavigator(

)

export const OptionsNavigator = () => {

    return <OptionsDrawerNavigator.Navigator drawerContent={props => {
        // const dispatch = useDispatch() *** with the dispatch we can dispatch functions from redux store 
        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItemList {...props} />
                </SafeAreaView>
                <View style={{  position: 'absolute', bottom: 0 , width: '100%'}}>
                    <Button title="Logout" />
                </View>
            </View>
        )
    }}
    >
        <OptionsDrawerNavigator.Screen name="Main" component={MainPage} options={{
            drawerIcon: props => (
                <Ionicons
                    name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                    size={23}
                />
            )
        }} />
    </OptionsDrawerNavigator.Navigator>
}