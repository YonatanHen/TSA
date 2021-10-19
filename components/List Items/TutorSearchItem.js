import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native'

const TutorItem = props => {

    return (
        <View style={styles.itemContainer}>
            <View style={styles.item}>
                <Image style={{ width: 40, height: 40 , borderRadius: 100}} 
                source={props.userImage ? { uri: props.userImage } : require('../../images/Default-Profile-Picture.png')} />
                <Text>
                    I am tutor!
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#69665e'
    },
    item: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 7
    }
})

export default TutorItem