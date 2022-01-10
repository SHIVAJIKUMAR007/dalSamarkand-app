import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CustomHeader from '../../../../components/custom-header';
import styles from './style';
import BrownBtn from '../../../../components/brown-btn';
import {ICONS} from '../../../../constants/icons';
import InputBox from '../../../../components/input-box';
import axios, {axiosPost} from '../../../../axios';
import {useGlobal} from 'reactn';
import AsyncStorage from '@react-native-community/async-storage';
import {dalsamarkandJwtToken} from '../../../../constants/appConstant';

export default function OtpVarification({navigation, route}) {
  let mobileNumber = route?.params?.mobileNumber;
  let isLogin = route?.params?.isLogin;
  const [otp, setotp] = useState(null);
  const [user, setuser] = useGlobal('user');
  const [token, settoken] = useGlobal('jwtToken');
  const [isSubmitting, setisSubmitting] = useState(false);

  async function resendOtp() {
    try {
      let res = await axios.post('auth/resend_otp', {
        phone: mobileNumber,
        code: otp,
      });
      res = res.data;
      if (res.status_code == 1) Alert.alert('Success', res.message);
      else Alert.alert('Fail', res.message);

      console.log(res, '+++++++++++>26');
    } catch (error) {
      console.log(error);
    }
  }

  async function submitOtp() {
    setisSubmitting(true);
    try {
      axiosPost(
        'auth/verify_otp',
        {phone: mobileNumber, code: otp},
        data => {
          console.log(data);

          Alert.alert(
            isLogin ? 'Login success' : 'Register success',
            data.message,
          );
          AsyncStorage.setItem(dalsamarkandJwtToken, data?.token);
          settoken(data?.token);
          setisSubmitting(false);
          setuser({_id: 1});
          navigation.popToTop();
          navigation.navigate('HomeScreen');
        },
        res => {
          Alert.alert(isLogin ? 'Login fail' : 'Register fail', res.message);
          setisSubmitting(false);
        },
        null,
        navigation,
        setuser,
      );
    } catch (error) {
      console.log(error);
      setisSubmitting(false);
    }

    setTimeout(() => {
      setisSubmitting(false);
    }, 3000);
  }
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />

      <CustomHeader title={isLogin ? 'Login' : 'Register'} />
      <View style={styles.emptyContainer}>
        <Image source={ICONS.LOCK} style={styles.image} />
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
  );
}
