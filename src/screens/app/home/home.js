import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  Pressable,
  BackHandler,
} from 'react-native';
import styles from './style';
import {ICONS} from '../../../constants/icons';
import {IMAGES} from '../../../constants/images';
import CustomDrawerHeader from '../../../components/custom-drawer-header';
import ImageCarousel from '../../../components/image-carousel';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ReviewCarousel from '../../../components/review-carousel';
import Footer from '../../../components/footer';
import {axiosGet} from '../../../axios';
import {useGlobal} from 'reactn';
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-community/async-storage';
import {
  dalsamarkandCartId,
  dalsamarkandJwtToken,
} from '../../../constants/appConstant';
import StoreStateMsg from '../../../components/StoreStateMsg';
import {serverEndPoint} from '../../../config';

export default function HomeScreen(props) {
  const scrollViewRef = useRef();
  const [products, setproducts] = useState([]);
  const [user, setuser] = useGlobal('user');
  const navigation = useNavigation();
  const [cart, setcart] = useGlobal('cart');

  ///////////////////// check for user is exist or not and get a cart ///////////////////////////////////////////////
  const checkAuthData = async () => {
    const tempAuth = await AsyncStorage.getItem(dalsamarkandJwtToken);

    if (tempAuth && tempAuth.length > 0) {
      setTimeout(() => {
        axiosGet(
          'profile',
          async userData => {
            // console.log(userData, '===========>38 home.js');
            setuser(userData);
            axiosGet(
              'cart',
              data => {
                setcart(data?.items);
              },
              res => console.log(res),
              null,
              setuser,
            );
          },
          res => {
            AsyncStorage.removeItem(dalsamarkandJwtToken);
            setuser(null);
          },
          null,
          setuser,
        );
      }, 100);
    } else {
      setuser(null);
      let cartId = await AsyncStorage.getItem(dalsamarkandCartId);
      // console.log(cartId, 'cartid');
      if (cartId) {
        axiosGet(
          'cart/' + cartId,
          data => {
            setcart(data?.items);
          },
          res => console.log(res),
          null,
          setuser,
        );
      } else {
        setcart([]);
      }
    }
  };
  /////////////////////// check for user is exist or not and get a cart ends ////////////////////////////////////
  useEffect(() => {
    let isMounted = true;
    axiosGet(
      'product',
      data => {
        if (isMounted) setproducts(data);
      },
      null,
      navigation,
      setuser,
    );
    checkAuthData(isMounted);
    // console.log(settings, 'settings');
    //this is for exit app at home event listner
    let backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      function () {
        BackHandler.exitApp();
      },
    );
    // this is for remove event listner when home page is blured,
    // means go down in navigation stack
    navigation.addListener('blur', () => {
      backHandler.remove();
    });
    return () => {
      isMounted = false;
      setproducts([]);
      backHandler.remove();
    };
  }, [navigation]);
  return (
    <ScrollView style={styles.container} ref={scrollViewRef}>
      <ImageBackground
        source={IMAGES.HOME_BG}
        resizeMode="stretch"
        style={styles.topBg}>
        <CustomDrawerHeader title="Dal Samarkand" isLight={true} />

        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Brand Aesthetics</Text>
          <Image
            source={ICONS.DIVIDER_BOTTOM_LIGHT}
            style={styles.dividerTxt}
          />
        </View>
      </ImageBackground>
      <ImageBackground
        source={IMAGES.DARK_BG3}
        resizeMethod="auto"
        style={styles.aboutBg}>
        <Text style={styles.about}>
          Our brand “Dal Samarkand” is a historic representation of authentic
          Mughlai Dal that was developed in the medieval Indo-Persian cultural
          centres of the Mughal Empire. The taste of “Dal Samarkand” is a
          perfect blend of ground and whole spices and has a distinctive aroma.
          It has the right amount of thickness, creaminess and flavour.
        </Text>
        <Image source={ICONS.ARROW_DOWN} style={styles.arrowDown} />
      </ImageBackground>

      <ImageBackground
        source={IMAGES.HOME_BG2}
        resizeMethod="auto"
        style={styles.infoBg}>
        {/* store state open or close msg  */}
        <StoreStateMsg />
        {/* store state open or close msg  */}
        <ImageBackground
          source={IMAGES.IMAGE_BORDER}
          resizeMethod="auto"
          style={styles.imageBorder}>
          <Image style={styles.infoImage} source={IMAGES.PRODUCT2} />
        </ImageBackground>
        <View style={styles.headingContainer}>
          <Text style={styles.headingDark}>Dal Samarkand</Text>
          <Image source={ICONS.DIVIDER_BOTTOM_DARK} style={styles.dividerTxt} />
        </View>

        <Text style={styles.info}>A Companion Every Naan & Roti Deserves</Text>
      </ImageBackground>

      <Image source={IMAGES.PRODUCTS2} style={styles.video} />

      <ImageBackground
        source={IMAGES.HOME_BG3}
        resizeMethod="auto"
        style={styles.productBg}>
        <View style={{alignItems: 'center'}}>
          <ImageCarousel banner={products.slice(0, 4).map(p => p.images[0])} />
        </View>
        <View style={styles.headingContainer}>
          <Text style={styles.available}>Available in Delhi/NCR only</Text>
          <Image source={ICONS.DIVIDER_BOTTOM_DARK} style={styles.dividerTxt} />
        </View>

        <View style={{alignItems: 'center'}}>
          <Image source={ICONS.TRUCK} style={{height: 35, width: 35}} />
          <Text style={styles.charges}>
            ₹72 DELIVERY CHARGES . ORDERS TO BE PLACED 2 HRS PRIOR
          </Text>
        </View>

        <View>
          <View style={styles.productHeadingContainer}>
            <Text style={styles.productHeading}>Our Products</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => props.navigation.navigate('ProductList')}>
              <Text style={styles.btnTxt}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productsContainer}>
            {products.slice(0, 4).map((data, i) => (
              <OneProduct
                key={data?._id}
                data={data}
                navigation={props.navigation}
              />
            ))}
          </View>
        </View>
      </ImageBackground>

      {/* <ImageBackground
        source={IMAGES.DARK_BG1}
        resizeMethod="auto"
        style={styles.infoBg}>
        <Image style={styles.topProductImage} source={IMAGES.PRODUCT} />

        <Text style={styles.topProductName}>
          ECO PACK (ORDER LEAD {'\n'}TIME- 24 HOURS)
        </Text>

        <TouchableOpacity
          style={styles.viewBtn}
          onPress={() => props.navigation.navigate('ProductDetails')}>
          <Text style={styles.btnTxt}>View Product</Text>
        </TouchableOpacity>
        <Image
          source={ICONS.DOTS}
          style={{height: 7, width: 90, marginTop: 10}}
        />
      </ImageBackground> */}

      <ImageBackground
        source={IMAGES.HOME_BG4}
        resizeMethod="auto"
        style={styles.infoBg}>
        <View style={styles.headingContainer}>
          <Text style={styles.reviewHeading}>Customer Reviews</Text>
          <Image source={ICONS.DIVIDER_BOTTOM_DARK} style={styles.dividerTxt} />
        </View>

        <ReviewCarousel banner={[{id: 1}, {id: 2}, {id: 3}]} />
        <View style={styles.headingContainer}>
          <Text style={styles.reviewHeading}>Fssai Licence</Text>
          <Image source={ICONS.DIVIDER_BOTTOM_DARK} style={styles.dividerTxt} />
        </View>

        <Text style={[styles.info, {paddingHorizontal: 20}]}>
          We take utmost care of our customers and assure you safe and
          nutritious food.
        </Text>

        <Image source={IMAGES.FSSAI} style={styles.fssai} />
      </ImageBackground>

      <Footer
        onPress={() => scrollViewRef.current?.scrollTo({y: 0, animated: true})}
      />
    </ScrollView>
  );
}

const OneProduct = ({data, navigation}) => {
  return (
    <ImageBackground style={styles.productCard} source={IMAGES.DARK_BG2}>
      <Pressable
        style={styles.productInfo}
        onPress={() => {
          // console.log('dfjksjdfkskfsfs');
          navigation.navigate('ProductDetails', {
            productId: data?._id,
          });
        }}>
        {/* source={IMAGES.PRODUCT}  */}
        <Image
          source={{
            uri:
              serverEndPoint +
              'uploads/images/products/' +
              data?.images[0]?.name,
          }}
          style={styles.productImage}
        />
        <Text style={styles.productName}>
          {data?.title} (Order Lead Time- 24 Hours)
        </Text>
        <Text style={styles.productPrice}>Rs. {data?.mrp}</Text>
        <Text style={styles.productDisPrice}>Rs. {data?.sale_price}</Text>
      </Pressable>
    </ImageBackground>
  );
};
