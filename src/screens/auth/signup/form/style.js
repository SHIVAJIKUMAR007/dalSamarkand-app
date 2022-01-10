import {StyleSheet, Dimensions, StatusBar, Platform} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONT_FAMILY} from '../../../../constants/font-family';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
    height: height + StatusBar.currentHeight + 2,
    width: width,
  },

  bg: {
    width: width,
    // height: height / 2,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    overflow: 'hidden',
    // marginTop: -50,
    padding: 40,
    flex: 1,
  },

  heading: {
    fontSize: 24,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.WHITE,
    textAlign: 'center',
  },

  tc: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.WHITE,
    // textAlign: 'center',
  },

  bottomContainer: {
    paddingVertical: 20,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  border: {
    height: 150,
    width: 150,
    position: 'absolute',
  },
});
