import React, { useEffect } from 'react';
import { I18nManager } from 'react-native'
import { Provider } from 'react-redux'
import * as Notifications from 'expo-notifications'
import * as TaskManager from 'expo-task-manager'
import AppNavigator from './navigation/AppNavigator';

import store from './store/store'
import { fetchInstitutes, readAllUsers } from './store/actions/representation'
import { readLessons } from './store/actions/data/lessonsData';

const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

I18nManager.forceRTL(false);
I18nManager.allowRTL(false);
I18nManager.swapLeftAndRightInRTL(false);

export default function App() {

  const handleNewNotification = async notificationObject => {
    try {
      const newNotification = {
        id: notificationObject.messageId,
        date: notificationObject.sentTime,
        title: notificationObject.data.title,
        body: notificationObject.data.message,
        data: JSON.parse(notificationObject.data.body),
      }
      // add the code to do what you need with the received notification  and, e.g., set badge number on app icon
      await Notifications.setBadgeCountAsync(0)
    } catch (error) {
      console.error(error)
    }
  }
  
  TaskManager.defineTask(
    BACKGROUND_NOTIFICATION_TASK,
    ({ data, error, executionInfo }) => handleNewNotification(data.notification)
  )

  useEffect(() => {
    store.dispatch(fetchInstitutes())
    store.dispatch(readAllUsers())
    store.dispatch(readLessons())

    // register task to run whenever is received while the app is in the background
    Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK)
  
    // listener triggered whenever a notification is received while the app is in the foreground
    const foregroundReceivedNotificationSubscription = Notifications.addNotificationReceivedListener(
      notification => {
        handleNewNotification(notification.request.trigger.remoteMessage)
      }
    )
  
    return () => {
      // cleanup the listener and task registry
      foregroundReceivedNotificationSubscription.remove()
      Notifications.unregisterTaskAsync(BACKGROUND_NOTIFICATION_TASK)
    }
  }, [])


  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
