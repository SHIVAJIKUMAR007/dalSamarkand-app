import React from 'react';
import {ToastAndroid, Alert, Platform} from 'react-native';

export default function AlertMsg(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert('', msg);
  }
}
