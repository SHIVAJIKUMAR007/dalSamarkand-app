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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tc: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
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
    marginBottom: 30,
  },

  image: {
    height: 120,
    width: 108,
    marginBottom: 20,
  },
});
