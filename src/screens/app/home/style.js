import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/font-family';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },

  topBg: {
    height: 550,
    width: width,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  aboutBg: {
    width: width,
    justifyContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },

  arrowDown: {
    height: 40,
    width: 24,
    marginTop: 10,
  },

  about: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.WHITE,
    textAlign: 'center',
  },

  infoBg: {
    width: width,
    //  height: width,
    justifyContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },

  info: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
    textAlign: 'center',
  },

  dividerTxt: {
    height: 20,
    width: 190,
    marginTop: 5,
  },

  heading: {
    fontSize: 28,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.WHITE,
  },

  headingDark: {
    fontSize: 36,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.PRIMARY,
  },

  available: {
    fontSize: 22,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.PRIMARY,
  },

  headingContainer: {
    alignItems: 'center',
    padding: 30,
  },

  imageBorder: {
    height: width - 150,
    width: width - 150,
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoImage: {
    height: width - 170,
    width: width - 170,
  },

  subHeading: {
    fontSize: 17,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
    textAlign: 'center',
    marginBottom: 30,
  },

  image: {
    height: 120,
    width: 108,
    marginBottom: 20,
  },

  productBg: {
    width: width,
    //  height: width,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },

  charges: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
    textAlign: 'center',
    padding: 10,
  },

  productHeadingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },

  btn: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 4,
  },

  btnTxt: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.WHITE,
    textAlign: 'center',
  },

  productHeading: {
    fontSize: 28,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.PRIMARY,
  },

  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  productCard: {
    width: width / 2 - 30,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },

  productImage: {
    height: width / 2 - 60,
    width: width / 2 - 30,
  },

  productInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  productName: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.WHITE,
    textAlign: 'center',
  },

  productPrice: {
    fontSize: 9,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.WHITE,
    textAlign: 'center',
    textDecorationLine: 'line-through',
    marginVertical: 2,
  },

  productDisPrice: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.YELLOW,
    textAlign: 'center',
  },

  topProductImage: {
    height: width - 185,
    width: width - 185,
    borderRadius: 15,
  },

  topProductName: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.WHITE,
    textAlign: 'center',
    marginVertical: 15,
  },

  viewBtn: {
    paddingHorizontal: 20,
    paddingVertical: 7.5,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    marginVertical: 10,
  },

  reviewHeading: {
    fontSize: 24,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.PRIMARY,
  },

  fssai: {
    height: 102,
    width: 192,
    marginTop: 20,
  },

  video: {
    height: 220,
    width: width,
    resizeMode: 'stretch',
  },
});
