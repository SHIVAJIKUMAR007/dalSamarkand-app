import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONT_FAMILY} from '../../../../constants/font-family';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },

  topBg: {
    width: width,
    paddingHorizontal: 15,
  },

  productInfoContainer: {
    padding: 20,
    justifyContent: 'center',
  },

  productInfo: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
    textAlign: 'center',
    marginHorizontal: 30,
  },

  productName: {
    fontSize: 24,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.BLACK,
    textAlign: 'center',
  },

  productPrice: {
    fontSize: 24,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.PRIMARY_LIGHT,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  productMrp: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.PRIMARY_LIGHT,
    textAlign: 'center',
    textDecorationLine: 'line-through',
    marginVertical: 8,
  },

  btnContainer: {
    flexDirection: 'row',
    height: 35,
    borderWidth: 1.25,
    alignItems: 'center',
    borderColor: COLORS.BLACK,
    flex: 1,
  },

  qtyBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  qty: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.BLACK,
    textAlign: 'center',
  },
  borderBtn: {
    borderWidth: 1.25,
    borderColor: COLORS.BLACK,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buyBtn: {
    height: 47.5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
    marginBottom: 40,
    marginTop: 30,
  },

  btnTxt: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.WHITE,
    textAlign: 'center',
  },

  btnTxtDark: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.PRIMARY_LIGHT,
    textAlign: 'center',
  },
});
