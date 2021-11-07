import React, { useEffect, useState, useCallback, useReducer } from 'react'
import { Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, ActivityIndicator, Alert, Keyboard } from 'react-native'
import { useDispatch } from 'react-redux'

import Input from '../../components/Inputs/LoginAndSignUp/Input'
import AutoCompleteInput from '../../components/Inputs/LoginAndSignUp/autoCompleteInput'
import RolePicker from '../../components/pickers/rolePicker'

import { signup, login } from '../../store/actions/data/userData'
import InstitutesModal from '../../components/modals/institutesListModal'

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
  const [isModalShown, setIsModalShown] = useState(false)

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
    if (error) {
      Alert.alert('An Error occured!', error, [{ text: 'OK' }])
    }
  }, [error])


  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = signup(
        formState.inputValues.email,
        formState.inputValues.password,
        formState.inputValues.role,
        formState.inputValues.fname,
        formState.inputValues.lname,
        formState.inputValues.institute,
      );
    }
    else {
      action = login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (err) {
      console.log(err)
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier //id
      });
    },
    [dispatchFormState]
  );



  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={0}
      style={styles.screen}
    >
      <View style={{ borderWidth: 3, borderColor: 'deepskyblue', margin: '2%', padding: '1%', borderRadius: 30 }}>
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
              initialValue="test80@test.com"
            />
            <Input
              required
              password
              id="password"
              placeholder="Password"
              keyboardType="default"
              errorText={isSignup ? "Valid password must conatain one letter, one number and 6 charcates at least" : "Please enter a valid password"}
              secureTextEntry={true}
              onInputChange={inputChangeHandler}
              initialValue="123456A"
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
                  firstName
                  id="fname"
                  placeholder="First Name"
                  keyboardType="default"
                  errorText="Please enter a valid name."
                  onInputChange={inputChangeHandler}
                  initialValue="t"
                />
                <Input
                  required
                  lastName
                  id="lname"
                  placeholder="Last Name"
                  keyboardType="default"
                  errorText="Please enter a valid name."
                  onInputChange={inputChangeHandler}
                  initialValue="t"
                />
                <View style={styles.autoCompleteInstituteContainer}>
                  <View style={styles.autoCompleteInput}>
                    <AutoCompleteInput
                      required
                      id="institute"
                      onInputChange={inputChangeHandler}
                      placeholder='Institute Name'
                      initialValue="Sami Shamoon College of Engineering"
                    />
                  </View>
                  <View style={styles.findButtonContainer}>
                    <Button title='Find' onPress={() => setIsModalShown(true)} />
                    <InstitutesModal
                      isShown={isModalShown}
                      setIsModalShown={setIsModalShown}
                    />
                  </View>
                </View>
              </>
            )}
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                {isLoading ?
                  (<ActivityIndicator size='small' color={'deepskyblue'} />) :
                  (<Button title={isSignup ? 'Sign-Up' : 'Log-In'} color='deepskyblue' onPress={authHandler} />)}
              </View>
              <View style={styles.button}>
                <Button
                  title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                  onPress={() => {
                    setIsSignup(prevState => !prevState);
                  }}
                  color='dodgerblue'
                />
              </View>
            </View>
          </ScrollView>
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
  },
  buttonContainer: {
    justifyContent: 'space-evenly',
    display: 'flex',
    alignItems: "center"
  },
  button: {
    marginVertical: 3
  },
  autoCompleteInstituteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  autoCompleteInput: {
    flex: 1
  },
  findButtonContainer: {
    height: '40%',
    marginTop: 10,
    marginLeft: 2
  },
})

export default AuthScreen
