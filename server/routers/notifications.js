const express = require('express')
const router = new express.Router()
// const request = require('request')
const { Expo } = require('expo-server-sdk')
const expo = new Expo()


router.post('/notify-students', async (req, res) => {
    var tokensQueue = req.body.tokensQueue
    const tutorName = req.body.tutorName
    const initialLength = tokensQueue.length
    for(let i=0; i<initialLength; i++) {
        let token = await tokensQueue.shift()

        if (!Expo.isExpoPushToken(token)) {
            console.error(`expo-push-token is not a valid Expo push token`)
        } else {
            const messages = []
            const message = {
                to: 'ExponentPushToken[kFVlYhGbmwbIA4XZ5PqiSK]',
                // `${token}`,
                data: { extraData: 'Some data' },
                title: `${tutorName} has added new available lesson`,
                body: 'Enter the TSA app to check this out',
            }
            messages.push(message)
            const chunks = expo.chunkPushNotifications(messages)
            const tickets = []

            try {
                for (const chunk of chunks) {
                    try {
                        const ticketChunk = await expo.sendPushNotificationsAsync(chunk)
                        tickets.push(...ticketChunk)
                    } catch (error) {
                        console.error(error)
                    }
                }
            } catch (error) {
                console.error(error)
            }
        }

        // Informing the students by the order they were entered the queue.
        // await setTimeout(() => console.log('waiting...'), 3000)
    }
    // const messages = []
    // const message = {
    //     to: 'ExponentPushToken[kFVlYhGbmwbIA4XZ5PqiSK]',
    //     // `${token}`,
    //     data: { extraData: 'Some data' },
    //     title: `dsd has added new available lesson`,
    //     body: 'Enter the TSA app to check this out',
    // }
    // messages.push(message)
    // const chunks = expo.chunkPushNotifications(messages)
    // const tickets = []
    // try {
    //     for (const chunk of chunks) {
    //         try {
    //             const ticketChunk = await expo.sendPushNotificationsAsync(chunk)
    //             tickets.push(...ticketChunk)
    //         } catch (error) {
    //             console.error(error)
    //         }
    //     }
    // } catch (error) {
    //     console.error(error)
    // }

    // let receiptIds = [];
    // for (let ticket of tickets) {
    //     if (ticket.id) {
    //         receiptIds.push(ticket.id);
    //     }
    // }

    // let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
    // for (let chunk of receiptIdChunks) {
    //     try {
    //         let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
    //         console.log(receipts);
    //         for (let receiptId in receipts) {
    //             let { status, message, details } = receipts[receiptId];
    //             if (status === 'ok') {
    //                 continue;
    //             } else if (status === 'error') {
    //                 console.error(
    //                     `There was an error sending a notification: ${message}`
    //                 );
    //                 if (details && details.error) {
    //                     console.error(`The error code is ${details.error}`);
    //                 }
    //             }
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    res.send()

})

module.exports = router

// for (let i = 0; i < initialLength; i++) {
    //         let token = tokensQueue.shift()
    //         let message = {
    //             to: token,
    //             sound: 'default',
    //             title: 'New Available lesson!',
    //             body: `${tutorName} has been added new lesson, check this out!`,
    //             // data: { someData: 'goes here' },
    //         };

    //         request.post({
    //             url: 'https://exp.host/--/api/v2/push/send',
    //             json: false,
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Accept-encoding': 'gzip, deflate',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(message),
    //         }, (err, response, body) => {
    //             if (err) {
    //                 console.log(err)
    //             } else if (response.statusCode === 200) {
    //                 console.log('message sent')
    //             } else {
    //                 console.log(response.statusCode);
    //             }
    //         })
    //         res.send()

    //         i < initialLength && await setTimeout(() => {console.log('waiting...')}, 3000)
    //     }

