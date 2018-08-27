import { Notifications, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';

import {
    Alert
} from 'react-native';


const NOTIFICATION_KEY = 'notifications';

let scheduleNotification = (nextNotification) => {
    Notifications.scheduleLocalNotificationAsync(
        {
            title: 'Start the Quiz',
            body: "You havent started a Game today"
        },
        {
            time: nextNotification,
            repeat: 'day',
        }
    );
}

let alert = (status) => {
    Alert.alert(
        'Cannot apply Notification',
        'Please grant permission! status = ' + status
    )
}

export const clearNotification = () => {
    /*
    It'd be a good idea to create a function to clear all notifications. That way, you could reset the schedule when a Quiz is finished, setting it again from the next day on.
    */

    AsyncStorage.setItem(NOTIFICATION_KEY, false);
    enableNotification();
}

export const enableNotification = () => {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then((alreadyNotified) => {
            let nextNotification = new Date();
            if (!alreadyNotified) {
                const oneDay = 1000 * 60 * 60 * 24;
                nextNotification.setTime(nextNotification.getTime() + oneDay);
                AsyncStorage.setItem(NOTIFICATION_KEY, 'started');
            }
            Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then(({ status }) => {
                    if (status === 'granted') {
                        scheduleNotification(nextNotification);
                    } else {
                        alert(status);
                    }

                    // why undertermined?
                })
        })
};



