import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import Dialog from "react-native-dialog";


const CoursePicker = props => {
    const { visible, setDialogVisibility, coursesList } = props
    const [selectedCourse, setSelectedCourse] = useState()


    console.log(coursesList)
    return (
        <View>
            <Dialog.Container visible={visible}>
                <Dialog.Title>Select Courses</Dialog.Title>
                <Dialog.Description>
                    Press on the courses that you want to learn in the selcted lesson: 
                </Dialog.Description>
                {coursesList.map(courseName => {
                    if(selectedCourse && selectedCourse !== courseName) return (
                        <Dialog.Switch key={courseName} label={courseName} disabled={true} value={false}/>
                    )
                    else if (!selectedCourse) return (
                        <Dialog.Switch key={courseName} label={courseName} disabled={false} value={false} onValueChange={() => setSelectedCourse(courseName)}/>
                    )
                    else if (selectedCourse && selectedCourse === courseName) return (
                        <Dialog.Switch key={courseName} label={courseName} disabled={false} value={true} onValueChange={() => setSelectedCourse()}/>
                    )
                })}
                <Dialog.Button label="Cancel" onPress={()=>setDialogVisibility(false)}/>
                <Dialog.Button label="Delete" onPress={()=>setDialogVisibility(false)}/>
            </Dialog.Container>
        </View>
    )
}



export default CoursePicker