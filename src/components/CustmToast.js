import {Alert, Platform} from 'react-native';

export const SuccessToast = (toast, success) => {
  if (Platform.OS == 'ios') {
    Alert.alert('Success', success);
  } else
    toast.show(success, {
      type: 'success',
      placement: 'bottom',
      duration: 2500,
      offset: 50,
      animationType: 'slide-in',
    });
};

export const ErrorToast = (toast, error) => {
  if (Platform.OS == 'ios') {
    Alert.alert('Error', error);
  } else
    toast.show(error, {
      type: 'danger',
      placement: 'bottom',
      duration: 2500,
      offset: 50,
      animationType: 'slide-in',
    });
};

export const infoToast = (toast, info) => {
  if (Platform.OS == 'ios') {
    Alert.alert('Hey wait', info);
  } else
    toast.show(info, {
      type: 'warning',
      placement: 'bottom',
      duration: 2500,
      offset: 50,
      animationType: 'slide-in',
    });
};
