import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

export default function GreyInputBox(props) {
  return (
    <>
      <View style={styles.container}>
        <TextInput
          {...props}
          placeholder={props.placeholder}
          placeholderTextColor="#696969"
          style={[styles.input, props.style]}
          keyboardType={props.keyboardType}
          secureTextEntry={props.secureTextEntry}
          defaultValue={props.defaultValue}
          onChangeText={props.onChangeText}
          editable={props.editable}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },

  input: {
    fontFamily: FONT_FAMILY.bellefair,
    fontSize: 14,
    height: 45,
    color: COLORS.BLACK,
    letterSpacing: 0.5,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 15,
    flex: 1,
  },
});
