import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import CustomHeader from '../../../../components/custom-header';
import styles from './style';
import BrownBtn from '../../../../components/brown-btn';
import {ICONS} from '../../../../constants/icons';
import InputBox from '../../../../components/input-box';
import axios, {axiosPost} from '../../../../axios';
import {useGlobal} from 'reactn';
import AsyncStorage from '@react-native-community/async-storage';
import {
  dalsamarkandCartId,
  dalsamarkandJwtToken,
} from '../../../../constants/appConstant';
import AlertMsg from '../../../../components/alert-msg';
import {useToast} from 'react-native-toast-notifications';
import {ErrorToast, SuccessToast} from '../../../../components/CustmToast';
import {requestUserPermission} from '../../../../utils/notificationService';
const {width, height} = Dimensions.get('window');

export default function OtpVarification({navigation, route}) {
  let mobileNumber = route?.params?.mobileNumber;
  let isLogin = route?.params?.isLogin;
  const [otp, setotp] = useState(null);
  const [user, setuser] = useGlobal('user');
  const [token, settoken] = useGlobal('jwtToken');
  const [isSubmitting, setisSubmitting] = useState(false);
  const [resendEnable, setresendEnable] = useState(true);
  const toast = useToast();
  const [errorAlert, seterrorAlert] = useGlobal('errorAlert');
  const [successAlert, setsuccessAlert] = useGlobal('successAlert');
  const [warnAlert, setwarnAlert] = useGlobal('warnAlert');

  async function resendOtp() {
    console.log('in resend');
    if (!resendEnable) {
      setwarnAlert({
        visible: true,
        message:
          'Please wait atleaset of 30 second, your request has been sent. ',
      });
      return;
    }

    try {
      let res = await axios.post('auth/resend_otp', {
        phone: mobileNumber,
        code: otp,
      });
      res = res.data;
      console.log(res, '+++++++++++>26');
      if (res.status_code == 1) {
        setresendEnable(false);
        setTimeout(() => {
          setresendEnable(true);
        }, 30000);
        // AlertMsg(res.message);
        // SuccessToast(toast, res.message);
        setsuccessAlert({
          visible: true,
          message: res.message,
        });
        // Alert.alert('Success', res.message);
      } else {
        // AlertMsg(res.message);
        // ErrorToast(toast, res.message || res.error || JSON.stringify(res));
        seterrorAlert({
          visible: true,
          message: res.message || res.error || JSON.stringify(res),
        });
        // Alert.alert('Fail', res.message);
      }
    } catch (error) {
      // AlertMsg(error.message);
      // ErrorToast(toast, error.message || error.error || JSON.stringify(error));
      seterrorAlert({
        visible: true,
        message: error.message || error.error || JSON.stringify(error),
      });

      console.log(error, 'sdjfk');
    }
  }

  async function submitOtp() {
    setisSubmitting(true);

    try {
      let fcmToken = await requestUserPermission();
      console.log(fcmToken, 'token');
      let form = {phone: mobileNumber, code: otp, device_token: fcmToken};
      let cartId = await AsyncStorage.getItem(dalsamarkandCartId);
      if (cartId) {
        form = {...form, cart_id: cartId};
      }
      axiosPost(
        'auth/verify_otp',
        form,
        async data => {
          await AsyncStorage.setItem(dalsamarkandJwtToken, data?.token);
          console.log(data);
          // SuccessToast(toast, );
          setsuccessAlert({
            visible: true,
            message: isLogin ? 'Login success' : 'Register success',
          });
          settoken(data?.token);
          setisSubmitting(false);
          setuser({_id: 1});
          navigation.popToTop();
          navigation.navigate('HomeScreen');
        },
        res => {
          seterrorAlert({
            visible: true,
            message: isLogin
              ? 'Login fail, ' + res.message
              : 'Register fail, ' + res.message,
          });
          // Alert.alert(isLogin ? 'Login fail' : 'Register fail', res.message);
          setisSubmitting(false);
        },
        res => {
          seterrorAlert({
            visible: true,
            message: isLogin
              ? 'Login fail, ' + res.message
              : 'Register fail, ' + res.message,
          });
          // Alert.alert(isLogin ? 'Login fail' : 'Register fail', res.message);
          setisSubmitting(false);
        },
        navigation,
        setuser,
      );
    } catch (error) {
      console.log(error);
      // ErrorToast(toast, error.message);
      seterrorAlert({
        visible: true,
        message: error.message || error.error || JSON.stringify(error),
      });
      setisSubmitting(false);
    }
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="dark-content"
        /> */}

        <CustomHeader title={isLogin ? 'Login' : 'Register'} />
        <View style={styles.emptyContainer}>
          <Image
            source={ICONS.LOCK}
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={styles.heading}>OTP Verification</Text>
          <Text style={styles.subHeading}>
            Enter OTP sent to +91 {mobileNumber}
          </Text>
          <InputBox
            placeholder="OTP"
            borderBlack
            maxLength={4}
            keyboardType="numeric"
            value={otp}
            onChangeText={val => setotp(val)}
            textCenter
          />
          <View style={styles.row}>
            <Text style={styles.tc}>Didn’t recieved the OTP? </Text>
            <TouchableOpacity disabled={isSubmitting} onPress={resendOtp}>
              <Text style={styles.tc}> RESEND OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
        <BrownBtn
          paddingHorizontal={30}
          disabled={isSubmitting}
          title="Verify & Proceed"
          onPress={submitOtp}
        />
      </View>
    </ScrollView>
  );
}
