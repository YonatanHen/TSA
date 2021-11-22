import React, { useReducer, useEffect, useState } from 'react'
import { TextInput, StyleSheet, View, Text } from 'react-native'


const Input = props => {
  const [inputState, inputStateHandler] = useState(props.initialValue ? props.initialValue : '')

  const { onInputChange, id } = props;

  useEffect(() => {
    onInputChange(id, inputState);
  }, [inputState, onInputChange]);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState}
        onChangeText={text => inputStateHandler(text)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    // flex: 1,
    paddingHorizontal: 2,
    paddingVertical: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    marginBottom: 2
  },
})

export default Input