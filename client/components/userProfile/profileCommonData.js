import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View, Image, Linking, Platform } from 'react-native'
import { colors } from '../../constants/colors'
import findPhoneCode from '../../utilities/findPhoneCode'

export const ProfileCommonData = props => {
    const { user, loggedInUser } = props

    const openUrl = (type) => {

        let url
        let error = 'An Error occured!'
        switch (type) {
            case 'sms':
                url = `sms:${user.phone}`
                break
            case 'tel':
                url = `tel:${user.phone}`
                break
            case 'mail':
                url = `mailto:${user.email}`
                error = 'Make sure that mailing application has been installed on your device.'
                break
            case 'whatsapp':
                url = `whatsapp://send?phone=${Platform.OS === 'android' ? `+${findPhoneCode(user.country)}` + user.phone : `${findPhoneCode(user.country)}` + user.phone}`
                error = 'Make sure that WhatsApp apllication has been installed on your device.'
        }

        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Unsupported url: ' + url)
            } else {
                return Linking.openURL(url)
            }
        }).catch(err => console.error(error, err))
    }


    return (
        <>
            <View style={styles.profileContainer}>
                <View style={styles.image}>
                    <Image style={{ width: 180, height: 180, borderRadius: 100, borderColor: colors.primary, borderWidth: 5 }}
                        source={user.imageUrl ? { uri: user.imageUrl } : require('../../images/Default-Profile-Picture.png')} />
                </View>
                <View style={styles.nameHeader}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: colors.primary }}>
                        {user.firstName} {user.lastName}
                    </Text>
                </View>
            </View>
            {loggedInUser && user.uid !== loggedInUser.uid && <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
                <Ionicons
                    name="logo-whatsapp"
                    size={40}
                    color="grey"
                    onPress={() => openUrl('whatsapp')}
                />
                <Ionicons
                    name="call"
                    size={40}
                    color="grey"
                    onPress={() => openUrl('tel')}
                />
                <Ionicons
                    borderWidth={2}
                    name="mail"
                    size={40}
                    color="grey"
                    onPress={() => openUrl('mail')}
                />
                <Ionicons
                    name="phone-portrait"
                    size={40}
                    color="grey"
                    onPress={() => openUrl('sms')}
                />
            </View>}
            <View style={styles.row}>
                <View style={styles.sectionTitle}>
                    <Text style={{ fontSize: 16, ...styles.sectionTitleText }}>
                        Location:
                            </Text>
                </View>
                <View style={styles.sectionContent}>
                    <Text style={{ fontSize: 16 }}>
                        {user.country} {user.city && `, ${user.city}`}
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
        color: colors.primary
    }
})