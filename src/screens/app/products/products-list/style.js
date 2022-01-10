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

  productCard: {
    width: width - 30,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },

  productImage: {
    height: width - 125,
    width: width - 30,
  },

  productInfo: {
    padding: 20,
    justifyContent: 'center',
    paddingTop: 0,
  },

  productName: {
    fontSize: 15,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.WHITE,
    textAlign: 'center',
    marginHorizontal: 30,
    paddingTop: 20,
  },

  productPrice: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.WHITE,
    textDecorationLine: 'line-through',
    marginVertical: 2,
    textAlign: 'center',
  },

  productDisPrice: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.YELLOW,
    textAlign: 'center',
  },

  priceQtyContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginVertical: 15,
  },

  btnContainer: {
    flexDirection: 'row',
    height: 40,
    width: 112,
    borderWidth: 0.75,
    alignItems: 'center',
    borderColor: COLORS.WHITE,
  },

  qtyBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },

  qty: {
    fontSize: 16,
    minWidth: 25,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  borderBtn: {
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buyBtn: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.SECONDARY,
  },

  btnTxt: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.WHITE,
    textAlign: 'center',
  },

  pageBtnContainer: {
    flexDirection: 'row',
    height: 35,
    borderWidth: 0.75,
    alignItems: 'center',
    borderColor: COLORS.WHITE,
    marginVertical: 40,
    justifyContent: 'space-evenly',
  },

  pageBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.LIGHT_GREY,
    height: 40,
    width: 105,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 2,
    flexDirection: 'row',
  },

  pageBtnTxt: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.bellefair,
    color: '#9A9A9D',
    textAlign: 'center',
  },
});
