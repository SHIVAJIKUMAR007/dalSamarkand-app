import React, {useState} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import CustomHeader from '../../../../components/custom-header';
import {COLORS} from '../../../../constants/colors';
import BrownBtn from '../../../../components/brown-btn';
import GreyInputBox from '../../../../components/grey-input-box';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CheckoutAddress(props) {
  const [offer, setOffer] = useState(false);

  return (
    <View style={styles.topBg}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <ScrollView style={styles.container}>
        <CustomHeader title="Checkout" />
        <View style={{paddingHorizontal: 20}}>
          <View style={{marginBottom: 20}}>
            <Text style={styles.heading}>Contact Information</Text>
            <GreyInputBox placeholder="Email or mobile number" />

            <View style={styles.bottomContainer}>
              <TouchableOpacity onPress={() => setOffer(!offer)}>
                <View style={styles.circle}>
                  {offer && (
                    <Ionicons
                      name="checkmark"
                      size={12}
                      color={COLORS.PRIMARY}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <Text style={styles.checkboxTitle}>
                Keep me up to date on news and offers
              </Text>
            </View>
          </View>

          <View style={{marginBottom: 120}}>
            <Text style={styles.heading}>Shipping Address</Text>
            <GreyInputBox placeholder="Full Name" />
            <GreyInputBox placeholder="Flat, House no., Buiding, Company" />
            <GreyInputBox placeholder="Landmark" />
            <GreyInputBox placeholder="State" />
            <GreyInputBox placeholder="Town/City" />
            <GreyInputBox placeholder="Pincode" />

            <View style={styles.bottomContainer}>
              <TouchableOpacity onPress={() => setOffer(!offer)}>
                <View style={styles.circle}>
                  {offer && (
                    <Ionicons
                      name="checkmark"
                      size={12}
                      color={COLORS.PRIMARY}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <Text style={styles.checkboxTitle}>
                Save this information for next time
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBtn}>
        <BrownBtn
          title="Continue Checkout"
          onPress={() => props.navigation.navigate('CheckoutDelivery')}
        />
      </View>
    </View>
  );
}
