import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
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

export default function OtpVarification({navigation, route}) {
  let mobileNumber = route?.params?.mobileNumber;
  let isLogin = route?.params?.isLogin;
  const [otp, setotp] = useState(null);
  const [user, setuser] = useGlobal('user');
  const [token, settoken] = useGlobal('jwtToken');
  const [isSubmitting, setisSubmitting] = useState(false);

  async function resendOtp() {
    console.log('in resend');
    try {
      ///// api is not working
      let res = await axios.post('auth/resend_otp', {
        phone: mobileNumber,
        code: otp,
      });
      res = res.data;
      console.log(res, '+++++++++++>26');
      if (res.status_code == 1) {
        AlertMsg(res.message);
        // Alert.alert('Success', res.message);
      } else {
        AlertMsg(res.message);
        // Alert.alert('Fail', res.message);
      }
    } catch (error) {
      AlertMsg(error.message);
      console.log(error, 'sdjfk');
    }
  }

  async function submitOtp() {
    setisSubmitting(true);
    let form = {phone: mobileNumber, code: otp};
    try {
      let cartId = await AsyncStorage.getItem(dalsamarkandCartId);
      if (cartId) {
        form = {...form, cart_id: cartId};
      }
      axiosPost(
        'auth/verify_otp',
        form,
        data => {
          console.log(data);
          AlertMsg(isLogin ? 'Login success' : 'Register success');
          // Alert.alert(
          //   isLogin ? 'Login success' : 'Register success',
          //   data.message,
          // );
          AsyncStorage.setItem(dalsamarkandJwtToken, data?.token);
          settoken(data?.token);
          setisSubmitting(false);
          setuser({_id: 1});
          // if (cartId) {
          //   navigation.popToTop();
          //   navigation.navigate('Cart');
          // } else {
          //   navigation.popToTop();
          //   navigation.navigate('HomeScreen');
          // }
          navigation.popToTop();
          navigation.navigate('HomeScreen');
        },
        res => {
          AlertMsg(
            isLogin
              ? 'Login fail, ' + res.message
              : 'Register fail, ' + res.message,
          );

          // Alert.alert(isLogin ? 'Login fail' : 'Register fail', res.message);
          setisSubmitting(false);
        },
        null,
        navigation,
        setuser,
      );
    } catch (error) {
      console.log(error);
      AlertMsg(error.message);
      setisSubmitting(false);
    }

    setTimeout(() => {
      setisSubmitting(false);
    }, 3000);
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="dark-content"
        />

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
            <TouchableOpacity onPress={resendOtp}>
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
