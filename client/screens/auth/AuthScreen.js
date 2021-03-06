import React, { useEffect, useState, useCallback, useReducer } from 'react'
import { Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, ActivityIndicator, Alert, Keyboard } from 'react-native'
import { useDispatch } from 'react-redux'

import Input from '../../components/Inputs/LoginAndSignUp/Input'
import AutoCompleteInput from '../../components/Inputs/LoginAndSignUp/autoCompleteInput'
import RolePicker from '../../components/pickers/rolePicker'

import { signup, login, resetPassword } from '../../store/actions/data/userData'
import InstitutesModal from '../../components/modals/institutesListModal'
import { colors } from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'

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
      Alert.alert('An Error occured!', error)
    }
  }, [error])


  const authHandler = async () => {
    let action;
    if (!formState.formIsValid && isSignup) {
      Alert.alert('Form is invalid!', 'please make sure that all of the fields filled with no errors.')
    } else if (isSignup && formState.formIsValid) {
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

  const forgotPasswordHandler = async () => {
    if (formState.inputValues.email !== '') {
      try {
        await resetPassword(formState.inputValues.email)
        Alert.alert(`Password reset email has been sent to ${formState.inputValues.email}`, '', [{ text: 'OK' }])
      } catch (err) {
        setError(err.message);
      }

    }
    else {
      Alert.alert('You must set your email address!', '', [{ text: 'OK' }])
    }
  }


  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={0}
      style={styles.screen}
    >
      <View style={{ marginHorizontal: '2%' }}>
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
              errorText={isSignup ? "Valid password must conatain one letter, one number and 6 charcates at least" : "Please enter a valid password"}
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
                  firstName
                  id="fname"
                  placeholder="First Name"
                  keyboardType="default"
                  errorText="Please enter a valid name."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
                <Input
                  required
                  lastName
                  id="lname"
                  placeholder="Last Name"
                  keyboardType="default"
                  errorText="Please enter a valid name."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
                <View style={styles.autoCompleteInstituteContainer}>
                  <View style={styles.autoCompleteInput}>
                    <AutoCompleteInput
                      required
                      id="institute"
                      editable={true}
                      onInputChange={inputChangeHandler}
                      placeholder='Institute Name - autcomplete'
                      initialValue=''
                      selectedValue={formState.inputValues.institute}
                    />
                  </View>
                  <View style={styles.findButtonContainer}>
                    <Ionicons
                      name='search-circle-outline'
                      size={32}
                      color={colors.tertiary}
                      onPress={() => setIsModalShown(true)}
                    />
                    <InstitutesModal
                      isShown={isModalShown}
                      setIsModalShown={setIsModalShown}
                      input={formState.inputValues.institute}
                      onInputChange={inputChangeHandler}
                    />
                  </View>
                </View>
              </>
            )}
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                {isLoading ?
                  (<ActivityIndicator size='small' color={colors.primary} />) :
                  (<Button title={isSignup ? 'Sign Up' : 'Log In'} color={colors.primary} onPress={authHandler} />)}
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
      {!isSignup && <View style={styles.touchablesBottom}>
        <Text
          style={styles.underlinedText}
          onPress={forgotPasswordHandler}
        >
          Forgot your password?
              </Text>
        <Text
          style={styles.underlinedText}
          onPress={() => props.navigation.navigate('Contact')}
        >
          Having Troubles? contact us!
              </Text>
      </View>}
    </KeyboardAvoidingView >
  )
}


const styles = StyleSheet.create({
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
    alignItems: "center",
    marginTop: '5%'
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
    marginTop: 10,
    marginLeft: 2
  },
  touchablesBottom: {
    marginTop: 'auto',
    alignItems: 'center',
    bottom: 10
  },
  underlinedText: {
    color: colors.primary,
    textDecorationLine: 'underline'
  }
})

export default AuthScreen
