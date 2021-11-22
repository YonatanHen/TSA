import React, { useEffect, useState, useCallback, useReducer } from 'react'
import { Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, ActivityIndicator, Alert, Keyboard } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Input from '../../components/Inputs/LoginAndSignUp/Input'
import AutoCompleteInput from '../../components/Inputs/LoginAndSignUp/autoCompleteInput'
import MultipleInput from '../../components/Inputs/LoginAndSignUp/multipleInput'
import ImagePicker from '../../components/pickers/ImagePicker'
import LocationPicker from '../../components/pickers/LocationPicker'

import { deleteUser, updateUser } from '../../store/actions/data/userData'
import InstitutesModal from '../../components/modals/institutesListModal'
import { TouchableOpacity } from 'react-native-gesture-handler'

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
const EditUser = props => {
    const user = useSelector(state => state.data)

    const [selectedLocation, setSelectedLocation] = useState(user.locationCords)
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
            institute: '',
            bio: '',
            courses: [],
            phone: '',
        },
        inputValidities: {
            email: false,
            password: false,
            role: false,
            fname: false,
            lname: false,
            institute: false,
            bio: false,
            phone: false,
        },
        formIsValid: false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An Error occured!', error, [{ text: 'OK' }])
        }
    }, [error])


    const submitHandler = async () => {
        let action; //email, fname, lname, institute, bio, courses = undefined, phone, location
        action = updateUser(
            formState.inputValues.fname,
            formState.inputValues.lname,
            formState.inputValues.institute,
            formState.inputValues.bio,
            user.role === 'tutor' && formState.inputValues.courses,
            formState.inputValues.phone,
            selectedLocation
        )
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            setIsLoading(false);
            Alert.alert('User updated successfully!', '', [{ text: 'OK' }])
        } catch (err) {
            console.log(err)
            setError(err.message);
            setIsLoading(false);
        }
    }

    const deleteUserHandler = async () => {
        let action = deleteUser()
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            Alert.alert('User deleted successfully!', '', [{ text: 'OK' }])
        } catch (err) {
            console.log(err)
            setError(err.message);
        }
        setIsLoading(false);
    }

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


    const locationPickedHandler = useCallback(location => {
        setSelectedLocation(location)
    }, [])

    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={0}
            style={styles.screen}
        >
            <View style={styles.inputForm}>
                <ScrollView>
                    {/* <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                        <View style={{...styles.resetButtons, marginRight: 2}}>
                            <Button title="Reset Email"  />
                        </View>
                        <View style={styles.resetButtons}>
                            <Button title="Reset Password"  />
                        </View>
                    </View> */}
                    <Input
                        required
                        email
                        id="email"
                        placeholder="E-Mail"
                        keyboardType="email-address"
                        errorText="Please enter a valid email address."
                        onInputChange={inputChangeHandler}
                        initialValue={user.email}
                    />
                    <Input
                        required
                        id="fname"
                        placeholder="First Name"
                        keyboardType="default"
                        errorText="Please enter a valid name."
                        onInputChange={inputChangeHandler}
                        initialValue={user.firstName}
                    />
                    <Input
                        required
                        id="lname"
                        placeholder="Last Name"
                        keyboardType="default"
                        errorText="Please enter a valid name."
                        onInputChange={inputChangeHandler}
                        initialValue={user.lastName}
                    />
                    <View style={styles.autoCompleteInstituteContainer}>
                        <View style={styles.autoCompleteInput}>
                            <AutoCompleteInput
                                required
                                id="institute"
                                onInputChange={inputChangeHandler}
                                placeholder='Institute Name'
                                initialValue={user.institute}
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
                    <Input
                        id="bio"
                        isTextArea={true}
                        numberOfLines={4}
                        multiline
                        placeholder='Type a short bio about yourself :)'
                        initialValue={user.bio}
                        onInputChange={inputChangeHandler}
                        maxLength={100}
                        style={styles.bio}
                    />
                    {user.role === 'tutor' && (
                        <MultipleInput
                            id="courses"
                            placeholder='add courses, delete by typing on course name'
                            initialValue={user.courses}
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
                        initialValue={user.phone}
                        phoneNumber
                        onInputChange={inputChangeHandler}
                        keyboardType='phone-pad'
                        errorText='Phone number is invalid'
                    />
                    <LocationPicker
                        navigation={props.navigation}
                        route={props.route}
                        onLocationPicked={locationPickedHandler}
                        currentLocation={selectedLocation}
                    />
                    {isLoading ? (<ActivityIndicator size='small' color={'deepskyblue'} />) : (
                        <View style={styles.buttonContainer}>
                            <View style={styles.button}>
                                <Button title={'Submit'} color='deepskyblue' onPress={submitHandler} />
                            </View>
                            <TouchableOpacity onPress={deleteUserHandler}>
                                <View style={{ marginVertical: 10 }}>
                                    <Text style={{ color: 'red', fontSize: 12, borderBottomWidth: 0.5, borderBottomColor: 'red' }}>Delete user</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
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
    resetButtons: {
        width: 100
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
        marginTop: 10,
        marginLeft: 2
    },
})

export default EditUser
