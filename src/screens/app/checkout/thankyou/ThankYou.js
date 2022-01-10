import React from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import CustomHeader from '../../../../components/custom-header';
import styles from './style';
import BrownBtn from '../../../../components/brown-btn';
import {ICONS} from '../../../../constants/icons';

export default function ThankYou(props) {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />

      <CustomHeader title="Order Success" />
      <View style={styles.emptyContainer}>
        <Image source={ICONS.SOPPING_THANKYOU} style={styles.image} />
        <Text style={styles.heading}>Thank You!</Text>

        <Text style={styles.subHeading}>
          Your order placed successfully
          {'\n'}
          Order and tracking details are also sent to your registered email
        </Text>

        <BrownBtn
          title="View Order Details"
          onPress={() => {
            props.navigation.popToTop();
            props.navigation.navigate('Orders');
          }}
        />
      </View>
    </View>
  );
}
