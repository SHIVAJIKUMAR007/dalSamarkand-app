import React from 'react';
import {View, Text, StatusBar, Image, ScrollView} from 'react-native';
import CustomHeader from '../../../../components/custom-header';
import styles from './style';
import {ICONS} from '../../../../constants/icons';

export default function ShippingPolicy() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />

      <CustomHeader title="Shipping Policy" />

      <View style={{paddingHorizontal: 20}}>
        <>
          <Text style={styles.subHeading}>
            Our Shipping is restricted to Delhi/NCR only
          </Text>
          <Text style={styles.subHeading}>₹72 delivery charges</Text>
          <Text style={styles.subHeading}>
            Place an order at least 24 hours prior to the delivery date and
            time. Our delivery boy usually takes 1-3 hours to reach the
            destination once despatched. Considering the traffic and other
            unforeseen circumstances.
          </Text>
        </>
      </View>
    </ScrollView>
  );
}
