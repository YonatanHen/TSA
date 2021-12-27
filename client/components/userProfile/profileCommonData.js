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
                    {user.imageUrl ? <Image style={{ width: 180, height: 180, borderRadius: 100, borderColor: colors.primary, borderWidth: 5 }}
                        source={{ uri: user.imageUrl }} /> : <Ionicons name="person-circle" size={160} color={colors.secondary} />}
                </View>
                <View style={styles.nameHeader}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: colors.primary }}>
                        {user.firstName} {user.lastName}
                    </Text>
                </View>
            </View>
            {loggedInUser && user.uid !== loggedInUser.uid && <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
                <View style={styles.icon}>
                    <Ionicons
                        name="logo-whatsapp"
                        size={30}
                        color={colors.tertiary}
                        onPress={() => openUrl('whatsapp')}
                    />
                </View>
                <View style={styles.icon}>
                    <Ionicons
                        name="call-outline"
                        size={30}
                        color={colors.tertiary}
                        onPress={() => openUrl('tel')}
                    />
                </View>
                <View style={styles.icon}>
                    <Ionicons
                        name="mail-outline"
                        size={30}
                        color={colors.tertiary}
                        onPress={() => openUrl('mail')}
                    />
                </View>
                <View style={styles.icon}>
                    <Ionicons
                        name="phone-portrait-outline"
                        size={30}
                        color={colors.tertiary}
                        onPress={() => openUrl('sms')}
                    />
                </View>
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
                        About:
                        </Text>
                </View>
                <View style={styles.sectionContent}>
                    <Text style={{ fontSize: 16, textAlign: 'center' }}>
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
        marginBottom: '5%',
    },
    image: {
        marginTop: '5%'
    },
    nameHeader: {
        marginTop: '3%',
    },
    row: {
        flexDirection: 'row',
        marginBottom: '3%',
        alignItems: 'center',
    },
    sectionTitle: {
        flex: 5,
        paddingStart: '2%',
        alignItems: 'center'
    },
    sectionContent: {
        flex: 14,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    sectionTitleText: {
        fontWeight: 'bold',
        color: colors.primary
    },
    icon: {
        marginHorizontal: 3
    }
})