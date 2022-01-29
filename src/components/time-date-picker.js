import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Platform} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from 'react-native-vector-icons/Feather';
import {useState} from 'react';

export default function TimeDatePicker(props) {
  let today = new Date();
  const [maxDate, setmaxDate] = useState(new Date());
  function getmaxDate() {
    var startDate = new Date();
    var finalDate = new Date(startDate.setDate(startDate.getDate() + 15));
    console.log(finalDate);
    return new Date(
      finalDate.getFullYear(),
      finalDate.getMonth(),
      finalDate.getDate(),
    );
  }
  useEffect(() => {
    setmaxDate(getmaxDate);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.datepickerContainer}>
        <View>
          {props.show && (
            <DateTimePicker
              value={props.value}
              mode={props.mode}
              display={Platform.OS == 'ios' ? 'compact' : 'default'}
              onChange={props.onChange}
              minimumDate={
                new Date(today.getFullYear(), today.getMonth(), today.getDate())
              }
              maximumDate={maxDate}
            />
          )}
        </View>

        <TouchableOpacity style={styles.datepicker} onPress={props.onPress}>
          {Platform.OS == 'ios' ? null : (
            <>
              <View style={{flex: 1}}>
                {props.date === null ? null : (
                  <Text style={[styles.placeholder, {color: COLORS.BLACK}]}>
                    {props.date}
                  </Text>
                )}
              </View>
              <Feather name="chevron-down" color={COLORS.BLACK} size={18} />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    marginTop: 10,
  },
  datepickerContainer: {
    height: 45,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  label: {
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
    marginBottom: 10,
    fontSize: 12,
    marginLeft: 7.5,
  },

  placeholder: {
    fontFamily: FONT_FAMILY.bellefair,
    fontSize: 14,
    color: COLORS.BLACK,
    letterSpacing: 0.5,
  },

  datepicker: {
    padding: 10,
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
