import React, {useRef} from 'react';
import Carousel from 'react-native-snap-carousel';
import {View, Dimensions, StyleSheet, Image, Text} from 'react-native';
import {COLORS} from '../constants/colors';
import {serverEndPoint} from '../config';

const {width} = Dimensions.get('window');

export default function ImageCarousel(props) {
  const carouselRef = useRef(null);
  const banner = props.banner;

  return (
    <Carousel
      ref={carouselRef}
      sliderWidth={width}
      sliderHeight={width}
      itemWidth={width - 75}
      data={banner}
      renderItem={item => (
        <RenderItem key={item?.item?.id} item={item} banner={banner} />
      )}
      hasParallaxImages={true}
      autoplay={true}
      loop={true}
      inactiveSlideOpacity={0}
      lockScrollTimeoutDuration={300}
    />
  );
}

const RenderItem = ({item, banner}) => {
  return (
    <>
      <View style={styles.item} key={item.id}>
        <Image
          source={{
            uri: item?.item?.uri
              ? item?.item?.uri
              : serverEndPoint + 'uploads/images/products/' + item?.item?.name,
          }}
          style={styles.image}
        />
      </View>
      {/* <View style={styles.dotContainer}>
        {banner.map((data, i) => (
          <View style={item.id === i ? styles.activeDot : styles.dot} key={i} />
        ))}
      </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    width: width - 75,
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
    width: width - 75,
    height: 200,
  },

  activeDot: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    margin: 2,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 7,
    margin: 2,
    borderWidth: 1.5,
    borderColor: COLORS.PRIMARY_LIGHT,
  },

  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
});
