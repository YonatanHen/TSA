import React, { useReducer, useEffect, useState } from 'react'
import { TextInput, StyleSheet, View, Text, Button, Alert } from 'react-native'

const INPUT_CHANGE = 'INPUT_CHANGE';
const COURSE_ADDED = 'COURSE_ADDED'

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                isValid: action.isValid
            }
        case COURSE_ADDED:
            return {
                ...state,
                value: [...state.value, action.value],
            }
        default:
            return state;
    }
};

const MultipleInput = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue !== [] ? props.initialValue : [],
        isValid: props.initiallyValid,
        touched: false
    })

    const [input, inputHandler] = useState('')

    const { onInputChange, id } = props;

    useEffect(() => {
        onInputChange(id, inputState.value, inputState.isValid);
    }, [inputState, onInputChange, id]);

    const textChangeHandler = async (text) => {
        await inputHandler(text)
        let isValid = true;
        if (props.required && input.trim().length === 0) {
            isValid = false;
        }

        dispatch({ type: INPUT_CHANGE, value: input, isValid: isValid });
    }

    const addCourseHandler = () => {
        if (input === '') {
            Alert.alert('Error', 'Course name can not be empty!' , [{text: 'OK'}])
        }
        else {
            dispatch({ type: COURSE_ADDED, value: input })
            inputHandler('')
        }
    }

    return (
        <View style={styles.inputContainer}>
            <View style={styles.nestedContainer}>
                <TextInput
                    {...props}
                    style={styles.input}
                    value={input}
                    onChangeText={textChangeHandler}
                />
                    <View style={styles.addButtonContainer}>
                        <Button
                            title='Add'
                            onPress={addCourseHandler}
                        />
                    </View>
            </View>
            {!inputState.isValid && inputState.value !== '' && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{props.errorText}</Text>
                </View>
            )}
            <View style={styles.coursesContainer}>
                <Text>{inputState.value.join(',')}</Text>
            </View>
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
    nestedContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addButtonContainer: {
        height: '40%',
        marginTop: 10,
        marginLeft: 2
    },
    errorText: {
        color: 'red'
    },
    coursesContainer: {

    }
})

export default MultipleInput