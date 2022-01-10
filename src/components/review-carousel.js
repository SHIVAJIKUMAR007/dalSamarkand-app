import React, {useRef} from 'react';
import Carousel from 'react-native-snap-carousel';
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
} from 'react-native';
import {COLORS} from '../constants/colors';
import {IMAGES} from '../constants/images';
import {FONT_FAMILY} from '../constants/font-family';
import {ICONS} from '../constants/icons';

const {width} = Dimensions.get('window');

export default function ReviewCarousel(props) {
  const carouselRef = useRef(null);
  const banner = props.banner;

  return (
    <Carousel
      ref={carouselRef}
      sliderWidth={width}
      sliderHeight={width}
      itemWidth={width}
      data={banner}
      renderItem={item => <RenderItem item={item} banner={banner} />}
      hasParallaxImages={true}
      autoplay={true}
      loop={true}
      inactiveSlideOpacity={0}
    />
  );
}

const RenderItem = ({item, banner}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.border}
        resizeMode="stretch"
        source={IMAGES.REVIEW_BORDER}>
        <Image style={styles.quote} source={ICONS.QUOTE} />
        <Text style={styles.review}>
          "Hey sorry for reaching out late! But I just wanted to let you know
          that Dal was just amazing ! I just love dal makhni and this is by far
          the best I have had! Perfect flavour and perfect balance of spices.
          Can't wait to have it again" {'\n\n'}Ayushi Mahajan
        </Text>
      </ImageBackground>
      <View style={styles.dotContainer}>
        {banner.map((data, i) => (
          <View
            style={item.id === i + 1 ? styles.activeDot : styles.dot}
            key={i}
          />
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 10,
  },

  image: {
    resizeMode: 'stretch',
    width: width - 75,
    height: 200,
  },

  activeDot: {
    width: 7,
    height: 7,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 7,
    margin: 2,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 7,
    margin: 2,
    borderWidth: 1.5,
    borderColor: COLORS.PRIMARY,
  },

  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },

  border: {
    width: width - 50,
    padding: 20,
    marginBottom: 10,
    alignItems: 'center',
    marginTop: 16,
  },

  review: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.PRIMARY,
    textAlign: 'center',
  },

  quote: {
    height: 30,
    width: 30,
    position: 'absolute',
    top: -18,
  },
});
