import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ImageBackground,
  ScrollView,
  BackHandler,
} from 'react-native';
import InputBox from '../../../components/input-box';
import styles from './style';
import {COLORS} from '../../../constants/colors';
import {IMAGES} from '../../../constants/images';
import Feather from 'react-native-vector-icons/Feather';
import {ICONS} from '../../../constants/icons';
import ShadowBtn from '../../../components/shadow-btn';

export default function OtpVerification(props) {
  const [phoneNo, setPhoneNo] = useState('123456789');

  return (
    <ScrollView>
      <View
        colors={[COLORS.PRIMARY, COLORS.SECONDARY]}
        style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="light-content"
        />

        <ImageBackground source={IMAGES.AUTH_BG} style={styles.bg}>
          <Image
            source={ICONS.BORDER_BOTTOM_LEFT}
            style={[styles.border, {bottom: 15, left: 15}]}
          />
          <Image
            source={ICONS.BORDER_BOTTOM_RIGHT}
            style={[styles.border, {bottom: 15, right: 15}]}
          />
          <Image
            source={ICONS.BORDER_TOP_LEFT}
            style={[styles.border, {top: 15, left: 15}]}
          />
          <Image
            source={ICONS.BORDER_TOP_RIGHT}
            style={[styles.border, {top: 15, right: 15}]}
          />
          <View style={styles.headingContainer}>
            <TouchableOpacity onPress={() => BackHandler.exitApp()}>
              <Feather name="chevron-left" color={COLORS.WHITE} size={24} />
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <Text style={styles.heading}>Sign In/ Sign Up</Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.bottomContainer}>
          <InputBox
            label="Mobile Number"
            keyboardType="number-pad"
            defaultValue={phoneNo}
            onChangeText={text => setPhoneNo(text)}
            secureTextEntry={true}
          />
          <ShadowBtn
            marginVertical={10}
            title="Verify OTP"
            onPress={() => props.navigation.navigate('ProfileStep2')}
          />
          <Text style={styles.tc}>
            By signing in you agree to our terms & conditions
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
