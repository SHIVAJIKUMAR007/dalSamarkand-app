import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONT_FAMILY} from '../../../../constants/font-family';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginBottom: 80,
  },
  addAddressBtn: {
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    padding: 10,
    marginBottom: 15,
  },
  addAddressBtnText: {
    textAlign: 'center',
    fontFamily: FONT_FAMILY.bellefair,
  },
  circle: {
    height: 15,
    width: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.EXTRALIGHT_GREY,
    marginRight: 10,
  },

  activeCircle: {
    height: 9,
    width: 9,
    borderRadius: 10,
    backgroundColor: COLORS.PRIMARY,
  },

  topBg: {
    width: width,
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  heading: {
    fontSize: 24,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.BLACK,
    marginBottom: 10,
  },

  bottomBtn: {
    position: 'absolute',
    width: '90%',
    bottom: 20,
    right: 20,
    left: 20,
  },

  subHeading: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
  },

  cardHeading: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
  },

  devCharges: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: '#9A9A9D',
  },

  devTotal: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.bellefair,
    color: '#9A9A9D',
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },

  bottomBorder: {
    borderStyle: 'dashed',
    borderWidth: 0.5,
    borderRadius: 1,
    borderColor: COLORS.PRIMARY_LIGHT,
    flex: 1,
    marginHorizontal: 2.5,
  },

  totalAmt: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.PRIMARY_LIGHT,
    textAlign: 'right',
    marginBottom: 30,
  },

  subTotalHeading: {
    fontSize: 24,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.BLACK,
  },

  subTotal: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
  },

  dot: {
    height: 4,
    width: 4,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    borderRadius: 4,
  },

  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  card: {
    marginVertical: 20,
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    padding: 20,
    marginBottom: 0,
    flexDirection: 'row',
  },

  name: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.BLACK,
    // marginBottom: 10,
  },

  otherInfo: {
    fontSize: 12,
    marginTop: 5,
    fontFamily: FONT_FAMILY.bellefair,
    color: '#9A9A9D',
    // textAlign: 'center',
  },

  dividerCard: {
    marginVertical: 20,
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
  },

  addrTitle: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.BLACK,
  },

  divider: {
    borderWidth: 0.25,
    borderColor: COLORS.LIGHT_GREY,
    marginVertical: 15,
    marginLeft: 25,
  },
});
