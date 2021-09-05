import React, { useEffect, useState, useCallback, useReducer } from 'react'
import { Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, ActivityIndicator, Alert, Keyboard } from 'react-native'
import { useDispatch } from 'react-redux'

import Input from '../components/UI/Input'
import AutoCompleteInput from '../components/UI/autoCompleteInput'
import RolePicker from '../components/UI/rolePicker'

import * as representationActions from '../store/actions/representation'
import * as authActions from '../store/actions/auth'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

//Building the signing up at first, later we will add the login :)
const AuthScreen = props => {
  const [isSignup, setIsSignup] = useState(false)
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
      role: '',
      fname: '',
      lname: '',
      institute: ''
    },
    inputValidities: {
      email: false,
      password: false,
      role: false,
      fname: false,
      lname: false,
      institute: false
    },
    formIsValid: false
  });

  useEffect(() => {
    dispatch(representationActions.fetchInstitutes())
  }, [representationActions])

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password,
        formState.inputValues.role,
        formState.inputValues.fname,
        formState.inputValues.lname,
        formState.inputValues.institute,
      );
    }
    // else {
    //   action = authActions.login(
    //     formState.inputValues.email,
    //     formState.inputValues.password
    //   );
    // }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (err) {
      console.log(err)
      setError(err.message);
    }
    setIsLoading(false);
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );


  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <View>
        <View>
          <Text style={styles.label}>{isSignup ? 'Sign Up' : 'Login'}</Text>
        </View>
      </View>
      <View style={styles.inputForm}>
        <ScrollView>
          <Input
            required
            email
            id="email"
            placeholder="E-Mail"
            keyboardType="email-address"
            errorText="Please enter a valid email address."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            required
            password
            id="password"
            placeholder="Password"
            keyboardType="default"
            errorText="Please enter a valid password."
            secureTextEntry={true}
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          {isSignup && (
            <>
              <RolePicker 
                required
                id='role'
                onInputChange={inputChangeHandler}
              />
              <Input
                required
                id="fname"
                placeholder="First Name"
                keyboardType="default"
                errorText="Please enter a valid name."
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                required
                id="lname"
                placeholder="Last Name"
                keyboardType="default"
                errorText="Please enter a valid name."
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <AutoCompleteInput
                required
                id="institute"
                onInputChange={inputChangeHandler}
                placeholder='Institute Name'
              />
            </>
          )}
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          {isLoading ?
            (<ActivityIndicator size='small' color={'#eb7134'} />) :
            (<Button title={'Submit'} color='#eb7134' onPress={authHandler} />)}
        </View>
        <View style={styles.button}>
          <Button
            title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
            onPress={() => {
              setIsSignup(prevState => !prevState);
            }}
            color='#66a11f'
          />
        </View>
      </View>
    </KeyboardAvoidingView >
  )
}

styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  label: {
    fontSize: 20
  },
  inputForm: {
    width: '100%',
    padding: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonContainer: {
    justifyContent: 'space-evenly',
    display: 'flex',
    alignItems: "center"
  },
  button: {
    marginVertical: 3
  },
})

export default AuthScreen
