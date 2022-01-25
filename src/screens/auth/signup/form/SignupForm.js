import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ImageBackground,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import InputBox from '../../../../components/input-box';
import styles from './style';
import {COLORS} from '../../../../constants/colors';
import {IMAGES} from '../../../../constants/images';
import Feather from 'react-native-vector-icons/Feather';
import {ICONS} from '../../../../constants/icons';
import {useGlobal} from 'reactn';
import BrownBtn from '../../../../components/brown-btn';
import {useNavigation} from '@react-navigation/core';
import {axiosPost} from '../../../../axios';
import {CheckBox} from 'react-native-elements';
import {ErrorToast, SuccessToast} from '../../../../components/CustmToast';
import {useToast} from 'react-native-toast-notifications';

export default function SignupForm(props) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const navigation = useNavigation();
  const [user, setuser] = useGlobal('user');
  const [registerData, setregisterData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [isSubmitting, setisSubmitting] = useState(false);
  const [isValidForm, setisValidForm] = useState(false);
  const toast = useToast();
  function validateFormConti(registerData, toggleCheckBox) {
    let validEmailType = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      !registerData?.email?.match(validEmailType) ||
      !registerData?.name ||
      registerData?.phone?.length != 10 ||
      !toggleCheckBox
    ) {
      console.log('no');
      setisValidForm(false);
      return;
    }
    console.log('yes');
    setisValidForm(true);
    return;
  }
  function validateForm() {
    if (registerData?.name == '') {
      // Alert.alert('Please Check', );
      ErrorToast(toast, 'Name field is required.');

      return false;
    }
    let validEmailType = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!registerData?.email.match(validEmailType)) {
      // Alert.alert('Please Check',);
      ErrorToast(toast, 'Email is not valid.');

      return false;
    }
    if (registerData?.phone.length != 10) {
      // Alert.alert('Please Check',);
      ErrorToast(toast, 'Mobile number must be of 10 digit.');

      return false;
    }
    if (toggleCheckBox === false) {
      // Alert.alert(
      //   Platform.OS == 'ios' ? 'Permission required' : 'Please check',
      // );
      ErrorToast(
        toast,
        Platform.OS == 'ios'
          ? 'You need to accept our terms and conditions and give tracking permission before proceed for that go to Settings -> Privacy -> Tracking and turn on permission for AIBA.'
          : 'You need to accept our terms and conditions before proceed',
      );

      return false;
    }
    return true;
  }
  const onSubmit = async () => {
    if (!validateForm()) return;
    setisSubmitting(true);

    setregisterData(pre => {
      return {...pre, email: pre.email.toLowerCase()};
    });
    try {
      axiosPost(
        'auth/register',
        registerData,
        data => {
          console.log(data);
          // Alert.alert('Success', data.message);
          SuccessToast(toast, data.message);
          setisSubmitting(false);
          props.navigation.navigate('OtpSignup', {
            mobileNumber: registerData?.phone,
            isLogin: false,
          });
        },
        res => {
          // console.log(res, 'status 0');
          // Alert.alert('Error', res?.message);
          ErrorToast(toast, res.message || res.error || JSON.stringify(res));
          setisSubmitting(false);
        },
        res => {
          // console.log(res);
          let error = res?.err?.keyValue;
          let errStr = '';
          for (let key in error) {
            errStr += `${error[key]} is duplicate`;
          }
          ErrorToast(toast, errStr);
          setisSubmitting(false);

          // Alert.alert('Error', errStr);
        },
        navigation,
        setuser,
      );
    } catch (error) {
      setisSubmitting(false);
      // console.log(error);
      // Alert.alert('Error', error.message);
      ErrorToast(toast, error.message);
    }
    setTimeout(() => {
      setisSubmitting(false);
    }, 5000);
  };

  const acceptTermsFunction = async newValue => {
    setToggleCheckBox(newValue);
    validateFormConti(registerData, newValue);
    return;
    // if (Platform.OS != 'ios') {
    //   setToggleCheckBox(newValue);
    //   return;
    // }
    // if (!newValue) {
    //   setToggleCheckBox(newValue);
    //   return;
    // }
    // try {
    //   let TrackingPermissionIos = await getTrackingPermissionStatus();
    //   console.log(TrackingPermissionIos);
    //   if (TrackingPermissionIos) {
    //     setToggleCheckBox(newValue);
    //     return;
    //   }
    //   Alert.alert(
    //     'Tracking permission required',
    //     'You need to accept our terms and conditions and give tracking permission before proceed, for that go to Settings -> Privacy -> Tracking and turn on permission for Dal Samarkand.',
    //   );
    // } catch (error) {
    //   console.log(error);
    // }
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
        <ImageBackground
          resizeMode="cover"
          source={IMAGES.AUTH_BG}
          style={styles.bg}>
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="chevron-left" color={COLORS.WHITE} size={24} />
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <Text style={styles.heading}>Register</Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.bottomContainer}>
          <InputBox
            label="Name"
            value={registerData?.name}
            onChangeText={text =>
              setregisterData(pre => {
                pre = {...pre, name: text};
                validateFormConti(pre, toggleCheckBox);
                return pre;
              })
            }
            // onBlur={validateFormConti}
            // onBlur={validateFormConti}
            placeholder="Name"
            borderBlack
          />
          <InputBox
            label="Email id"
            placeholder="Email id"
            value={registerData?.email}
            onChangeText={text => {
              // text = text.toLowerCase();
              setregisterData(pre => {
                pre = {...pre, email: text};
                validateFormConti(pre, toggleCheckBox);
                return pre;
              });
            }}
            // onBlur={validateFormConti}
            borderBlack
          />
          <InputBox
            label="Mobile Number"
            keyboardType="number-pad"
            placeholder="Mobile number"
            maxLength={10}
            value={registerData?.phone}
            onChangeText={text =>
              setregisterData(pre => {
                pre = {...pre, phone: text};
                validateFormConti(pre, toggleCheckBox);
                return pre;
              })
            }
            borderBlack
            // onBlur={validateFormConti}
            instruction="Mobile number must be of 10 digits."
          />
          {/* accept terms and conditions  */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // marginTop: 20,
            }}>
            <CheckBox
              title=""
              checkedColor="brown"
              checked={toggleCheckBox}
              onPress={() => acceptTermsFunction(!toggleCheckBox)}
            />
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 10}}>I accept </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('TermsServices');
                }}>
                <Text style={{fontSize: 10, color: 'blue'}}>
                  terms and conditions{' '}
                </Text>
              </TouchableOpacity>
              <Text style={{fontSize: 10}}>in registration form.</Text>
            </View>
          </View>

          <BrownBtn
            marginVertical={10}
            disabled={!isValidForm}
            isLoading={isSubmitting}
            title="Register"
            onPress={() => onSubmit()}
          />
          <Text style={styles.tc}>
            By signing in you agree to our terms & conditions
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
