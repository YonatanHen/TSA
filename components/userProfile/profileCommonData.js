import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'


export const ProfileCommonData = props => {
    const { user } = props
    return (
        <>
            <View style={styles.profileContainer}>
                <View style={styles.image}>
                    <Image style={{ width: 180, height: 180, borderRadius: 100, borderColor: 'deepskyblue', borderWidth: 5 }}
                        source={user.imageUrl ? { uri: user.imageUrl } : require('../../images/Default-Profile-Picture.png')} />
                </View>
                <View style={styles.nameHeader}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'dodgerblue' }}>
                        {user.firstName} {user.lastName}
                    </Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.sectionTitle}>
                    <Text style={{ fontSize: 16, ...styles.sectionTitleText }}>
                        Location:
                            </Text>
                </View>
                <View style={styles.sectionContent}>
                    <Text style={{ fontSize: 16 }}>
                        {user.country} , {user.city}
                    </Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.sectionTitle}>
                    <Text style={{ fontSize: 16, ...styles.sectionTitleText }}>
                        Phone:
                        </Text>
                </View>
                <View style={styles.sectionContent}>
                    <Text style={{ fontSize: 16 }}>
                        {user.phone ? user.phone : 'TBD'}
                    </Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.sectionTitle}>
                    <Text style={{ fontSize: 16, ...styles.sectionTitleText }}>
                        Bio:
                        </Text>
                </View>
                <View style={styles.sectionContent}>
                    <Text style={{ fontSize: 16 }}>
                        {user.bio ? user.bio : 'TBD'}
                    </Text>
                </View>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        marginBottom: '5%'
    },
    image: {
        marginTop: '5%'
    },
    nameHeader: {
        marginTop: '3%',
    },
    row: {
        flexDirection: 'row',
        marginBottom: '3%'
    },
    sectionTitle: {
        flex: 5,
        paddingStart: '2%',
        alignItems: 'center'
    },
    sectionContent: {
        flex: 14,
        alignItems: 'center'
    },
    sectionTitleText: {
        fontWeight: 'bold',
        color: 'deepskyblue'
    }
})