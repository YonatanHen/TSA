import React, { useEffect } from 'react'
import { View, SafeAreaView, Button, Image, Platform, Text, TouchableOpacity, Alert, Linking } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createDrawerNavigator, DrawerItem, DrawerItemList } from '@react-navigation/drawer'

import AuthScreen from '../screens/auth/AuthScreen'
import MapScreen, { ScreenOptions as MapScreenOptions } from '../screens/auth/MapScreen'
import SignUpLandingPage from '../screens/auth/SignUpLandingPage'

import MainPage, { ScreenOptions as MainScreenOptions } from '../screens/user/MainPageScreen'
import FindTutor, { screenOptions as FindTutorScreenOptions } from '../screens/student/FindTutor'

import LoggedInUserProfile from '../screens/user/LoggedInUserProfile'
import EditUser from '../screens/user/EditUser'

import AdminMainScreen from '../screens/admin/AdminMainScreen'

import TutorLessons from '../screens/tutor/TutorLessons'
import * as dataActions from '../store/actions/data/userData'
import UserProfile from '../screens/user/UserProfile';
import MeetingsScheduler from '../screens/student/MeetingsScheduler';
import ProfileImageHandler from '../screens/user/ProfileImageHandler';
import Contact from '../screens/user/Contact'
import ResetPassword from '../screens/user/ResetPassword'
import ResetEmail from '../screens/user/ResetEmail'
import { lessonsToCSV } from '../store/actions/data/adminData';
import { colors } from '../constants/colors';

//style

const headerStyle = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? colors.secondary : colors.primary,
        borderBottomWidth: 2,
        borderBottomColor: Platform.OS === 'android' ? colors.primary : 'white'
    },
    headerTitleStyle: {
        color: Platform.OS === 'android' ? colors.primary : 'white'
    },
    headerTitleAlign: 'center'
}

const drawerNavStyle = {
    drawerActiveTintColor: colors.primary,
    drawerInactiveTintColor: 'black',
    headerTintColor: colors.primary
}

const drawerNavScreenOptions = {
    headerBackgroundContainerStyle: { borderBottomWidth: 2, borderBottomColor: colors.primary },
    headerStyle: { backgroundColor: colors.secondary }
}

const LogoutButton = props => {
    return (
        <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            <TouchableOpacity
                onPress={() => {
                    props.dispatch(dataActions.logout())
                }}
                style={{ alignItems: 'center', marginBottom: '2%' }}
            >
                <Text style={{ fontSize: 20, fontFamily: 'monospace', color: colors.primary }}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

//Auth Navigators

const AuthStackNavigator = createStackNavigator()

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator screenOptions={{ cardStyle: { backgroundColor: 'white' }, ...headerStyle }}>
            <AuthStackNavigator.Screen name="Auth" component={AuthScreen} options={{ headerTitle: 'TSA' }} />
            <AuthStackNavigator.Screen name="Contact" options={{ headerTitle: 'Contact Us!' }}>
                {props => <Contact {...props} sendMailToAppTeam={true} />}
            </AuthStackNavigator.Screen>
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
            shifting={true}
            barStyle={{ backgroundColor: colors.primary, paddingBottom: 5, borderTopWidth: 2, borderTopColor: colors.secondary }}
            activeColor={colors.secondary}
            inactiveColor={colors.secondary}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size = 25 }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />;

                    } else if (route.name === 'Find Tutor') {
                        return <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />;
                    } else if (route.name === 'Profile') {
                        if (userImage) {
                            return <Image style={{ width: 25, height: 25, borderRadius: 100, }}
                                source={{ uri: userImage }} />
                        } else {
                            return <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={size} color={color} />;
                        }

                    }
                },
                cardStyle: 'white'
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
            shifting={true}
            barStyle={{ backgroundColor: colors.primary, paddingBottom: 5, borderTopWidth: 2, borderTopColor: colors.secondary }}
            activeColor={colors.secondary}
            inactiveColor={colors.secondary}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size = 25 }) => {
                    if (route.name === 'Home') {
                        return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />;
                    } else if (route.name === 'My Lessons') {
                        return <Ionicons name={focused ? 'library' : 'library-outline'} size={size} color={color} />;
                    } else if (route.name === 'Profile') {
                        if (userImage) {
                            return <Image style={{ width: 25, height: 25, borderRadius: 100, }}
                                source={{ uri: userImage }} />
                        } else {
                            return <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={size} color={color} />;
                        }

                    }
                },
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
            <EditUserStackNavigator.Screen name="Edit User" component={EditUser} options={{ headerShown: false }} />
            <EditUserStackNavigator.Screen name="Map" component={MapScreen} options={MapScreenOptions} />
        </EditUserStackNavigator.Navigator>
    )
}

const MainPageStackNavigator = createStackNavigator()

export const MainPageNavigator = () => {
    return (
        <MainPageStackNavigator.Navigator screenOptions={{ cardStyle: { backgroundColor: 'white' }, headerShown: false }}>
            <MainPageStackNavigator.Screen name="Main Page" component={MainPage} />
            <AdminDrawerNavigator.Screen name="User Profile" component={UserProfile} />
        </MainPageStackNavigator.Navigator>
    )
}


