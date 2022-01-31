/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
// Import UXCam.
// import RNUxcam from 'react-native-ux-cam';

// // Add this line to enable iOS screen recordings
// RNUxcam.optIntoSchematicRecordings();

// // Initialize using your app key.
// RNUxcam.startWithKey('fdnsy978nlzzvki');

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
