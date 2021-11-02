import React, { useEffect } from 'react';
import { I18nManager } from 'react-native'
import { Provider } from 'react-redux'

import AppNavigator from './navigation/AppNavigator';

import store from './store/store'
import { fetchInstitutes, readAllUsers } from './store/actions/representation'

I18nManager.forceRTL(false);
I18nManager.allowRTL(false);


export default function App() {
  useEffect(() => {
    store.dispatch(readAllUsers())
    store.dispatch(fetchInstitutes())
  }, [])
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
