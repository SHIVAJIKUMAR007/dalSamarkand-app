import React, {useLayoutEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {IMAGES} from '../../../constants/images';
import styles from './style';
import {COLORS} from '../../../constants/colors';

import Feather from 'react-native-vector-icons/Feather';

const slides = [
  {
    key: 1,
    image: IMAGES.ONBOARDING1,
  },
  {
    key: 2,
    image: IMAGES.ONBOARDING2,
  },
  {
    key: 3,
    image: IMAGES.ONBOARDING3,
  },
  {
    key: 4,
    image: IMAGES.ONBOARDING3,
  },
];

export default function OnBoarding(props) {
  const slider = useRef();

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <AppIntroSlider
        renderItem={item => (
          <RenderItem
            item={item?.item ? item?.item : item}
            navigation={props.navigation}
          />
        )}
        data={slides}
        onDone={() => {
          props.navigation.navigate('HomeScreen');
        }}
        showSkipButton={true}
        showNextButton={true}
        showDoneButton={true}
        onEndReached={() => {
          props.navigation.navigate('HomeScreen');
        }}
        renderPagination={() => null}
        onSkip={() => {
          props.navigation.navigate('HomeScreen');
        }}
        ref={ref => (slider.current = ref)}
      />
    </>
  );
}

function RenderItem(props) {
  return props.item.key === 4 ? (
    <>
      <View style={styles.fullSizeContainer}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY_LIGHT} />
      </View>
    </>
  ) : (
    <ImageBackground
      source={props.item.image}
      resizeMode="stretch"
      style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.skipContainer}
          onPress={() => {
            props.navigation.navigate('HomeScreen');
          }}>
          <Text style={styles.skip}>
            {props.item.key === 3
              ? 'Get Started'
              : props.item.key < 3
              ? 'Skip'
              : ''}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.dotLine}>
          {slides.map((data, i) => {
            return props.item.key === data.key ? (
              <View key={i} style={styles.activeDotBorder}>
                <View style={styles.activeDot} />
              </View>
            ) : (
              <View key={i} style={styles.dot} />
            );
          })}
        </View>
      </View>
    </ImageBackground>
  );
}
