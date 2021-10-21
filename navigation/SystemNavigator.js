import React from 'react'
import { View, SafeAreaView, Button, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import AuthScreen from '../screens/auth/AuthScreen'
import MapScreen, { ScreenOptions as MapScreenOptions } from '../screens/auth/MapScreen'
import SignUpLandingPage from '../screens/auth/SignUpLandingPage'
import MainPage, { ScreenOptions as MainScreenOptions } from '../screens/student/MainPageScreen'
import FindTutor, { screenOptions as FindTutorScreenOptions } from '../screens/student/FindTutor'
import UserProfile from '../screens/user/UserProfile'
import EditUser from '../screens/user/EditUser'
import AdminMainScreen, { screenOptions as AdminScreenOptions } from '../screens/admin/AdminMainScreen'

import { useDispatch, useSelector } from 'react-redux'

import * as userDataActions from '../store/actions/userData'

//Auth Navigators

const AuthStackNavigator = createStackNavigator()

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator>
            <AuthStackNavigator.Screen name="Auth" component={AuthScreen} options={{ headerTitle: 'Welcome to the Students Scheduler App!' }} />
        </AuthStackNavigator.Navigator>
    )
}

//Student Navigators

const FindTutorStackNavigator = createStackNavigator()

export const FindTutorNavigator = () => {
    return (
        <FindTutorStackNavigator.Navigator>
            <FindTutorStackNavigator.Screen name="Find Tutor" component={FindTutor} />
        </FindTutorStackNavigator.Navigator>
    )
}

const ProfileStackNavigator = createStackNavigator()

export const UserProfileNavigator = () => {
    return (
        <ProfileStackNavigator.Navigator>
            <ProfileStackNavigator.Screen name="User Profile" component={UserProfile} />
        </ProfileStackNavigator.Navigator>
    )
}

const Tab = createMaterialBottomTabNavigator();

export const TabsNavigator = props => {
    const userImage = useSelector(state => state.userData.imageUrl)
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size = 25 }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />;

                    } else if (route.name === 'Find-Tutor') {
                        return <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />;
                    }
                    else if (route.name === 'Profile') {
                        return <Image style={{ width: 25, height: 25, borderRadius: 100, }}
                            source={userImage ? { uri: userImage } : require('../images/Default-Profile-Picture.png')} />
                    }
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}>
            <Tab.Screen name="Home" component={OptionsNavigator} />
            <Tab.Screen name="Find-Tutor" component={FindTutorNavigator} />
            <Tab.Screen name="Profile" component={UserProfileNavigator} />
        </Tab.Navigator>
    );
}

const OptionsDrawerNavigator = createDrawerNavigator()

export const OptionsNavigator = props => {

    const dispatch = useDispatch() //with the dispatch we can dispatch functions from redux store 

    return <OptionsDrawerNavigator.Navigator drawerContent={props => {
        return (
            <View style={{ flex: 1, paddingTop: '30%' }}>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItemList {...props} />
                </SafeAreaView>
                <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                    <Button
                        title="Logout"
                        onPress={() => {
                            dispatch(userDataActions.logout())
                        }}
                    />
                </View>
            </View>
        )
    }}
    >
        <OptionsDrawerNavigator.Screen name={'Main'} component={MainPage} options={{
            drawerIcon: props => (
                <Ionicons
                    name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                    size={23}
                />
            )
        }} />
        <OptionsDrawerNavigator.Screen name={"Edit user"} component={EditUser} options={{
            drawerIcon: props => (
                <Ionicons
                    name='create-outline'
                    size={23}
                />
            )
        }} />
    </OptionsDrawerNavigator.Navigator>
}



const MainDrawerNavigator = createStackNavigator()

export const MainNavigator = props => {

    return (
        <MainDrawerNavigator.Navigator>
            <MainDrawerNavigator.Screen name="Update User" component={SignUpLandingPage} options={{}} />
            <MainDrawerNavigator.Screen name="Student Home" component={TabsNavigator} options={{ headerShown: false }} />
            <MainDrawerNavigator.Screen name="Map" component={MapScreen} options={MapScreenOptions} />
        </MainDrawerNavigator.Navigator>
    )
}

const AdminDrawerNavigator = createStackNavigator()

export const AdminNavigator = () => {
    return (
        <AdminDrawerNavigator.Navigator>
            <AdminDrawerNavigator.Screen name="Admin Main" component={AdminMainScreen} options={AdminScreenOptions} />
        </AdminDrawerNavigator.Navigator>
    )
}


