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
    const [isLoading, setIsLoading] = useState(false)
    const [filteredList, setFilteredList] = useState([])
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid,
        touched: false
    })

    //fetch the institutes list from the store
    const institutesList = useSelector(state => state.representationLists.institutesList)

    const { onInputChange, id } = props;

    useEffect(() => {
            onInputChange(id, inputState.value, inputState.isValid);
    }, [inputState, onInputChange, id]);

    const findInstitute = (text) => {
        if (text) {
            // setIsLoading(true)
            setFilteredList(
                institutesList.filter(institute => institute && institute.toLowerCase().includes(text.toLowerCase()))
            )
            // setIsLoading(false)
        } else {
            setFilteredList([])
        }
        if (filteredList.length == 1) {
            text = filteredList[0]
            setFilteredList([])
        }

        dispatch({ type: INPUT_CHANGE, value: text, isValid: true })
    }

    return (
        <Autocomplete
            {...props}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.autocompleteContainer}
            inputContainerStyle={{borderWidth: 0}}
            data={filteredList}
            defaultValue={
                inputState.value === '' ?
                    '' :
                    inputState.value
            }
            onChangeText={(text) => findInstitute(text)}
            renderItem={({ item }) => (
                filteredList.length > 1 && filteredList.length < 10 ? (
                    <Text style={styles.itemText}>
                        {item}
                    </Text>) : (<></>)
            )}
        />
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
});

export default AutoCompleteInput