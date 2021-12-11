const express = require('express')
const router = new express.Router()
const { Expo } = require('expo-server-sdk')
const expo = new Expo()

function wait(ms) {
    return new Promise(resolve => { setTimeout(resolve, ms); });
}

router.post('/notify-students', async (req, res) => {
    const { title, body } = req.body
    var tokensQueue = req.body.tokensQueue

    const initialLength = tokensQueue.length
    for (let i = 0; i < initialLength; i++) {
        let token = await tokensQueue.shift()

        if (!Expo.isExpoPushToken(token)) {
            console.error(`expo-push-token is not a valid Expo push token`)
        } else {
            const messages = []
            const message = {
                to: `${token}`,
                title: title,
                body: body,
            }


            messages.push(message)
            const chunks = expo.chunkPushNotifications(messages)
            const tickets = []
            try {
                for (const chunk of chunks) {
                    try {
                        const ticketChunk = await expo.sendPushNotificationsAsync(chunk)
                        await wait(60000)
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
