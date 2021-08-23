import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import AuthScreen from './screens/AuthScreen'
import AppNavigator from './navigation/AppNavigator';

// const rootReducer = combineReducers({
//   auth: authReducer
// })

// const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
      <AppNavigator />
  );
}
