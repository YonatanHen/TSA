import React, { useEffect, useState, useCallback, useReducer } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, ActivityIndicator, Button, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../components/Inputs/LoginAndSignUp/Input'
import MultipleInput from '../../components/Inputs/LoginAndSignUp/multipleInput'
import ImagePicker from '../../components/pickers/ImagePicker'
import LocationPicker from '../../components/pickers/LocationPicker'
import { colors } from '../../constants/colors';

import { addDataOnSignUp } from '../../store/actions/data/userData'

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

const SignUpLandingPage = props => {
    const [selectedImage, setSelectedImage] = useState()
    const [selectedLocation, setSelectedLocation] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const userRole = useSelector(state => state.data.role)

    const dispatch = useDispatch()

    useEffect(() => {
        if (error) {
            Alert.alert('An Error occured!', error, [{ text: 'OK' }])
        }
    }, [error])

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            bio: '',
            courses: [],
            phone: '',
        },
        inputValidities: {
            bio: false,
            phone: false,
        },
        formIsValid: false
    });

    const submitHandler = async () => {
        let action = addDataOnSignUp(
            userRole,
            formState.inputValues.bio,
            selectedImage,
            formState.inputValues.courses,
            formState.inputValues.phone,
            selectedLocation
        );
        setError(null)
        setIsLoading(true);
        try {
            await dispatch(action)
        } catch (err) {
            console.log(err)
            setError(err.message)
            setIsLoading(false)
        }
    }

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            })
        },
        [dispatchFormState]
    )

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath)
    }

    const locationPickedHandler = useCallback(location => {
        setSelectedLocation(location)
    }, [])

    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={20}
            style={styles.screen}
        >
            <View style={styles.inputForm}>
                <ScrollView>
                    <ImagePicker
                        onImageTaken={imageTakenHandler}
                    />
                    <Input
                        id="bio"
                        isTextArea={true}
                        numberOfLines={4}
                        multiline
                        placeholder='Type a short bio about yourself :)'
                        initialValue=""
                        onInputChange={inputChangeHandler}
                        maxLength={100}
                        style={styles.bio}
                    />
                    {userRole === 'tutor' && (
                        <MultipleInput
                            id="courses"
                            placeholder='add courses, delete by typing on course name'
                            initialValue={[]}
                            required
                            onInputChange={inputChangeHandler}
                            maxLength={100}
                            style={styles.bio}
                            errorText='Enter one course at least'
                        />
                    )}
                    <Input
                        id="phone"
                        placeholder="Enter your phone number - format: xxx-xxx-xxxx"
                        initialValue=''
                        phoneNumber
                        onInputChange={inputChangeHandler}
                        keyboardType='phone-pad'
                        errorText='Phone number is invalid'
                    />
                    <LocationPicker
                        navigation={props.navigation}
                        route={props.route}
                        onLocationPicked={locationPickedHandler}
                    />
                    {isLoading ? (<ActivityIndicator size='small' color={colors.primary} />) : (
                        <View style={styles.buttonContainer}>
                            <View style={styles.button}>
                                <Button title={'Submit'} color={colors.primary} onPress={submitHandler} />
                            </View>
                        </View>
                    )}
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    inputForm: {
        width: '100%',
        padding: 10,
    },
    bio: {
        borderColor: '#000000',
        borderWidth: 1,
    },
    buttonContainer: {
        justifyContent: 'space-evenly',
        display: 'flex',
        alignItems: "center",
        flexDirection: 'row'
    },
    button: {
        marginVertical: 3
    }
})

export default SignUpLandingPage