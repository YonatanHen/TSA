import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default props => {
  const { isDatePickerVisible, setDatePickerVisibility, setItems, items, date } = props

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async (pickedTime) => {
    var startTime = await pickedTime.toLocaleTimeString([], {timeStyle: 'short'})
    var endTime = await new Date(pickedTime.setHours(pickedTime.getHours() + 1)).toLocaleTimeString([], {timeStyle: 'short'})
    await setItems({...items, [date]: [{time: `${startTime} - ${endTime}`}]})
    console.warn(`${startTime} - ${endTime}`);
    hideDatePicker();
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

