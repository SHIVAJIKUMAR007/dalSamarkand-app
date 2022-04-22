import React from 'react';
import {ActivityIndicator} from 'react-native';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

export default function BrownBtn(props) {
  return (
    <View
      style={{
        marginVertical: props.marginVertical ? props.marginVertical : 0,
        marginHorizontal: 8,
        zIndex: 0,
        paddingVertical: 10,
      }}>
      <TouchableOpacity
        disabled={props.disabled || props.isLoading}
        style={[
          styles.btnShadow,
          {
            backgroundColor: props.disabled
              ? COLORS.LIGHT_GREY
              : COLORS.PRIMARY_LIGHT,
          },
        ]}
        onPress={props.onPress}>
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
    // backgroundColor: COLORS.PRIMARY_LIGHT,
    elevation: 1,
    borderRadius: 10,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  btnTxt: {
    color: COLORS.WHITE,
    fontSize: 23,
    fontFamily: FONT_FAMILY.bellefair,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
