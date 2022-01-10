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

  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  heading: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
  },

  change: {
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
    flexDirection: 'row',
    marginVertical: 20,
    elevation: 5,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    padding: 15,
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  listCard: {
    flexDirection: 'row',
    marginVertical: 10,
    elevation: 5,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.baskervilleOldFace,
    color: COLORS.PRIMARY,
  },

  otherInfo: {
    fontSize: 15,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.BLACK,
  },

  divider: {
    borderWidth: 0.5,
    borderColor: COLORS.EXTRALIGHT_GREY,
    marginVertical: 4,
  },

  imageContainer: {
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
    height: 100,
    width: 90,
    elevation: 5,
    backgroundColor: COLORS.WHITE,
  },

  image: {
    height: 100,
    width: 90,
  },
});
