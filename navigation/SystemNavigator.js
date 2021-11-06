import React, { useEffect } from 'react'
import { View, SafeAreaView, Button, Image, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'

import AuthScreen from '../screens/auth/AuthScreen'
import MapScreen, { ScreenOptions as MapScreenOptions } from '../screens/auth/MapScreen'
import SignUpLandingPage from '../screens/auth/SignUpLandingPage'

import MainPage, { ScreenOptions as MainScreenOptions, screenOptions } from '../screens/student/MainPageScreen'
import FindTutor, { screenOptions as FindTutorScreenOptions } from '../screens/student/FindTutor'

import LoggedInUserProfile from '../screens/user/LoggedInUserProfile'
import EditUser from '../screens/user/EditUser'
import Inbox from '../screens/user/Inbox'

import AdminMainScreen, { screenOptions as AdminScreenOptions } from '../screens/admin/AdminMainScreen'

import TutorLessons from '../screens/tutor/TutorLessons'

import { useDispatch, useSelector } from 'react-redux'

import * as dataActions from '../store/actions/data/userData'
import UserProfile from '../screens/user/UserProfile';
import MeetingsScheduler from '../screens/student/MeetingsScheduler';
import ProfileImageHandler from '../screens/user/ProfileImageHandler';

//style

const headerStyle = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? 'white' : 'deepskyblue'
    },
    headerTitleStyle: {
        color: Platform.OS === 'android' ? 'deepskyblue' : 'white'
    },
    headerTitleAlign: 'center'
}

//Auth Navigators

const AuthStackNavigator = createStackNavigator()

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator screenOptions={{ cardStyle: { backgroundColor: 'white' }, ...headerStyle }}>
            <AuthStackNavigator.Screen name="Auth" component={AuthScreen} options={{ headerTitle: 'Welcome!' }} />
        </AuthStackNavigator.Navigator>
    )
}

//Student Navigators

const FindTutorStackNavigator = createStackNavigator()

export const FindTutorNavigator = props => {
    useEffect(() => {
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Find-Tutor' }]
        })
    }, [])
    return (
        <FindTutorStackNavigator.Navigator screenOptions={{ cardStyle: { backgroundColor: 'white' }, ...headerStyle }} >
            <FindTutorStackNavigator.Screen name="Find-Tutor" component={FindTutor} options={{ headerTitle: 'Find A Tutor!' }} />
            <FindTutorStackNavigator.Screen name="Read Only Profile" component={UserProfile} options={{ headerTitle: '' }} />
            <FindTutorStackNavigator.Screen name="Schedule a Meeting" component={MeetingsScheduler} options={{ headerTitle: '' }} />
        </FindTutorStackNavigator.Navigator>
    )
}

const ProfileStackNavigator = createStackNavigator()

export const UserProfileNavigator = () => {
    return (
        <ProfileStackNavigator.Navigator screenOptions={{ cardStyle: { backgroundColor: 'white' }, ...headerStyle }}>
            <ProfileStackNavigator.Screen name="User Profile" component={LoggedInUserProfile} />
        </ProfileStackNavigator.Navigator>
    )
}

const Tab = createMaterialBottomTabNavigator();

export const TabsStudentNavigator = props => {
    const userImage = useSelector(state => state.data.imageUrl)
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size = 25 }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />;

                    } else if (route.name === 'Find Tutor') {
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
            <Tab.Screen name="Find Tutor" component={FindTutorNavigator} />
            <Tab.Screen name="Profile" component={UserProfileNavigator} />
        </Tab.Navigator>
    );
}

//Tutor Navigator

const LessonsStackNavigator = createStackNavigator()

export const LessonsNavigator = () => {
    return (
        <LessonsStackNavigator.Navigator screenOptions={{ cardStyle: { backgroundColor: 'white' }, ...headerStyle }}>
            <LessonsStackNavigator.Screen name="Tutor Lessons" component={TutorLessons} />
        </LessonsStackNavigator.Navigator>
    )
}

