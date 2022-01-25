import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONT_FAMILY} from '../../../../constants/font-family';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },

  heading: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.BLACK,
  },

  card: {
    marginVertical: 20,
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },

  date: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.BLACK,
    marginTop: 2.5,
  },

  activeCircle: {
    height: 30,
    width: 30,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  circle: {
    height: 30,
    width: 30,
    backgroundColor: COLORS.LIGHT_GREY,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  stepperCompletedLine: {
    height: 2,
    flex: 1,
    backgroundColor: COLORS.PRIMARY_LIGHT,
  },

  stepperLine: {
    height: 2,
    flex: 1,
    backgroundColor: COLORS.LIGHT_GREY,
  },

  otherInfo: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
  },

  image: {
    height: 85,
    width: 85,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.LIGHT_GREY,
    marginTop: 10,
  },
  imageContainer: {borderRadius: 20, overflow: 'hidden'},

  orderStatusContainer: {
    borderWidth: 0.5,
    borderColor: COLORS.LIGHT_GREY,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  orderStatus: {
    fontSize: 11,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.BLACK,
    flex: 1,
  },

  productCard: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.LIGHT_GREY,
  },

  productName: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.BLACK,
  },

  productPrice: {
    fontSize: 17,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.PRIMARY_LIGHT,
  },

  productQty: {
    marginTop: 2.5,
    fontSize: 17,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
  },

  btnTxt: {
    fontSize: 11,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.WHITE,
    marginLeft: 5,
  },

  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_LIGHT,
    marginVertical: 20,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7.5,
    borderRadius: 5,
    elevation: 3,
  },
  ratingBorderView: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.BLACK,
    // height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    // flex: 1,
    flexDirection: 'row',
    marginHorizontal: 25,
    paddingHorizontal: 5,
    paddingVertical: 10,
    // paddingBottom: 30,
    borderRadius: 5,
  },
});
