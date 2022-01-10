import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {IMAGES} from '../constants/images';
import {ICONS} from '../constants/icons';
import {useGlobal} from 'reactn';

export default function CustomDrawerHeader(props) {
  const navigation = useNavigation();
  const [cart, setcart] = useGlobal('cart');
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Image
          source={props.isLight ? ICONS.MENU_LIGHT : ICONS.MENU_DARK}
          style={styles.menu}
        />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image source={IMAGES.LOGO} style={styles.logo} />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <View>
          <Image
            source={props.isLight ? ICONS.CART_LIGHT : ICONS.CART_DARK}
            style={styles.cart}
          />

          <View style={styles.qtyContainer}>
            <Text style={styles.qty}>{cart?.length ? cart?.length : 0}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginTop: 30,
    flexDirection: 'row',
    padding: 20,
  },

  label: {
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
    fontSize: 26,
  },

  qty: {
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.WHITE,
    fontSize: 14,
  },

  qtyContainer: {
    backgroundColor: COLORS.PRIMARY,
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 20,
    right: -7.5,
    justifyContent: 'center',
    alignItems: 'center',
    top: 3,
  },

  menu: {
    height: 16,
    width: 22,
    marginVertical: 10,
    resizeMode: 'stretch',
    marginVertical: 10,
    marginRight: 20,
  },

  cart: {height: 27.5, width: 27.5, marginVertical: 10},

  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {height: 75, width: 75},
});
