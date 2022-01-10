import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONT_FAMILY} from '../../../../constants/font-family';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },

  cardHeading: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
  },

  imageContainer: {
    borderRadius: 5,
    overflow: 'hidden',
    height: 120,
    width: 110,
    elevation: 5,
    backgroundColor: COLORS.WHITE,
    marginBottom: 20,
  },

  image: {
    height: 120,
    width: 110,
  },

  editContainer: {
    backgroundColor: COLORS.PRIMARY,
    position: 'absolute',
    height: 30,
    width: 30,
    borderRadius: 5,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
});
