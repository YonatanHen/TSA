import React, { useEffect, useRef, useState } from 'react'
import { Modal, View, StyleSheet, Pressable, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';



const InstitutesModal = props => {
    const institutesList = useSelector(state => state.representationLists.institutesList)
    const { isShown, setIsModalShown, onInputChange } = props
    let key = 0

    const selectValueHandler = (instituteName) => {
        onInputChange("institute", instituteName, true)
        setIsModalShown(!isShown);
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isShown}
                onRequestClose={() => {
                    setIsModalShown(!isShown);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ fontSize: 20, color: 'dodgerblue' }}>Institutes list based on the input: </Text>
                        <SafeAreaView style={styles.container}>
                            <FlatList
                                data={institutesList.filter(institute => institute !== undefined && institute.toLowerCase().includes(props.input.toLowerCase()))}
                                renderItem={(institute) => <View style={{ marginVertical: 4 }}>
                                        <Text>{institute.item}</Text>
                                </View>}
                                keyExtractor={(item, index) => index}
                            />
                        </SafeAreaView>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setIsModalShown(!isShown)}
                        >
                            <Text style={styles.textStyle}>Hide</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default InstitutesModal


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10
    },
    modalView: {
        marginTop: 30,
        marginBottom: 20,
        marginHorizontal: 10,
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 60,
        paddingHorizontal: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    container: {
        marginTop: 10,
        marginBottom: 30
    },
    button: {
        padding: 3,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
});