import React, { useState } from "react";
import { Alert, Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from 'react-redux';

import { addLesson } from '../../store/actions/data/tutorData';

export default props => {
  const { isDatePickerVisible, setDatePickerVisibility, setItems, items, date } = props

  const dispatch = useDispatch()

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async (pickedTime) => {
    var startTime = await pickedTime.toLocaleTimeString([], {timeStyle: 'short'})
    var endTime = new Date(pickedTime.setHours(pickedTime.getHours() + 1)).toLocaleTimeString([], {timeStyle: 'short'})

    setItems({...items, [date]: [{time: `${startTime} - ${endTime}`}]})
    hideDatePicker();

    try {
      dispatch(addLesson({...items, [date]: [{time: `${startTime} - ${endTime}`}]}))
    } catch (err) {
      Alert.alert('An Error occured!', err, [{ text: 'OK' }])
      // Delete the item that has been added previously from the state
      await setItems(items)
    }
  };

  return (
    <View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};
