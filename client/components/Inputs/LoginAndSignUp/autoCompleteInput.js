import { Ionicons } from '@expo/vector-icons';
import React, { useReducer, useState, useEffect } from 'react'
import { TextInput, StyleSheet, View, Text, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input'
import { useSelector } from 'react-redux'

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

const AutoCompleteInput = props => {
    const [instituteName, setinstituteName] = useState(props.initialValue ? props.initialValue : '')
    const [filteredList, setFilteredList] = useState([])
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initialValue !== '',
        touched: false
    })

    //fetch the institutes list from the store
    const institutesList = useSelector(state => state.representationLists.institutesList)
    const { onInputChange, id, selectedValue } = props;

    useEffect(() => {
        onInputChange(id, inputState.value, inputState.isValid)
    }, [inputState, onInputChange, id]);

    const findInstitute = (text) => {
        if (text) {
            setFilteredList(
                institutesList.filter(institute => institute && institute.toLowerCase().includes(text.toLowerCase()))
            )
        } else {
            setFilteredList([])
        }
        if (filteredList.length == 1) {
            text = filteredList[0]
            setinstituteName(filteredList[0])
        }

        dispatch({ type: INPUT_CHANGE, value: text, isValid: true })
    }

    return (
        <View>
            <Autocomplete
                {...props}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.autocompleteContainer}
                inputContainerStyle={{ borderWidth: 0 }}
                // data={filteredList}
                defaultValue={
                    inputState.value === '' ?
                        (selectedValue ? selectedValue : '') :
                        inputState.value
                }
                onChangeText={(text) => findInstitute(text)}
            />
            {(inputState.value !== '') &&
                (<Ionicons
                    style={{ position: 'absolute', right: 3, top: 15 }}
                    name='trash-outline'
                    size={23}
                    color='red'
                    onPress={() => dispatch({ type: INPUT_CHANGE, value: '', isValid: true })}
                />)}
            {instituteName !== '' && inputState.value !== instituteName && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Did you mean {instituteName} ?</Text>
                </View>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    autocompleteContainer: {
        flex: 1,
        paddingHorizontal: 2,
        paddingVertical: 8,
        borderBottomColor: '#ccc',
        borderWidth: 0,
        borderBottomWidth: 2,
    },
    itemText: {
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 2,
    },
    errorText: {
        color: 'mediumaquamarine'
    }
});

export default AutoCompleteInput