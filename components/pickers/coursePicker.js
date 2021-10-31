import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import Dialog from "react-native-dialog";


const CoursePicker = props => {
    
    const { visible, setDialogVisibility } = props

    return (
        <View>
            <Dialog.Container visible={visible}>
                <Dialog.Title>Select Courses</Dialog.Title>
                <Dialog.Description>
                    Press on the courses that you want to learn in the selcted lesson: 
                </Dialog.Description>
                <Dialog.Switch label='Algorithms'/>
                <Dialog.Button label="Cancel" onPress={()=>setDialogVisibility(false)}/>
                <Dialog.Button label="Delete" onPress={()=>setDialogVisibility(false)}/>
            </Dialog.Container>
        </View>
    )
}



export default CoursePicker