import {Platform} from 'react-native';

const FONT_FAMILY = {
  bellefair: 'Bellefair-Regular',
  baskervilleOldFace:
    Platform.OS == 'ios' ? 'Baskervville-Regular' : 'BASKVILL',
};

export {FONT_FAMILY};
