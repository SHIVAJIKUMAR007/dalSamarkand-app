import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {COLORS} from '../constants/colors';

export default function ActivityLoader() {
  return (
    <View style={styles.indicatorConatiner}>
      <ActivityIndicator size="large" color={COLORS.PRIMARY} />
    </View>
  );
}

const styles = StyleSheet.create({
  indicatorConatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
});
