import React from 'react'
import { View, SafeAreaView, Button } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import AuthScreen from '../screens/AuthScreen'
import MainPage, { ScreenOptions as MainScreenOptions } from '../screens/MainPageScreen'
import FindTutor from '../screens/FindTutor'
import AdminMainScreen, { screenOptions as AdminScreenOptions } from '../screens/AdminMainScreen'
import SignUpLandingPage from '../screens/SignUpLandingPage'
import MapScreen, { ScreenOptions as MapScreenOptions } from '../screens/MapScreen'
import { useDispatch, useSelector } from 'react-redux'




import * as authActions from '../store/actions/auth'
import EditUser from '../screens/EditUser';

const AuthStackNavigator = createStackNavigator()

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator>
            <AuthStackNavigator.Screen name="Auth" component={AuthScreen} options={{ headerTitle: 'Welcome to the Students Scheduler App!' }} />
        </AuthStackNavigator.Navigator>
    )
}

const Tab = createMaterialBottomTabNavigator();

export const TabsNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size = 20 }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'Find Tutor') {
            iconName = focused ? 'search' : 'search-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
        <Tab.Screen name="Home" component={OptionsNavigator} /> 
        <Tab.Screen name="Find Tutor" component={FindTutor}/> 
    </Tab.Navigator>
  );
}

const OptionsDrawerNavigator = createDrawerNavigator()

export const OptionsNavigator = props => {
    const user = useSelector(state => state.auth)
    const dispatch = useDispatch() //with the dispatch we can dispatch functions from redux store 

    return <OptionsDrawerNavigator.Navigator drawerContent={props => {
        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItemList {...props} />
                </SafeAreaView>
                <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                    <Button
                        title="Logout"
                        onPress={() => {
                            dispatch(authActions.logout())
                        }}
                    />
                </View>
            </View>
        )
    }}
    >
        <OptionsDrawerNavigator.Screen name={'Hello ' + user.firstName + ' ' + user.lastName} component={MainPage} options={{
            drawerIcon: props => (
                <Ionicons
                    name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                    size={23}
                />
            )
        }} />
        <OptionsDrawerNavigator.Screen name="Edit user" component={EditUser} options={{
                     drawerIcon: props => (
                        <Ionicons
                            name='create-outline'
                            size={23}
                        />
                    )
        }}/>
    </OptionsDrawerNavigator.Navigator>
}



const MainDrawerNavigator = createStackNavigator()

export const MainNavigator = () => {

    return (
        <MainDrawerNavigator.Navigator>
            <MainDrawerNavigator.Screen name="Update User" component={SignUpLandingPage} options={{}} />
            <MainDrawerNavigator.Screen name="Main" component={TabsNavigator} options={{ }} />
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


