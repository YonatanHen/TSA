import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default props => {
  const { isDatePickerVisible, setDatePickerVisibility, setTime } = props

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async (date) => {
    var startTime = await date.toLocaleTimeString()
    var endTime = await new Date(date.setHours(date.getHours() + 1)).toLocaleTimeString()
    await setTime(date)
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

