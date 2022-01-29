import React, {useRef} from 'react';
import Carousel from 'react-native-snap-carousel';
import {View, Dimensions, StyleSheet, Image, Text} from 'react-native';
import {COLORS} from '../constants/colors';
import {serverEndPoint} from '../config';

const {width} = Dimensions.get('window');

export default function ProductsImageCarousel(props) {
  const carouselRef = useRef(null);
  const banner = props.banner;
  // console.log(banner);

  return (
    <Carousel
      ref={carouselRef}
      sliderWidth={width}
      sliderHeight={width}
      itemWidth={width - 50}
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
  // console.log(
  //   item,
  //   serverEndPoint + 'uploads/images/products/' + item?.item?.name,
  // );
  return (
    <>
      <View style={styles.item} key={item.id}>
        {/* ?IMAGES.PRODUCTS */}
        <Image
          source={{
            uri: serverEndPoint + 'uploads/images/products/' + item?.item?.name,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.dotContainer}>
        {banner.map((data, i) => (
          <View
            style={item.id === i + 1 ? styles.activeDot : styles.dot}
            key={i}
          />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    width: width - 50,
    height: 200,
    marginTop: 12.5,
    marginBottom: 5,
    borderRadius: 2,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: COLORS.WHITE,
  },

  image: {
    resizeMode: 'stretch',
    width: width - 50,
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
});