export const TabsTutorNavigator = props => {
    const userImage = useSelector(state => state.data.imageUrl)
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size = 25 }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />;
                    } else if (route.name === 'My Lessons') {
                        return <Ionicons name={focused ? 'library' : 'library-outline'} size={size} color={color} />;
                    } else if (route.name === 'Profile') {
                        return <Image style={{ width: 25, height: 25, borderRadius: 100, }}
                            source={userImage ? { uri: userImage } : require('../images/Default-Profile-Picture.png')} />
                    }
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                cardStyle: 'white'
            })}>
            <Tab.Screen name="Home" component={OptionsNavigator} />
            <Tab.Screen name="My Lessons" component={LessonsNavigator} />
            <Tab.Screen name="Profile" component={UserProfileNavigator} />
        </Tab.Navigator>
    );
}

//general users navigators

const EditUserStackNavigator = createStackNavigator()

export const EditUserNavigator = () => {
    return (
        <EditUserStackNavigator.Navigator screenOptions={{ cardStyle: { backgroundColor: 'white' }, ...headerStyle }}>
            <EditUserStackNavigator.Screen name="Edit User" component={EditUser} />
            <EditUserStackNavigator.Screen name="Map" component={MapScreen} options={MapScreenOptions} />
        </EditUserStackNavigator.Navigator>
    )
}

const InboxStackNavigator = createStackNavigator()

export const InboxNavigator = props => {

    return (
        <InboxStackNavigator.Navigator screenOptions={{ cardStyle: { backgroundColor: 'white' }, ...headerStyle }}>
            <InboxStackNavigator.Screen name="Inbox" component={Inbox} options={{ headerShown: false }} />
        </InboxStackNavigator.Navigator>
    )
}

const OptionsDrawerNavigator = createDrawerNavigator()

export const OptionsNavigator = props => {

    const dispatch = useDispatch() //with the dispatch we can dispatch functions from redux store 

    return <OptionsDrawerNavigator.Navigator
        drawerContent={props => {
            return (
                <View style={{ flex: 1, paddingTop: '30%' }}>
                    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                        <DrawerItemList {...props} />
                    </SafeAreaView>
                    <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                        <Button
                            title="Logout"
                            onPress={() => {
                                dispatch(dataActions.logout())
                            }}
                        />
                    </View>
                </View>
            )
        }}
    >
        <OptionsDrawerNavigator.Screen name={'Main'} component={MainPage} options={{
            headerTintColor: 'deepskyblue',
            drawerIcon: props => (
                <Ionicons
                    name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                    size={23}
                />
            )
        }}
        />
        <OptionsDrawerNavigator.Screen name={"Edit user"} component={EditUserNavigator} options={{
            headerTintColor: 'deepskyblue',
            drawerIcon: props => (
                <Ionicons
                    name='create-outline'
                    size={23}
                />
            )
        }} />
        <OptionsDrawerNavigator.Screen name={"Inbox"} component={InboxNavigator} options={{
            headerTintColor: 'deepskyblue',
            drawerIcon: props => (
                <Ionicons
                    name='mail-outline'
                    size={23}
                />
            )
        }} />
        <OptionsDrawerNavigator.Screen name={"Profile Image Handler"} component={ProfileImageHandler} options={{
            headerTintColor: 'deepskyblue',
            drawerIcon: props => (
                <Ionicons
                    name='image-outline'
                    size={23}
                />
            )
        }} />
    </OptionsDrawerNavigator.Navigator>
}




const MainDrawerNavigator = createStackNavigator()

export const MainNavigator = props => {
    const userRole = useSelector(state => state.data.role)
    return (
        <MainDrawerNavigator.Navigator screenOptions={{ cardStyle: { backgroundColor: 'white' }, ...headerStyle }}>
            <MainDrawerNavigator.Screen name="Edit User" component={SignUpLandingPage} options={{}} />
            <MainDrawerNavigator.Screen name="Student Home" component={userRole === 'student' ? (TabsStudentNavigator) : (TabsTutorNavigator)} options={{ headerShown: false }} />
            <MainDrawerNavigator.Screen name="Map" component={MapScreen} options={MapScreenOptions} />
        </MainDrawerNavigator.Navigator>
    )
}

//Admin navigators

const AdminDrawerNavigator = createStackNavigator()

export const AdminNavigator = () => {
    return (
        <AdminDrawerNavigator.Navigator screenOptions={{ cardStyle: { backgroundColor: 'white' }, ...headerStyle }}>
            <AdminDrawerNavigator.Screen name="Admin Main" component={AdminMainScreen} options={AdminScreenOptions} />
            <AdminDrawerNavigator.Screen name="User Profile" component={UserProfile} />
        </AdminDrawerNavigator.Navigator>
    )
}


