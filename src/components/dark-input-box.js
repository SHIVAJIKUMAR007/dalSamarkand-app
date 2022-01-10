import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

export default function DarkInputBox(props) {
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>{props.label}</Text>
          <TextInput
            placeholder={props.placeholder}
            placeholderTextColor="#9F9F9F"
            style={styles.input}
            keyboardType={props.keyboardType}
            secureTextEntry={props.secureTextEntry}
            defaultValue={props.defaultValue}
            onChangeText={props.onChangeText}
            editable={props.editable}
          />
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.dot} />
          <View style={styles.bottomBorder} />
          <View style={styles.dot} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },

  bottomBorder: {
    borderStyle: 'dashed',
    borderWidth: 0.5,
    borderRadius: 1,
    borderColor: COLORS.PRIMARY,
    flex: 1,
    marginHorizontal: 2.5,
  },

  dot: {
    height: 4,
    width: 4,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 4,
  },

  input: {
    fontFamily: FONT_FAMILY.bellefair,
    fontSize: 14,
    height: 37,
    color: COLORS.BLACK,
    letterSpacing: 1.5,
  },
  label: {
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.PRIMARY,
    fontSize: 13,
  },
});
