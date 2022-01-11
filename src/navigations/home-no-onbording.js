import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

import HomeScreen from '../screens/app/home/home';
import ProductList from '../screens/app/products/products-list/products-list';
import ProductDetails from '../screens/app/products/product-details/product-details';
import Cart from '../screens/app/cart/cart';
import CheckoutAddress from '../screens/app/checkout/checkout-address/checkout-address';
import CheckoutDelivery from '../screens/app/checkout/checkout-delivery/checkout-delivery';
import CheckoutPayment from '../screens/app/checkout/checkout-payment/checkout-payment';
import EditProfile from '../screens/app/user-profile/edit-profile/edit-profile';
import Notification from '../screens/app/notification/Notification';
import ThankYou from '../screens/app/checkout/thankyou/ThankYou';
import SignupForm from '../screens/auth/signup/form/SignupForm';
import PrivacyPolicy from '../screens/app/policies/privacy-policy/privacy-policy';
import RefundPolicy from '../screens/app/policies/refund-policy/refund-policy';
import ShippingPolicy from '../screens/app/policies/shipping-policy/shipping-policy';
import TermsServices from '../screens/app/policies/terms-of-services/terms-services';
import SignIn from '../screens/auth/sign-in/sign-in';
import OtpVerification from '../screens/auth/otp-verification/otp-verification';
import OtpVerificationSignup from '../screens/auth/signup/otp-verification/OtpVarification';
import Offers from '../screens/app/offers/Offers';

const Stack = createNativeStackNavigator();

export default function HomeNavigator2() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Offers" component={Offers} />

      <Stack.Screen name="CheckoutAddress" component={CheckoutAddress} />
      <Stack.Screen name="CheckoutDelivery" component={CheckoutDelivery} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="CheckoutPayment" component={CheckoutPayment} />
      <Stack.Screen name="ThankYou" component={ThankYou} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Signup" component={SignupForm} />
      <Stack.Screen name="OtpSignup" component={OtpVerificationSignup} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="RefundPolicy" component={RefundPolicy} />
      <Stack.Screen name="ShippingPolicy" component={ShippingPolicy} />
      <Stack.Screen name="TermsServices" component={TermsServices} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 17,
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.bellefair,
  },

  logo: {
    height: 45,
    width: 150,
    resizeMode: 'stretch',
    marginTop: 5,
  },

  iconStyleRight: {marginRight: 15},
});
