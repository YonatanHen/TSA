import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, SectionList, View, TextInput, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { colors } from '../../constants/colors'


const AdminMainScreen = props => {
    const [searchInput, setSearchInput] = useState('')
    const users = useSelector(state => state.representationLists.usersList)
    const adminInstitue = useSelector(state => state.data.institute)

    const filteredTutors = users.tutors.filter(tutor => tutor[1].institute == adminInstitue)
    const filteredStudents = users.students.filter(student => student[1].institute == adminInstitue)

    useEffect(() => {
    }, [users, searchInput])

    const textChangeHandler = text => {
        setSearchInput(text)
    }

    return (
        <View style={{ padding: 5 }}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={searchInput}
                    onChangeText={textChangeHandler}
                    placeholder='Search by name / Email'
                />
            </View>
            {users ? (<SectionList
                sections={[
                    {
                        title: <Text style={{ color: colors.primary}}>Tutors</Text>, data: filteredTutors.length > 0 ?
                            (filteredTutors.filter(tutor => `${tutor[1].firstName} ${tutor[1].lastName}`.includes(searchInput) 
                            || tutor[1].email.includes(searchInput))
                                .map(tutor => {
                                    return (
                                        <TouchableOpacity onPress={() => props.navigation.navigate("User Profile", { user: tutor[1] })}>
                                            <Text style={{...styles.userText, color: tutor[1].disabled ? 'red' : 'black'}}>
                                                {tutor[1].firstName} {tutor[1].lastName}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })) : ['No tutors found']
                    },
                    {
                        title: <Text style={{ color: colors.primary}}>Students</Text>, data: filteredStudents.length > 0 ?
                            (filteredStudents.filter(student => `${student[1].firstName} ${student[1].lastName}`.includes(searchInput)
                            || student[1].email.includes(searchInput))
                                .map(student => {
                                    return (
                                        <TouchableOpacity onPress={() => props.navigation.navigate("User Profile", { user: student[1] })}>
                                            <Text style={{...styles.userText, color: student[1].disabled ? 'red' : 'black'}}>
                                                {student[1].firstName} {student[1].lastName}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })) : ['No students found.']
                    }
                ]}
                renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
            />) : (
                <Text>
                    Loading...
                </Text>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: colors.secondary,
    },
    inputContainer: {
        marginVertical: 20,
        paddingHorizontal: 10
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 2,
        marginBottom: 2
    }, 
    userText: {
        fontSize: 15,
    }
})

export default AdminMainScreen