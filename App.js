import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import AppNavigator from './src/navigations/app-navigator';
import {
  notificationListner,
  requestUserPermission,
} from './src/utils/notificationService';
import {requestForTrckingPermission} from './src/utils/userTraking';
import {ToastProvider} from 'react-native-toast-notifications';

import axios from 'axios';
import {
  ErrorAlert,
  SuccessAlert,
  WarnAlert,
} from './src/components/alert/Alerts';
import {useGlobal} from 'reactn';

export default function App() {
  const [errorAlert, seterrorAlert] = useGlobal('errorAlert');
  const [successAlert, setsuccessAlert] = useGlobal('successAlert');
  const [warnAlert, setwarnAlert] = useGlobal('warnAlert');

  useEffect(() => {
    seterrorAlert({visible: false, message: ''});
    setsuccessAlert({visible: false, message: ''});
    setwarnAlert({visible: false, message: ''});
    let isMount = true;

    async function starter() {
      if (isMount) {
        try {
          let res = await axios.get('https://dalsamarkand.com/');
          res = await res.data;
        } catch (error) {
          console.log(error);
        }
      }
    }
    starter();
    return () => {
      isMount = false;
    };
  }, []);

  useEffect(() => {
    requestUserPermission();
    notificationListner();
    requestForTrckingPermission();
  }, []);
  return (
    <React.Fragment>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />

      {/* {user ? <AppNavigator /> : <AuthNavigator />} */}
      <ToastProvider>
        <AppNavigator />
      </ToastProvider>
      <SuccessAlert />
      <ErrorAlert />
      <WarnAlert />
    </React.Fragment>
  );
}
