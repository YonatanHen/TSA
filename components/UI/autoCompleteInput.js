import React, { useReducer, useState } from 'react'
import { TextInput, StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input'
import { useSelector } from 'react-redux'

const AutoCompleteInput = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [filteredList, setFilteredList] = useState([])
    const [selectedValue, setSelectedValue] = useState({});

    //fetch the institutes list from the store
    const institutesList = useSelector(state => state.representationLists.institutesList)

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
    }

    return (
        <View>
            <View style={styles.autocompleteContainer}>
                <Autocomplete
                    autoCapitalize="none"
                    autoCorrect={false}
                    containerStyle={styles.autocompleteContainer}
                    data={filteredList}
                    defaultValue={
                        JSON.stringify(selectedValue) === '{}' ?
                            '' :
                            selectedValue.title
                    }
                    onChangeText={(text) => findInstitute(text)}
                    placeholder="Enter Institute name"
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedValue(item);
                                setFilteredList([]);
                            }}>
                            <Text style={styles.itemText}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
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
      borderWidth: 0,
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
    infoText: {
      textAlign: 'center',
      fontSize: 16,
    },
  });

export default AutoCompleteInput