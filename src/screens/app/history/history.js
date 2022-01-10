import React from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import CustomHeader from '../../../components/custom-header';
import styles from './style';
import BrownBtn from '../../../components/brown-btn';
import {ICONS} from '../../../constants/icons';

export default function History() {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />

      <CustomHeader title="History" />
      <View style={styles.emptyContainer}>
        <Image source={ICONS.NO_HISTORY} style={styles.image} />
        <Text style={styles.heading}>No history yet</Text>

        <Text style={styles.subHeading}>
          Hit the orange button down below to Create an order
        </Text>
      </View>
    </View>
  );
}
