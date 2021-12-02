import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { colors } from '../../constants/colors'

const TutorItem = props => {
    const { name, userImage, distance } = props

    return (
        <View style={styles.itemContainer}>
            <View style={styles.item}>
                {userImage ? <Image style={{ width: 40, height: 40, borderRadius: 100 }}
                    source={{ uri: userImage }} /> : 
                    <Ionicons 
                        name='person-circle-outline'
                        size={40}
                        color={colors.primary}
                    />}
                <View style={styles.textConatiner}>
                    <Text style={{ fontSize: 16, fontFamily: 'sans-serif-condensed'}}>
                        {name} | {distance}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        borderBottomWidth: 1,
        borderColor: colors.primary
    },
    item: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 7
    },
    textConatiner: {
        paddingTop: 10,
        paddingLeft: 10
    }
})

export default TutorItem