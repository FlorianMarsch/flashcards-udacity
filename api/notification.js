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
            repeat: 'minute',
            //repeat: 'day',
        }
    );
}

export const enableNotification = () => {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then((alreadyNotified) => {
            let nextNotification = new Date();
            if (!alreadyNotified) {
                const oneMinute = 60 * 1000;
                nextNotification.setTime(nextNotification.getTime() + oneMinute);
                AsyncStorage.setItem(NOTIFICATION_KEY, 'started');
            }
            Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then(({ status }) => {
                    if (status === 'granted') {
                        scheduleNotification(nextNotification);
                    } else {
                        Alert.alert(
                            'Cannot apply Notification',
                            'Please grant permission! status = ' + status
                        )
                    }

                    // why undertermined?
                })
        })
};



