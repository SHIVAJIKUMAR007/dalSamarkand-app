import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  ImageBackground,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import styles from './style';
import {IMAGES} from '../../../constants/images';
import CustomHeader from '../../../components/custom-header';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from '../../../constants/colors';
// import {Swipeable} from 'react-native-gesture-handler';
import BrownBtn from '../../../components/brown-btn';
import {removeFromCart, updateItemInCart} from '../../../utils/cart';
import {useGlobal} from 'reactn';
import {ICONS} from '../../../constants/icons';
import {axiosGet} from '../../../axios';
import {ActivityIndicator} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {dalsamarkandCartId} from '../../../constants/appConstant';
import AlertMsg from '../../../components/alert-msg';

export default function Cart(props) {
  const [cart, setcart] = useGlobal('cart');
  const [user, setuser] = useGlobal('user');
  const [checkout, setcheckout] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [isUpdatingCart, setisUpdatingCart] = useState(false);
  const getUnauthCart = async () => {
    let cartId = await AsyncStorage.getItem(dalsamarkandCartId);
    console.log(cartId, 'cartid in cart');
    if (cartId) {
      axiosGet(
        'cart/' + cartId,
        data => {
          setcart(data?.items);
          setcheckout(data);
          setisLoading(false);
        },
        res => console.log(res),
        null,
        setuser,
      );
    } else {
      setcart([]);
      setcheckout({});
      setisLoading(false);
    }
  };
  useEffect(() => {
    let isMounted = true;
    setisLoading(true);
    if (user)
      axiosGet(
        'cart',
        data => {
          console.log(data);
          setisLoading(false);
          if (isMounted) {
            setcart(data?.items);
            setcheckout(data);
          }
        },
        null,
        props.navigation,
        setuser,
      );
    else getUnauthCart();
    return () => {
      isMounted = false;
      setisLoading(false);
    };
  }, [cart?.length]);

  return (
    // <View style={styles.topBg}>
    <ImageBackground
      imageStyle={{opacity: 0.2}}
      source={IMAGES.BG}
      resizeMode="repeat"
      resizeMethod="resize"
      style={styles.topBg}>
      <View style={{paddingHorizontal: 15}}>
        <CustomHeader title="Cart" />
      </View>

      {isLoading ? (
        <ActivityIndicator
          color={COLORS.PRIMARY_LIGHT}
          size="large"
          style={{marginVertical: 50}}
        />
      ) : cart?.length ? (
        <>
          {/* <View style={styles.headingContainer}>
            <Text style={styles.heading}>swipe on an item to delete</Text>
          </View> */}
          <FlatList
            data={checkout?.items}
            renderItem={item => (
              <CartItem
                key={item?.index}
                data={item?.item}
                navigation={props.navigation}
                setisCartLoading={setisUpdatingCart}
                setcheckout={setcheckout}
              />
            )}
          />
          <View style={{padding: 25}}>
            <View style={styles.dotContainer}>
              <View style={styles.dot} />
              <View style={styles.bottomBorder} />
              <View style={styles.dot} />
            </View>

            <View style={styles.totalContainer}>
              <Text style={styles.subTotalHeading}>Subtotal</Text>
              {isUpdatingCart ? (
                <ActivityIndicator color={COLORS.PRIMARY_LIGHT} />
              ) : (
                <Text style={styles.subTotal}>Rs. {checkout?.subTotal}</Text>
              )}
            </View>
            <Text style={styles.subHeading}>
              Taxes and shipping calculated at checkout page
            </Text>
            <BrownBtn
              title="Complete order"
              disabled={isUpdatingCart}
              onPress={() => {
                if (user)
                  props.navigation.navigate('CheckoutDelivery', {
                    checkout: checkout,
                  });
                else {
                  AlertMsg('Please login to proceed further.');
                  props.navigation.navigate('SignIn');
                }
              }}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.emptyContainer}>
            <Image source={ICONS.NO_HISTORY} style={styles.image} />
            <Text style={styles.heading}>No item in cart yet</Text>
          </View>
        </>
      )}
    </ImageBackground>
    // </View>
  );
}

const CartItem = ({data, navigation, setisCartLoading, setcheckout}) => {
  const [cart, setcart] = useGlobal('cart');
  const [user, setuser] = useGlobal('user');
  const [isLoading, setisLoading] = useState(false);
  const [qty, setqty] = useState(null);
  const [killTimeout, setkillTimeout] = useState(null);
  const [cartItem, setcartItem] = useState(null);

  useEffect(() => {
    setcartItem(data?.productId);
    setqty(data?.quantity);
    return () => {
      setcartItem(null);
    };
  }, []);

  const removeItem = () => {
    Alert.alert(
      'Are you sure?',
      'You want to remove ' + cartItem?.title + ' from you cart.',
      [
        {
          text: 'Yes',
          onPress: async () => {
            setisCartLoading(true);
            removeFromCart(
              cartItem?._id,
              setcart,
              navigation,
              setuser,
              setcheckout,
              cartItem?.title,
              setisCartLoading,
            );
          },
        },
        {
          text: 'No',
          onPress: async () => {
            setqty(data?.quantity);
            setisCartLoading(false);
          },
        },
      ],
    );
  };
  const updateQuantity = (addMore, qty) => {
    setisCartLoading(true);
    window.clearTimeout(killTimeout);
    if (!addMore && qty <= 1) {
      removeItem();
      return;
    }
    setkillTimeout(
      window.setTimeout(() => {
        updateItemInCart(
          cartItem?._id,
          addMore ? qty + 1 : qty - 1,
          null,
          navigation,
          setuser,
          setcheckout,
          setisCartLoading,
          setcart,
        );
      }, 700),
    );
  };

  return (
    <View>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image style={styles.productImage} source={IMAGES.PRODUCT} />
        </View>
        <View style={styles.productInfoContainer}>
          <View style={styles.qtyBtnContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProductDetails', {
                  productId: cartItem?._id,
                });
              }}>
              <Text style={styles.productName}>{cartItem?.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // style={{marginLeft: 'auto'}}
              onPress={() => removeItem()}>
              <MaterialIcons
                name="delete-forever"
                size={25}
                color={COLORS.RED}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.qtyBtnContainer}>
            <Text style={styles.productPrice}>Rs. {cartItem?.sale_price}</Text>

            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.qtyBtn}
                // disabled={isLoading}
                onPress={() => {
                  if (qty <= 0) return;
                  updateQuantity(false, qty);
                  setqty(pre => (pre <= 0 ? pre : pre - 1));
                }}>
                <Feather name="minus" color={COLORS.WHITE} size={10} />
              </TouchableOpacity>
              <View style={styles.qtyBtn}>
                <Text style={styles.qty}> {qty}</Text>
              </View>
              <TouchableOpacity
                style={styles.qtyBtn}
                // disabled={isLoading}
                onPress={() => {
                  updateQuantity(true, qty);
                  setqty(pre => pre + 1);
                }}>
                <Feather name="plus" color={COLORS.WHITE} size={10} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
