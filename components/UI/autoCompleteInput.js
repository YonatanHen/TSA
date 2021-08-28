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
        if (inputState.touched) {
            onInputChange(id, inputState.value, inputState.isValid);
        }
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
            dispatch({type: INPUT_CHANGE, value: filteredList[0], isValid: true })
            setFilteredList([])
        }
    }

    return (
        // <SafeAreaView style={{ flex: 1 }}>
        <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            containerStyle={styles.autocompleteContainer}
            // inputContainerStyle={styles}
            data={filteredList}
            defaultValue={
                inputState.value === '' ?
                    '' :
                    inputState.value
            }
            onChangeText={(text) => findInstitute(text)}
            placeholder="Enter Institute name"
            renderItem={({ item }) => (
                // <TouchableOpacity
                //     onPress={() => {
                //         console.log('pressed')
                //         dispatch({type: INPUT_CHANGE, value: item, isValid: true })
                //         setFilteredList([]);
                //     }}>
                    <Text style={styles.itemText}>
                        {item}
                    </Text>
                // </TouchableOpacity>
            )}
        />
        // </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        padding: 16,
        marginTop: 40,
    },
    autocompleteContainer: {
        backgroundColor: '#ffffff',
        //   borderWidth: 0,
    },
    descriptionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 2,
    },
});

export default AutoCompleteInput