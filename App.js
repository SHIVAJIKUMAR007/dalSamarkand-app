import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import {useGlobal} from 'reactn';
// import SplashScreen from 'react-native-splash-screen';
// import AuthNavigator from './src/navigations/auth-navigator';
import AppNavigator from './src/navigations/app-navigator';
import {
  notificationListner,
  requestUserPermission,
} from './src/utils/notificationService';
// import {axiosGet} from './src/axios';
import {requestForTrckingPermission} from './src/utils/userTraking';
import axios from 'axios';
import {getCart} from './src/utils/cart';

export default function App() {
  const [cart, setcart] = useGlobal('cart');
  const [user, setuser] = useGlobal('user');

  useEffect(() => {
    let isMount = true;

    async function starter() {
      if (isMount) {
        try {
          let res = await axios.get('https://dalsamarkand.com/');
          res = await res.data;
          // get cart by stored cartId
          getCart(setcart, setuser);
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
      <AppNavigator />
    </React.Fragment>
  );
}
