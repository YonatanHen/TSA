import React, { useState } from "react";
import { Alert, Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from 'react-redux';

import { addLesson } from '../../store/actions/data/tutorData';

export default props => {
  const { isDatePickerVisible, setDatePickerVisibility, setLessons, lessons, date } = props

  const dispatch = useDispatch()

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async (pickedTime) => {
    var startTime = await pickedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    var endTime = new Date(pickedTime.setHours(pickedTime.getHours() + 1)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const newLesson = lessons[date] ? {...lessons, [date]: [...lessons[date] , {time: `${startTime} - ${endTime}`}]} : {...lessons, [date]: [{time: `${startTime} - ${endTime}`}]}

    try {
      dispatch(addLesson(newLesson))
      setLessons(newLesson)
    } catch (err) {
      Alert.alert('An Error occured!', err, [{ text: 'OK' }])
      // Delete the item that has been added previously from the state
    }

    hideDatePicker();
  };

  return (
    <View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        locale="en_GB"
        is24Hour
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

