import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

export default function CustomHeader(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.toucahableOpacity}
        onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" color={COLORS.BLACK} size={20} />
      </TouchableOpacity>

      <View style={styles.labelContainer}>
        <Text style={styles.label}>{props.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    //  backgroundColor: 'red',
    marginTop: 30,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  toucahableOpacity: {padding: 10},
  labelContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },

  label: {
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
    fontSize: 26,
  },
});
