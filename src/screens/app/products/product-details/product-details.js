import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import {IMAGES} from '../../../../constants/images';
import CustomDrawerHeader from '../../../../components/custom-drawer-header';
import Feather from 'react-native-vector-icons/Feather';
import Footer from '../../../../components/footer';
import CustomHeaderBorder from '../../../../components/custom-header-border';
import {COLORS} from '../../../../constants/colors';
import ProductsImageCarousel from '../../../../components/products-image-carousel';
import AlertMsg from '../../../../components/alert-msg';
import {axiosGet} from '../../../../axios';
import {useGlobal} from 'reactn';
import {addToCart, updateItemInCart} from '../../../../utils/cart';
import {ActivityIndicator} from 'react-native';

export default function ProductDetails(props) {
  const scrollViewRef = useRef();
  const productId = props.route?.params?.productId;
  const [qty, setqty] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const [user, setuser] = useGlobal('user');
  const [cart, setcart] = useGlobal('cart');
  const [product, setproduct] = useState({});
  const [fetchingProduct, setfetchingProduct] = useState(false);
  const [isPresentInCart, setisPresentInCart] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (productId) {
      setfetchingProduct(true);
      try {
        axiosGet(
          `product/${productId}`,
          data => {
            if (isMounted) {
              setproduct(data);
            }
            setfetchingProduct(false);
          },
          null,
          props.navigation,
          setuser,
        );
      } catch (error) {
        console.log(error);
        setfetchingProduct(false);
      }
    }
    return () => {
      isMounted = false;
      setproduct({});
    };
  }, [productId]);

  useEffect(() => {
    if (cart && product?._id) {
      for (let idx = 0; idx < cart.length; idx++) {
        const cartItem = cart[idx];
        if (
          cartItem?.productId?._id == product?._id ||
          cartItem?.productId == product?._id
        ) {
          setisPresentInCart(true);
          setqty(cartItem?.quantity); /////// same as number in cart
          // console.log(product?._id);
          break;
        }
      }
    }
    return () => {
      setisPresentInCart(false);
    };
  }, [product?._id, cart?.length]);

  async function addItemToCart() {
    if (!isPresentInCart)
      addToCart(
        product?._id,
        qty,
        setcart,
        props.navigation,
        setuser,
        setisLoading,
      );
    else
      updateItemInCart(
        product?._id,
        qty,
        setcart,
        val => {},
        props.navigation,
        setuser,
        setisLoading,
        product?.title,
      );
  }

  return (
    <ScrollView style={styles.container} ref={scrollViewRef}>
      <ImageBackground
        resizeMethod="auto"
        source={IMAGES.PRODUCT_DETAILS_BG}
        style={styles.topBg}>
        <CustomDrawerHeader title="Dal Samarkand" />

        <CustomHeaderBorder label={'Our Products'} />
        {fetchingProduct ? (
          <ActivityIndicator
            style={{marginVertical: 50}}
            color={COLORS.PRIMARY_LIGHT}
            size="large"
          />
        ) : (
          <>
            <View style={{alignItems: 'center'}}>
              <ProductsImageCarousel
                banner={product?.images ? product?.images : []}
              />
            </View>

            <View style={styles.productInfoContainer}>
              <Text style={styles.productInfo}>
                Dal Samarkand. A unit of Neetu Ujval Ahuja
              </Text>
              <Text style={styles.productName}>{product?.title}</Text>
              <Text style={styles.productPrice}>Rs. {product?.sale_price}</Text>
              <Text style={styles.productMrp}>Rs. {product?.mrp}</Text>

              <View style={{flexDirection: 'row'}}>
                {isPresentInCart ? (
                  <>
                    <View style={styles.btnContainer}>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => {
                          if (qty > 1) setqty(pre => pre - 1);
                        }}>
                        <Feather name="minus" color={COLORS.BLACK} size={16} />
                      </TouchableOpacity>
                      <View style={styles.qtyBtn}>
                        <Text style={styles.qty}> {qty}</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => setqty(pre => pre + 1)}>
                        <Feather name="plus" color={COLORS.BLACK} size={16} />
                      </TouchableOpacity>
                    </View>
                    <View style={{width: 40}} />
                  </>
                ) : null}
                <TouchableOpacity
                  style={styles.borderBtn}
                  disabled={isLoading}
                  onPress={() => addItemToCart()}>
                  {isLoading ? (
                    <ActivityIndicator color={COLORS.PRIMARY_LIGHT} />
                  ) : (
                    <Text style={styles.btnTxtDark}>Add to cart</Text>
                  )}
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.buyBtn}
                onPress={() => props.navigation.navigate('Cart')}>
                <Text style={styles.btnTxt}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ImageBackground>

      <Footer
        onPress={() => scrollViewRef.current?.scrollTo({y: 0, animated: true})}
      />
    </ScrollView>
  );
}
