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
    marginBottom: 10,
  },

  subHeading: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
    marginBottom: 30,
  },

  image: {
    height: 120,
    width: 108,
    marginBottom: 20,
  },
});
