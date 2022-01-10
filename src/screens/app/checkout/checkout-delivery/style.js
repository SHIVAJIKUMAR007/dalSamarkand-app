import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONT_FAMILY} from '../../../../constants/font-family';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
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
  },

  bottomBtn: {
    position: 'absolute',
    width: '90%',
    bottom: 20,
    right: 20,
    left: 20,
  },

  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  subHeading: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
  },

  edit: {
    fontSize: 15,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.PRIMARY_LIGHT,
    textDecorationLine: 'underline',
  },

  cardHeading: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
  },

  card: {
    marginVertical: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 10,
    // marginBottom: 30,
  },
  selectAddressView: {
    flexDirection: 'row',
  },
  circle: {
    marginTop: 10,
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
  name: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
    fontWeight: '600',
  },

  otherInfo: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
  },
  editAndDelete: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 8,
  },
  editOrDeleteBtnText: {
    color: COLORS.PRIMARY_LIGHT,
    textDecorationLine: 'underline',
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
  divider: {
    borderWidth: 0.25,
    borderColor: COLORS.LIGHT_GREY,
    marginVertical: 10,
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

  totalAmt: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.PRIMARY_LIGHT,
    textAlign: 'right',
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
  parentView: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: 'white',
    minHeight: 120,
    marginVertical: 10,
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  inputMainView: {flexDirection: 'row', marginTop: 5},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  rowAlignApart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  modalView: {
    margin: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: width * 0.9,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ff9330',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  buttonClose: {},
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 5,
  },
  textInput: {
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    height: 20,
  },
  pickerBorder: {
    borderColor: '#FF9330',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
});
