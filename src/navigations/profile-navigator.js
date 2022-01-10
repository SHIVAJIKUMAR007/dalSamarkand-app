import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import ViewProfile from '../screens/app/user-profile/view-profile/view-profile';
import EditProfile from '../screens/app/user-profile/edit-profile/edit-profile';
import OrdersList from '../screens/app/orders/orders-list/orders-list';
import OrderStatus from '../screens/app/orders/order-status/order-status';

const Stack = createNativeStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Profile_" component={ViewProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Orders" component={OrdersList} />
      <Stack.Screen name="OrderStatus" component={OrderStatus} />
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
