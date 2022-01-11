import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONT_FAMILY} from '../../../../constants/font-family';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
    justifyContent: 'space-between',
  },

  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 40,
  },

  heading: {
    fontSize: 28,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.BLACK,
    marginBottom: 10,
  },

  subHeading: {
    fontSize: 17,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
    textAlign: 'center',
  },

  image: {
    height: 110,
    width: 110,
    marginBottom: 20,
  },
  borderBtn: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARY_LIGHT,
    // height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    // flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  ratingBorderView: {
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    // height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    // flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
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
});
