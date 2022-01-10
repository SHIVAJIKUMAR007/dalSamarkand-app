import React from 'react';
import {ActivityIndicator} from 'react-native';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

export default function ShadowBtn(props) {
  return (
    <View style={{marginVertical: props.marginVertical, zIndex: 0}}>
      <TouchableOpacity
        style={styles.btnShadow}
        onPress={props.onPress}
        disabled={props?.isLoading}>
        {props.isLoading ? (
          <ActivityIndicator size="small" color={COLORS.WHITE} />
        ) : (
          <Text style={styles.btnTxt}>{props.title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnShadow: {
    backgroundColor: COLORS.SECONDARY,
    elevation: 1,
    borderRadius: 10,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnTxt: {
    color: COLORS.WHITE,
    fontSize: 24,
    fontFamily: FONT_FAMILY.bellefair,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
