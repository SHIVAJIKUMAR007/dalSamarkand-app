import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import styles from './style';
import CustomHeader from '../../../../components/custom-header';
import BrownBtn from '../../../../components/brown-btn';
import LabelInputBox from '../../../../components/label-input-box';
import {axiosPost} from '../../../../axios';
import {useGlobal} from 'reactn';
import RazorpayCheckout from 'react-native-razorpay';
import {appLogo, appName} from '../../../../constants/appConstant';
import {COLORS} from '../../../../constants/colors';
import GreyInputBox from '../../../../components/grey-input-box';
import AlertMsg from '../../../../components/alert-msg';

const {width} = Dimensions.get('window');
export default function CheckoutPayment(props) {
  const [user, setuser] = useGlobal('user');
  const [cart, setcart] = useGlobal('cart');
  let address_id = props.route?.params?.address_id;
  const [isSubmitting, setisSubmitting] = useState(false);
  const [checkout, setcheckout] = useState(null);
  const [discount, setdiscount] = useState({
    value: 0,
    type: null,
    valueInRs: 0,
  });
  const [orderDetail, setorderDetail] = useState({
    address_id: null,
    coupon: null,
    payment_type: 'razorpay',
  });
  useEffect(() => {
    setorderDetail(pre => {
      return {...pre, address_id: address_id};
    });
    setcheckout(props.route?.params?.checkout);
    return () => {
      setorderDetail({
        address_id: null,
        coupon: null,
        payment_type: 'razorpay',
      });
    };
  }, [address_id]);
  async function applyCoupon() {
    axiosPost(
      'cart/apply_coupon',
      {coupon: orderDetail?.coupon},
      res => {
        console.log(res);
        AlertMsg(res?.message);

        setdiscount({
          value: res?.coupon_data?.doc?.value,
          type: res?.coupon_data?.doc?.type,
          valueInRs:
            res?.coupon_data?.doc?.type == 'amount'
              ? res?.coupon_data?.doc?.value
              : Math.floor(
                  (res?.coupon_data?.doc?.value * checkout?.subTotal) / 100,
                ),
        });
        // checkout.subTotal = checkout.subTotal - res?.coupon_data?.doc?.value;
      },
      res => {
        console.log(res?.message);
        AlertMsg(res?.message);
        // setorderDetail(pre => {
        //   return {...pre, coupon: null};
        // });
        setdiscount({value: 0, type: null, valueInRs: 0});
      },
      res => {
        console.log(res);
      },
      props.navigation,
      setuser,
    );
  }
  async function handleOrder() {
    try {
      setisSubmitting(true);
      axiosPost(
        'order/place_order',
        orderDetail,
        data => {
          ////////////////// order is placed hence empty the cart //////////////////
          setcart([]);
          ////////////////////// if paying with razorpay ?////////////////////////////
          if (orderDetail?.payment_type == 'razorpay') {
            var options = {
              description: 'Credits towards ' + appName,
              image: appLogo,
              currency: 'INR',
              key: data?.razorpay_key,
              name: appName,
              order_id: data?.order?.payment_details?.order_id, //Replace this with an order_id created using Orders API.
              theme: {color: COLORS.PRIMARY_LIGHT},
            };
            RazorpayCheckout.open(options)
              .then(data => {
                // handle success

                alert(`Success: ${data.razorpay_payment_id}`);

                setisSubmitting(false);
                props.navigation.navigate('ThankYou');
              })
              .catch(error => {
                // handle failure
                alert(`Error: ${error.code} | ${error.description}`);
                setisSubmitting(false);
              });
          }
          ///////////else cash on delivery
          else if (orderDetail?.payment_type == 'cod') {
            // Alert.alert('Success', data?.message);
            setisSubmitting(false);
            props.navigation.navigate('ThankYou');
          }
        },
        res => {
          console.log(res);
          Alert('Fail', res?.toString());
          setisSubmitting(false);
        },
        res => {
          console.log(res);
          Alert('Fail', res?.toString());
          setisSubmitting(false);
        },
        props.navigation,
        setuser,
      );
    } catch (error) {
      console.log(error);
      Alert.alert('Fail', error);
      setisSubmitting(false);
    }
  }
  return (
    <View style={styles.topBg}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <ScrollView style={styles.container}>
        <CustomHeader title="Checkout" />
        <View style={{paddingHorizontal: 20}}>
          <Text style={styles.heading}>Payment Method</Text>
          <Text style={styles.subHeading}>
            All transactions are secure and encrypted.
          </Text>

          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => {
                setorderDetail(pre => {
                  return {...pre, payment_type: 'razorpay'};
                });
              }}>
              <View style={styles.circle}>
                {orderDetail?.payment_type == 'razorpay' && (
                  <View style={styles.activeCircle} />
                )}
              </View>
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <Text style={styles.name}>
                Razorpay (Cards, UPI, NetBanking, Wallets)
              </Text>

              <Text style={styles.otherInfo}>
                After clicking “Complete order”, you will be redirected to
                Razorpay (Cards, UPI, NetBanking, Wallets) to complete your
                purchase securely.
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => {
                setorderDetail(pre => {
                  return {...pre, payment_type: 'cod'};
                });
              }}>
              <View style={styles.circle}>
                {orderDetail?.payment_type == 'cod' && (
                  <View style={styles.activeCircle} />
                )}
              </View>
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <Text style={styles.name}>Cash on delivery</Text>
            </View>
          </View>

          {/* Apply coupon part  */}
          <Text style={[styles.subHeading, {marginVertical: 15}]}>
            Apply Coupon
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <GreyInputBox
              placeholder="Enter a valid coupon code"
              style={{flex: 1, maxWidth: width * 0.65}}
              value={orderDetail?.coupon}
              onChangeText={val => {
                setorderDetail(pre => {
                  return {...pre, coupon: val};
                });
              }}
            />
            <TouchableOpacity
              onPress={applyCoupon}
              style={[styles.addAddressBtn, {marginBottom: 0, padding: 15}]}>
              <Text style={styles.addAddressBtnText}>Apply</Text>
            </TouchableOpacity>
          </View>

          {/* payment preview here */}
          <View style={{marginVertical: 15}}>
            <View style={styles.totalContainer}>
              <Text style={styles.subTotalHeading}>Subtotal</Text>
              <Text style={styles.subTotal}>Rs. {checkout?.subTotal}</Text>
            </View>
            <View style={{marginVertical: 2}} />
            <View style={styles.totalContainer}>
              <Text style={styles.devCharges}>Delivery Charges</Text>
              <Text style={styles.devTotal}>
                {'+    '}Rs.{' '}
                {checkout?.deleveryCharge ? checkout?.deleveryCharge : 0}
              </Text>
            </View>
            <View style={{marginVertical: 2}} />
            <View style={styles.totalContainer}>
              <Text style={styles.devCharges}>
                Discount{' '}
                {discount?.value
                  ? `(${orderDetail?.coupon} applied ${
                      discount?.type == 'amount' ? '- Rs ' : null
                    } ${discount?.value}${
                      discount?.type == 'amount' ? null : '%'
                    })`
                  : '( No coupon applied )'}
              </Text>
              <Text style={styles.devTotal}>
                {'-   '}Rs. {discount?.valueInRs}
              </Text>
            </View>
          </View>
          <View style={styles.dotContainer}>
            <View style={styles.dot} />
            <View style={styles.bottomBorder} />
            <View style={styles.dot} />
          </View>

          <Text style={styles.totalAmt}>
            Rs.{' '}
            {checkout?.subTotal +
              (checkout?.deleveryCharge ? checkout?.deleveryCharge : 0) -
              discount?.valueInRs}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBtn}>
        <BrownBtn
          title="Complete Order"
          disabled={isSubmitting}
          onPress={handleOrder}
        />
      </View>
    </View>
  );
}

{
  /* <View style={{marginBottom: 120}}>
            <Text style={styles.heading}>Billing address</Text>
            <Text style={styles.subHeading}>
              Select the address that matches your card or payment method.
            </Text>

            <View style={styles.dividerCard}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => setAddr(!addr)}>
                  <View style={styles.circle}>
                    {addr && <View style={styles.activeCircle} />}
                  </View>
                </TouchableOpacity>
                <View style={{flex: 1}}>
                  <Text style={styles.addrTitle}>Same as shipping address</Text>
                </View>
              </View>
              <View style={styles.divider} />
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => setAddr(!addr)}>
                  <View style={styles.circle}>
                    {!addr && <View style={styles.activeCircle} />}
                  </View>
                </TouchableOpacity>
                <View style={{flex: 1}}>
                  <Text style={styles.addrTitle}>
                    Use a different billing address
                  </Text>
                </View>
              </View>
            </View>
          </View> */
}
