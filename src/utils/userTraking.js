import {
  getTrackingStatus,
  requestTrackingPermission,
} from 'react-native-tracking-transparency';
import {Platform} from 'react-native';

///////////////////////////////////////////////////////////////////
// configuration permission in ios for tracking users
///////////////////////////////////////////////////////////////////
export const requestForTrckingPermission = async () => {
  // console.log('inside request tracking permission function');
  if (Platform.OS != 'ios') return true;
  const trackingStatus = await requestTrackingPermission();
  if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
    // enable tracking features
    return true;
  }
  return false;
};

export const getTrackingPermissionStatus = async alertMessage => {
  if (Platform.OS != 'ios') return true;
  const trackingStatus = await getTrackingStatus();
  if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
    // enable tracking features
    return true;
  }
  return false;
};
