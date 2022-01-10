import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {ICONS} from '../constants/icons';

export default function CustomHeaderBorder(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{marginTop: 10}}>
        <Feather name="chevron-left" color={COLORS.BLACK} size={20} />
      </TouchableOpacity>

      <View style={styles.labelContainer}>
        <Text style={styles.label}>{props.label}</Text>
        <Image source={ICONS.DIVIDER_BOTTOM_DARK} style={styles.dividerTxt} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  dividerTxt: {
    height: 15,
    width: 140,
    marginTop: 5,
  },

  labelContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  label: {
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
    fontSize: 32,
  },
});
