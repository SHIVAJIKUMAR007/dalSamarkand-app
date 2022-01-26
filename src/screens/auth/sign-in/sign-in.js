import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ImageBackground,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';
import InputBox from '../../../components/input-box';
import styles from './style';
import {COLORS} from '../../../constants/colors';
import {IMAGES} from '../../../constants/images';
import Feather from 'react-native-vector-icons/Feather';
import {ICONS} from '../../../constants/icons';
import ShadowBtn from '../../../components/shadow-btn';
import {useGlobal} from 'reactn';
import {axiosPost} from '../../../axios';
import {useNavigation} from '@react-navigation/core';
import {ErrorToast, SuccessToast} from '../../../components/CustmToast';
import {useToast} from 'react-native-toast-notifications';

export default function SignIn(props) {
  const [phoneNo, setPhoneNo] = useState('');
  const [user, setuser] = useGlobal('user');
  const [token, settoken] = useGlobal('jwtToken');
  const [isSubmitting, setisSubmitting] = useState(false);
  const toast = useToast();
  const [errorAlert, seterrorAlert] = useGlobal('errorAlert');
  const [successAlert, setsuccessAlert] = useGlobal('successAlert');
  const [warnAlert, setwarnAlert] = useGlobal('warnAlert');
  const navigation = useNavigation();

  const onSubmit = async () => {
    if (phoneNo?.length != 10) {
      // ErrorToast(toast, 'Mobile number must be of 10 digit.');
      seterrorAlert({
        visible: true,
        message: 'Mobile number must be of 10 digit.',
      });

      return false;
    }
    setisSubmitting(true);
    // console.log(phoneNo);

    try {
      let loginData = {phone: phoneNo};

      axiosPost(
        'auth/login',
        loginData,
        async response => {
          // SuccessToast(toast, response.message || JSON.stringify(response));
          setsuccessAlert({
            visible: true,
            message: response.message || JSON.stringify(response),
          });
          // Alert.alert('Success', response.message);
          setisSubmitting(false);
          navigation.navigate('OtpSignup', {
            mobileNumber: phoneNo,
            isLogin: true,
          });
        },
        error => {
          console.log(error.message, '====>58');
          // Alert.alert('Error', error?.message);
          // ErrorToast(toast, error.message);
          seterrorAlert({
            visible: true,
            message: error.message || JSON.stringify(error),
          });
        },
        error => {
          console.log(error.message, '====>58');
          // Alert.alert('Error', error?.message);
          // ErrorToast(toast, error.message);
          seterrorAlert({
            visible: true,
            message: error.message || JSON.stringify(error),
          });
        },
        navigation,
        setuser,
      );
    } catch (error) {
      setisSubmitting(false);
      seterrorAlert({
        visible: true,
        message: error.message || JSON.stringify(error),
      });
    }

    setTimeout(() => {
      setisSubmitting(false);
    }, 3000);
  };

  return (
    <ScrollView>
      <View
        colors={[COLORS.PRIMARY, COLORS.SECONDARY]}
        style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="light-content"
        />

        <ImageBackground source={IMAGES.AUTH_BG} style={styles.bg}>
          <Image
            source={ICONS.BORDER_BOTTOM_LEFT}
            style={[styles.border, {bottom: 15, left: 15}]}
          />
          <Image
            source={ICONS.BORDER_BOTTOM_RIGHT}
            style={[styles.border, {bottom: 15, right: 15}]}
          />
          <Image
            source={ICONS.BORDER_TOP_LEFT}
            style={[styles.border, {top: 15, left: 15}]}
          />
          <Image
            source={ICONS.BORDER_TOP_RIGHT}
            style={[styles.border, {top: 15, right: 15}]}
          />
          <View style={styles.headingContainer}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Feather name="chevron-left" color={COLORS.WHITE} size={24} />
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <Text style={styles.heading}>Sign In/ Sign Up</Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.bottomContainer}>
          <InputBox
            // label="Mobile Number"
            keyboardType="number-pad"
            value={phoneNo}
            placeholder="Mobile number"
            maxLength={10}
            onChangeText={text => setPhoneNo(text)}
            instruction="Mobile number must be of 10 digits."
          />
          <Text style={styles.tc}>
            By signing in you agree to our terms & conditions
          </Text>
          <ShadowBtn
            marginVertical={10}
            disabled={phoneNo.length < 10 ? true : false}
            isLoading={isSubmitting}
            title="Proceed via OTP"
            onPress={() => onSubmit()}
          />

          <View style={styles.row}>
            <Text style={styles.tc2}>First Time ? </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Signup')}>
              <Text style={[styles.tc2, {color: 'yellow'}]}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
