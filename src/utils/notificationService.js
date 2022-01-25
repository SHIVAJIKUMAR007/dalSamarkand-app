import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // console.log('Authorization status:', authStatus);
    let token = await getfcmToken();
    return token;
  } else return null;
}

export const getfcmToken = async () => {
  let token = await AsyncStorage.getItem('dalSamarkandFcmToken');

  if (!token) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        // console.log(fcmToken + '->new fcm tokens');
        await AsyncStorage.setItem('dalSamarkandFcmToken', fcmToken);
      }
      return fcmToken;
    } catch (error) {
      console.log(error, 'error in fcm tokens');
      return null;
    }
  } else {
    // console.log('old token --->', token);
    return token;
  }
};

export const notificationListner = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging().onMessage(async remoteMessage => {
    console.log('recieve in background', remoteMessage);
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};
