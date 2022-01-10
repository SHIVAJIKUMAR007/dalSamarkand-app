import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

export default function InputBox(props) {
  const styles = {
    container: {
      marginBottom: 20,
    },

    bottomBorder: {
      borderStyle: 'dashed',
      borderWidth: 0.5,
      borderRadius: 1,
      borderColor: props.borderBlack ? COLORS.BLACK : COLORS.WHITE,
      flex: 1,
      marginHorizontal: 2.5,
    },

    dot: {
      height: 4,
      width: 4,
      backgroundColor: props.borderBlack ? COLORS.BLACK : COLORS.WHITE,
      borderRadius: 4,
    },

    input: {
      fontFamily: FONT_FAMILY.bellefair,
      fontSize: 14,
      height: 37,
      color: props.borderBlack ? COLORS.BLACK : COLORS.WHITE,
      letterSpacing: 1.5,
      minWidth: 150,
      textAlign: props.textCenter ? 'center' : 'left',
    },
    label: {
      fontFamily: FONT_FAMILY.bellefair,
      color: props.borderBlack ? COLORS.BLACK : COLORS.WHITE,
      fontSize: 12,
    },
  };
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
            {...props}
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

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 20,
//   },

//   bottomBorder: {
//     borderStyle: 'dashed',
//     borderWidth: 0.5,
//     borderRadius: 1,
//     borderColor: COLORS.WHITE,
//     flex: 1,
//     marginHorizontal: 2.5,
//   },

//   dot: {
//     height: 4,
//     width: 4,
//     backgroundColor: COLORS.WHITE,
//     borderRadius: 4,
//   },

//   input: {
//     fontFamily: FONT_FAMILY.bellefair,
//     fontSize: 14,
//     height: 37,
//     color: COLORS.WHITE,
//     letterSpacing: 1.5,
//   },
//   label: {
//     fontFamily: FONT_FAMILY.bellefair,
//     color: COLORS.WHITE,
//     fontSize: 12,
//   },
// });