const OptionsDrawerNavigator = createDrawerNavigator()

export const OptionsNavigator = props => {

    const dispatch = useDispatch() //with the dispatch we can dispatch functions from redux store 

    return <OptionsDrawerNavigator.Navigator
        screenOptions={drawerNavScreenOptions}
        drawerContent={props => {
            return (
                <View style={{ flex: 1, paddingTop: '30%' }}>
                    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                        <DrawerItemList {...props} color='blue' />
                    </SafeAreaView>
                    <LogoutButton dispatch={dispatch} />
                </View>
            )
        }}
    >
        <OptionsDrawerNavigator.Screen name={'Main'} component={MainPageNavigator} options={{
            ...drawerNavStyle,
            drawerIcon: ({ color }) => (
                <Ionicons
                    name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                    size={23}
                    color={color}
                />
            )
        }}
        />
        <OptionsDrawerNavigator.Screen name={"Edit user"} component={EditUserNavigator} options={{
            ...drawerNavStyle,
            drawerIcon: ({ color }) => (
                <Ionicons
                    name='create-outline'
                    size={23}
                    color={color}
                />
            )
        }} />
        <OptionsDrawerNavigator.Screen name={"Profile Image"} component={ProfileImageHandler} options={{
            ...drawerNavStyle,
            drawerIcon: ({ color }) => (
                <Ionicons
                    name='image-outline'
                    size={23}
                    color={color}
                />
            )
        }} />
        <OptionsDrawerNavigator.Screen name={"Contact Institute"} component={Contact} options={{
            ...drawerNavStyle,
            drawerIcon: ({ color }) => (
                <Ionicons
                    name='send'
                    size={23}
                    color={color}
                />
            )
        }} />
        <OptionsDrawerNavigator.Screen name={"Reset Password"} component={ResetPassword} options={{
            ...drawerNavStyle,
            drawerIcon: ({ color }) => (
                <Ionicons
                    name="key"
                    size={23}
                    color={color} />
            )
        }} />
        <OptionsDrawerNavigator.Screen name={"Reset Email"} component={ResetEmail} options={{
            ...drawerNavStyle,
            drawerIcon: ({ color }) => (
                <Ionicons
                    name="mail"
                    size={23}
                    color={color} />
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

const InstituteUserStackNavigator = createStackNavigator()

export const InstituteUserNavigator = () => {
    return (
        <InstituteUserStackNavigator.Navigator screenOptions={{ cardStyle: { backgroundColor: 'white' }, ...headerStyle }}>
            <InstituteUserStackNavigator.Screen name="Admin Main" component={AdminMainScreen} options={{ headerShown: false }} />
            <InstituteUserStackNavigator.Screen name="User Profile" component={UserProfile} options={{ headerShown: false }} />
            <InstituteUserStackNavigator.Screen name='Tutor Lessons' component={MeetingsScheduler} options={{ headerShown: false }} />
        </InstituteUserStackNavigator.Navigator>
    )
}

const AdminDrawerNavigator = createDrawerNavigator()

export const AdminNavigator = props => {

    const dispatch = useDispatch() //with the dispatch we can dispatch functions from redux store


    return <AdminDrawerNavigator.Navigator
        screenOptions={drawerNavScreenOptions}
        drawerContent={props => {
            return (
                <View style={{ flex: 1, paddingTop: '30%' }}>
                    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                        <DrawerItemList {...props} />
                        <DrawerItem label="Export lessons to CSV"
                            labelStyle={{ color: 'black' }}
                            icon={() => <FontAwesome5 name="file-csv" size={23} color="black" style={{ marginLeft: 3 }} />}
                            onPress={() => dispatch(lessonsToCSV())}
                        />
                    </SafeAreaView>
                    <LogoutButton dispatch={dispatch} />
                </View>
            )
        }}
    >
        <AdminDrawerNavigator.Screen name={'Institute Users'} component={InstituteUserNavigator} options={{
            ...drawerNavStyle,
            drawerIcon: ({ color }) => (
                <Ionicons
                    name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                    size={23}
                    color={color}
                />
            )
        }}
        />
        <OptionsDrawerNavigator.Screen name={"Reset Password"} component={ResetPassword} options={{
            ...drawerNavStyle,
            drawerIcon: ({ color }) => (
                <Ionicons
                    name="key"
                    size={23}
                    color={color}
                />
            )
        }} />
        <OptionsDrawerNavigator.Screen name={"Reset Email"} component={ResetEmail} options={{
            ...drawerNavStyle,
            drawerIcon: ({ color }) => (
                <Ionicons
                    name="mail"
                    size={23}
                    color={color}
                />
            )
        }} />
        <OptionsDrawerNavigator.Screen name={"Contact App Team"} options={{
            ...drawerNavStyle,
            drawerIcon: ({ color }) => (
                <Ionicons
                    name="pencil"
                    size={23}
                    color={color}
                />
            )
        }}>
            {props => <Contact {...props} sendMailToAppTeam={true} />}
        </OptionsDrawerNavigator.Screen>
    </AdminDrawerNavigator.Navigator>
}




