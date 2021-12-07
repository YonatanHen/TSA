import React, { useReducer, useEffect } from 'react'
import { TextInput, StyleSheet, View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initialValue !== '',
    touched: false
  })

  const { onInputChange, id } = props;

  useEffect(() => {
    onInputChange(id, inputState.value, inputState.isValid);
  }, [inputState, onInputChange, id]);

  const textChangeHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[0-9]).*$/
    const nameRegex = /^[a-zA-Z]+(?:-[a-zA-Z]+)*$/

    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.password && !passwordRegex.test(text)) {
      isValid = false
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if ((props.firstName || props.lastName) && !nameRegex.test(text)) {
      isValid = false
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    if (props.phoneNumber && !phoneNumberRegex.test(text)) {
      isValid = false
    }

    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };



  return (
    <View style={styles.inputContainer}>
      <TextInput
        {...props}
        style={props.isTextArea ? styles.textAreaInput : styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
      />
      {(props.password || props.email) &&
        (<Ionicons 
          style={{position: 'absolute', right: 10, bottom: 10 }}
          name={props.password ? 'key-outline' : 'mail'}
          size={20}
          color='#ccc'
        />)}
      {!inputState.isValid && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingHorizontal: 2,
    paddingVertical: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    marginBottom: 2
  },
  textAreaInput: {
    flex: 1,
    paddingHorizontal: 2,
    paddingVertical: 8,
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 2,
    textAlignVertical: 'top'
  },
  errorText: {
    color: 'mediumaquamarine'
  }
})

export default Input