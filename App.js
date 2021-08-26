import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'

import AuthScreen from './screens/AuthScreen'
import AppNavigator from './navigation/AppNavigator';

import store from './store/store'

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
