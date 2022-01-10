import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import History from '../screens/app/history/history';

const Stack = createNativeStackNavigator();

export default function HistoryNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="History_" component={History} />
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
