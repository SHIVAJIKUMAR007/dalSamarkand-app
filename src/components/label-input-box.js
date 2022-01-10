import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

export default function LabelInputBox(props) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>{props.label}</Text>
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor="#696969"
          style={styles.input}
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

  bottomBorder: {
    borderStyle: 'dashed',
    borderWidth: 0.5,
    borderRadius: 1,
    borderColor: COLORS.WHITE,
    flex: 1,
    marginHorizontal: 2.5,
  },

  dot: {
    height: 4,
    width: 4,
    backgroundColor: COLORS.WHITE,
    borderRadius: 4,
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
  },
  label: {
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
    marginBottom: 10,
    fontSize: 12,
    marginLeft: 5,
  },
});
