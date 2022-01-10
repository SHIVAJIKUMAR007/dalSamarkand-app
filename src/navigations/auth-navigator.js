// no use at all

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS} from '../constants/colors';
import {StyleSheet, Text} from 'react-native';
import {FONT_FAMILY} from '../constants/font-family';
import SignIn from '../screens/auth/sign-in/sign-in';
import OtpVerification from '../screens/auth/otp-verification/otp-verification';
import OtpVerificationSignup from '../screens/auth/signup/otp-verification/OtpVarification';
import OnBoarding from '../screens/auth/on-boarding/on-boarding';
import SignupForm from '../screens/auth/signup/form/SignupForm';
import PrivacyPolicy from '../screens/app/policies/privacy-policy/privacy-policy';
import RefundPolicy from '../screens/app/policies/refund-policy/refund-policy';
import ShippingPolicy from '../screens/app/policies/shipping-policy/shipping-policy';
import TermsServices from '../screens/app/policies/terms-of-services/terms-services';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="OtpSignup"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Signup" component={SignupForm} />
        <Stack.Screen name="OtpSignup" component={OtpVerificationSignup} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="RefundPolicy" component={RefundPolicy} />
        <Stack.Screen name="ShippingPolicy" component={ShippingPolicy} />
        <Stack.Screen name="TermsServices" component={TermsServices} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 30,
    color: COLORS.PRIMARY,
    textTransform: 'capitalize',
    fontFamily: FONT_FAMILY.logo,
  },
});
