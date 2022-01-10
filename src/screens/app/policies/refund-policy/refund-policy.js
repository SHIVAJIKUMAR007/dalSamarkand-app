import React from 'react';
import {View, Text, StatusBar, Image, ScrollView} from 'react-native';
import CustomHeader from '../../../../components/custom-header';
import styles from './style';
import {ICONS} from '../../../../constants/icons';

export default function RefundPolicy() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />

      <CustomHeader title="Refund Policy" />

      <View style={{paddingHorizontal: 20}}>
        <>
          <Text style={styles.subHeading}>
            We do not have a return or refund policy, which means you cannot
            return the product once received. You can always contact us for any
            question at ujvalahuja@gmail.com.
          </Text>
        </>
        <>
          <Text style={styles.heading}>Damages and issues </Text>

          <Text style={styles.subHeading}>
            Please inspect your order upon reception and contact us immediately
            if the item is defective, damaged or if you receive the wrong item,
            so that we can evaluate the issue and make it right.
          </Text>
        </>
        <>
          <Text style={styles.heading}>Exceptions / non-returnable items</Text>

          <Text style={styles.subHeading}>
            Certain types of items cannot be returned, like perishable goods
            (such as food), custom products (such as special orders or
            personalized items). Please get in touch if you have questions or
            concerns about your specific item. Unfortunately, we cannot accept
            returns or refund on sale items or gift cards.
          </Text>
        </>
      </View>
    </ScrollView>
  );
}
