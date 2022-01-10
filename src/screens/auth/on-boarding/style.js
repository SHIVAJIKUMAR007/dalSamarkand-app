import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/font-family';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  fullSizeContainer: {
    width: width,
    height: height,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  bottomContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  topContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 45,
    justifyContent: 'flex-end',
  },

  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  activeDot: {
    width: 8,
    height: 8,
    backgroundColor: '#EEE037',
    borderRadius: 8,
  },

  activeDotBorder: {
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#EEE037',
    borderRadius: 12,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#FFF8B7',
    borderRadius: 8,
  },

  dotLine: {
    width: 100,
    height: 0.5,
    backgroundColor: '#FFF8B7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  skip: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.SECONDARY,
  },

  skipContainer: {
    position: 'absolute',
    right: 20,
    top: 50,
  },
});
