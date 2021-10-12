import React from 'react';
import { Provider } from 'react-redux'

import AppNavigator from './navigation/AppNavigator';

import store from './store/store'
import {fetchInstitutes,readAllUsers} from './store/actions/representation'

store.dispatch(readAllUsers())
store.dispatch(fetchInstitutes())

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
