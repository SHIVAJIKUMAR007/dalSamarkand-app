import React from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import CustomHeader from '../../../components/custom-header';
import styles from './style';
import BrownBtn from '../../../components/brown-btn';
import {ICONS} from '../../../constants/icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../constants/colors';

const Notification = () => {
  return (
    <>
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="dark-content"
        />

        <CustomHeader title="Notification" />
        <View style={styles.emptyContainer}>
          <Ionicons
            name="notifications"
            size={108}
            style={styles.image}
            color={COLORS.PRIMARY_LIGHT}
          />
          <Text style={styles.heading}>No notifications yet</Text>
        </View>
      </View>
    </>
  );
};

export default Notification;
