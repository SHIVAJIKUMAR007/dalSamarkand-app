import {StyleSheet, Dimensions, StatusBar} from 'react-native';
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
    // paddingHorizontal: 15,
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  heading: {
    fontSize: 24,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.BLACK,
  },

  subHeading: {
    fontSize: 11,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: '#696969',
    marginBottom: 30,
  },

  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5,
  },

  circle: {
    height: 20,
    width: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 5,
    backgroundColor: COLORS.EXTRALIGHT_GREY,
  },

  checkboxTitle: {
    fontSize: 10,
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
});
