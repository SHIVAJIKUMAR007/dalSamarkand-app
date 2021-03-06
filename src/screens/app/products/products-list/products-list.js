import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import styles from './style';
import {ICONS} from '../../../../constants/icons';
import {IMAGES} from '../../../../constants/images';
import CustomDrawerHeader from '../../../../components/custom-drawer-header';
import Feather from 'react-native-vector-icons/Feather';
import Footer from '../../../../components/footer';
import CustomHeaderBorder from '../../../../components/custom-header-border';
import {COLORS} from '../../../../constants/colors';
import AlertMsg from '../../../../components/alert-msg';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import {useGlobal} from 'reactn';
import {useNavigation} from '@react-navigation/core';
import {axiosGet} from '../../../../axios';
import {addToCart, updateItemInCart} from '../../../../utils/cart';
import {serverEndPoint} from '../../../../config';

const {width} = Dimensions.get('window');

export default function ProductList(props) {
  const scrollViewRef = useRef();
  const [products, setproducts] = useState([]);
  const [user, setuser] = useGlobal('user');
  const navigation = useNavigation();
  const [fetchingProduct, setfetchingProduct] = useState(false);
  const [errorAlert, seterrorAlert] = useGlobal('errorAlert');

  useEffect(() => {
    const reload = navigation.addListener('focus', () => {
      setfetchingProduct(true);
      try {
        axiosGet(
          'product',
          data => {
            setproducts(data);
            setfetchingProduct(false);
          },
          null,
          navigation,
          setuser,
        );
      } catch (error) {
        console.log(error);
        setfetchingProduct(false);
      }
    });

    return reload;
  }, []);

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />

      <ImageBackground
        imageStyle={{opacity: 0.2}}
        source={IMAGES.BG}
        resizeMode="repeat"
        resizeMethod="resize"
        style={styles.topBg}>
        <CustomDrawerHeader title="Dal Samarkand" />
        <ScrollView style={styles.container} ref={scrollViewRef}>
          <CustomHeaderBorder label={'Our Products'} />
          {fetchingProduct ? (
            <ActivityIndicator
              style={{marginVertical: 50}}
              color={COLORS.PRIMARY_LIGHT}
              size="large"
            />
          ) : (
            <>
              <ScrollView horizontal style={{maxWidth: width}}>
                <FlatList
                  data={products}
                  renderItem={(item, i) => (
                    <OneProduct
                      key={item?._id}
                      data={item?.item}
                      navigation={props.navigation}
                    />
                  )}
                />
              </ScrollView>
            </>
          )}
          <Footer
            onPress={() =>
              scrollViewRef.current?.scrollTo({y: 0, animated: true})
            }
          />
        </ScrollView>
      </ImageBackground>
    </>
  );
}

const OneProduct = props => {
  let {data, navigation} = props;
  const [qty, setqty] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const [user, setuser] = useGlobal('user');
  const [cart, setcart] = useGlobal('cart');

  const [isPresentInCart, setisPresentInCart] = useState(false);

  useEffect(() => {
    if (cart && data?._id) {
      for (let idx = 0; idx < cart.length; idx++) {
        const cartItem = cart[idx];
        if (
          cartItem?.productId?._id == data?._id ||
          cartItem?.productId == data?._id
        ) {
          setisPresentInCart(true);
          console.log(cartItem?.quantity);
          setqty(cartItem?.quantity); /////// same as number in cart
          break;
        }
      }
    }
    return () => {
      setisPresentInCart(false);
    };
  }, [data?._id, cart?.length]);

  async function addItemToCart() {
    if (!isPresentInCart)
      addToCart(
        data?._id,
        1,
        setcart,
        navigation,
        setuser,
        setisLoading,
        data?.title,
      );
    else
      addToCart(
        data?._id,
        qty,
        setcart,
        navigation,
        setuser,
        setisLoading,
        data?.title,
      );
    // updateItemInCart(
    //   data?._id,
    //   qty,
    //   setisLoading,
    //   navigation,
    //   setuser,
    //   null,
    //   null,
    //   setcart,
    // );
  }

  return (
    <ImageBackground style={styles.productCard} source={IMAGES.DARK_BG2}>
      <Pressable
        onPress={() =>
          navigation.navigate('ProductDetails', {
            productId: data?._id,
          })
        }>
        {/* source={IMAGES.PRODUCT} */}
        <Image
          source={{
            uri:
              serverEndPoint +
              'uploads/images/products/' +
              data?.images[0]?.name,
          }}
          style={styles.productImage}
        />
      </Pressable>

      <View style={styles.productInfo}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductDetails', {
              productId: data?._id,
            })
          }>
          <Text style={styles.productName}>
            {data?.title}
            {/* (Order Lead Time- 24 Hours) */}
          </Text>
          <Text style={styles.productName}>
            {data?.short_desc}
            {/* (Order Lead Time- 24 Hours) */}
          </Text>
        </TouchableOpacity>

        <View style={[styles.priceQtyContainer, {justifyContent: 'center'}]}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.productPrice}>Rs. {data?.mrp}</Text>
            <View style={{width: 10}}></View>
            <Text style={styles.productDisPrice}>Rs. {data?.sale_price}</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {isPresentInCart ? (
            <View style={[styles.btnContainer]}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => {
                  if (qty > 1) setqty(qty - 1);
                }}>
                <Feather name="minus" color={COLORS.WHITE} size={16} />
              </TouchableOpacity>
              <View style={styles.qtyBtn}>
                <Text style={styles.qty}> {qty}</Text>
              </View>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setqty(pre => pre + 1)}>
                <Feather name="plus" color={COLORS.WHITE} size={16} />
              </TouchableOpacity>
            </View>
          ) : null}
          <TouchableOpacity
            style={[styles.borderBtn, {width: isPresentInCart ? 112 : '100%'}]}
            disabled={isLoading}
            onPress={() => addItemToCart()}>
            {isLoading ? (
              <ActivityIndicator color={COLORS.WHITE} />
            ) : (
              <Text style={styles.btnTxt}>Add to cart</Text>
            )}
          </TouchableOpacity>
          {/* <View style={{width: 20}} /> */}
          {/* <TouchableOpacity
            style={styles.buyBtn}
            onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.btnTxt}>Buy Now</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </ImageBackground>
  );
};
