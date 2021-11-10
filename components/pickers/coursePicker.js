import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import Dialog from "react-native-dialog";


const CoursePicker = props => {
    const { visible, setDialogVisibility, coursesList, setSelectedCourse, selectedCourse, scheduleLessonHandler } = props


    return (
        <View>
            <Dialog.Container visible={visible}>
                <Dialog.Title>Select Courses</Dialog.Title>
                <Dialog.Description>
                    Press on the course that you want to learn:
                </Dialog.Description>
                {coursesList.map(courseName => {
                    if (selectedCourse && selectedCourse !== courseName) return (
                        <Dialog.Switch key={courseName} label={courseName} disabled={true} value={false} />
                    )
                    else if (!selectedCourse) return (
                        <Dialog.Switch key={courseName} label={courseName} disabled={false} value={false} onValueChange={() => setSelectedCourse(courseName)} />
                    )
                    else if (selectedCourse && selectedCourse === courseName) return (
                        <Dialog.Switch key={courseName} label={courseName} disabled={false} value={true} onValueChange={() => setSelectedCourse()} />
                    )
                })}
                <Dialog.Button label="Cancel" onPress={() => setDialogVisibility(false)} />
                <Dialog.Button label="Schedule a Lesson!" onPress={async () => {
                    await setDialogVisibility(false)
                    await scheduleLessonHandler()
                }} />
            </Dialog.Container>
        </View>
    )
}



export default CoursePicker