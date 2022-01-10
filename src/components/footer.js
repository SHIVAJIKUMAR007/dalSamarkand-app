import React, {useRef} from 'react';

import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../constants/colors';
import {IMAGES} from '../constants/images';
import {FONT_FAMILY} from '../constants/font-family';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

export default function Footer(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.tabsConatiner}>
        <View style={{alignItems: 'center'}}>
          <Image style={styles.logo} source={IMAGES.LOGO} />
        </View>

        <View style={{flex: 1, alignItems: 'center'}}>
          <View>
            <TouchableOpacity>
              <Text style={styles.links}>SEARCH</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('PrivacyPolicy')}>
              <Text style={styles.links}>PRIVACY POLICY</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('RefundPolicy')}>
              <Text style={styles.links}>REFUND POLICY</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ShippingPolicy')}>
              <Text style={styles.links}>SHIPPING POLICY</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('TermsServices')}>
              <Text style={styles.links}>TERMS OF SERVICE</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.socialIcon}>
            <TouchableOpacity>
              <Feather name="facebook" color={COLORS.WHITE} size={23} />
            </TouchableOpacity>
            <View style={{width: 20}} />
            <TouchableOpacity>
              <Feather name="instagram" color={COLORS.WHITE} size={23} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.circleBtn} onPress={props.onPress}>
            <Feather name="chevron-up" color={COLORS.GREY} size={28} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.copyright}>
        Copyright © 2021, Dal Samarkand. A unit of Neetu Ujval Ahuja.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    padding: 30,
  },

  socialIcon: {
    flexDirection: 'row',
    marginVertical: 20,
  },

  circleBtn: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 2.5,
  },

  tabsConatiner: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  copyright: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.WHITE,
    textAlign: 'center',
  },

  links: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.WHITE,
    lineHeight: 20,
    paddingHorizontal: 10,
  },

  logo: {
    height: 90,
    width: 90,
  },
});
