import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/font-family';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  deleteBtn: {
    backgroundColor: '#FF0000',
    height: 45,
    width: 45,
    marginRight: 20,

    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    //  backgroundColor: 'red',
  },

  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 25,
  },

  bottomBorder: {
    borderStyle: 'dashed',
    borderWidth: 0.5,
    borderRadius: 1,
    borderColor: COLORS.PRIMARY_LIGHT,
    flex: 1,
    marginHorizontal: 2.5,
  },

  subTotalHeading: {
    fontSize: 24,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.BLACK,
  },

  subTotal: {
    fontSize: 24,
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
    marginBottom: 5,
  },

  topBg: {
    width: width,
    // paddingHorizontal: 15,
    flex: 1,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    // padding: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 10,
    marginVertical: 10,
    marginHorizontal: 20,
  },

  imageContainer: {
    borderRadius: 5,
    overflow: 'hidden',
    paddingVertical: 10,
  },

  productInfoContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingLeft: 10,
    // paddingVertical: 5,
    paddingRight: 5,
  },

  qtyBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  productImage: {
    height: 80,
    width: 85,
    borderRadius: 10,
  },

  productInfo: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
    textAlign: 'center',
    marginHorizontal: 30,
  },

  productName: {
    fontSize: 17,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.BLACK,
  },

  productPrice: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.PRIMARY_LIGHT,
  },

  btnContainer: {
    flexDirection: 'row',
    height: 38,
    alignItems: 'center',
    width: 90,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    borderRadius: 20,
    paddingHorizontal: 5,
  },

  qtyBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 2,
  },

  qty: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 40,
  },
  image: {
    height: 120,
    width: 108,
    marginBottom: 20,
  },

  heading: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.PRIMARY_LIGHT,
    textAlign: 'center',
  },

  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  subHeading: {
    fontSize: 11,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: '#696969',
    marginBottom: 30,
  },
});
