import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
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
import AllInOneSDKManager from 'paytm_allinone_react-native';
import {ErrorToast, SuccessToast} from '../../../../components/CustmToast';
import {useToast} from 'react-native-toast-notifications';

const {width} = Dimensions.get('window');
export default function CheckoutPayment(props) {
  const toast = useToast();
  const [user, setuser] = useGlobal('user');
  const [cart, setcart] = useGlobal('cart');
  let address_id = props.route?.params?.address_id;
  let dod = props.route?.params?.dod;
  let tod = props.route?.params?.tod;
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
        // AlertMsg(res?.message);
        SuccessToast(toast, res.message);
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
        // AlertMsg(res?.message);
        ErrorToast(toast, res.message || res.error || JSON.stringify(res));

        // setorderDetail(pre => {
        //   return {...pre, coupon: null};
        // });
        setdiscount({value: 0, type: null, valueInRs: 0});
      },
      res => {
        // console.log(res);
        ErrorToast(toast, res.message || res.error || JSON.stringify(res));
      },
      props.navigation,
      setuser,
    );
  }
  async function handleOrder() {
    // if (orderDetail?.payment_type == 'paytm') {
    //   Alert.alert(
    //     '',
    //     'Paytm is not available as of now, we are tring to add it.',
    //   );
    //   return;
    // }
    if (!orderDetail?.payment_type) {
      // Alert.alert('', );
      ErrorToast(toast, 'Choose a payment method.');

      return;
    }
    try {
      // let dod=new Date()
      // let tod=new Date()
      // dod.setHour(tod.getHour())
      dod.setHours(tod.getHours());
      dod.setMinutes(tod.getMinutes());
      console.log(dod);
      // return;
      setisSubmitting(true);
      axiosPost(
        'order/place_order',
        {orderDetail, delivery_datetime: dod},
        data => {
          ////////////////// order is placed hence empty the cart //////////////////
          // console.log(data, 'dsjfsdfjksdlfjljk');
          setcart([]);
          setcheckout({});
          ////////////////////// if paying with razorpay ?////////////////////////////
          if (orderDetail?.payment_type == 'razorpay') {
            var options = {
              description: 'Credits towards ' + appName,
              image: appLogo,
              currency: 'INR',
              key: data?.extra_data?.razorpay_key,
              name: appName,
              order_id: data?.order?.payment_details?.order_id, //Replace this with an order_id created using Orders API.
              theme: {color: COLORS.PRIMARY_LIGHT},
            };
            RazorpayCheckout.open(options)
              .then(data => {
                // handle success

                // Alert.alert(`Success`, );
                SuccessToast(toast, 'Your payment is successfully done.');
                setisSubmitting(false);
                props.navigation.navigate('ThankYou');
              })
              .catch(error => {
                // handle failure
                error = JSON.parse(error?.description)?.error?.description;
                // Alert.alert('Error', ` ${error}`);
                ErrorToast(toast, error);

                setisSubmitting(false);
              });
          }
          ///////////else cash on delivery
          else if (orderDetail?.payment_type == 'cod') {
            // Alert.alert('Success', data?.message);
            SuccessToast(toast, 'You order is placed.');
            setisSubmitting(false);
            props.navigation.navigate('ThankYou');
          }
          //////////else if paytm
          else if (orderDetail?.payment_type == 'paytm') {
            let details = data?.order?.payment_details;
            console.log(details);
            Platform.OS == 'ios'
              ? // if platform is ios
                AllInOneSDKManager.startTransaction(
                  details?.order_id,
                  details?.mid,
                  details?.txnToken,
                  details?.amount,
                  'https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=' +
                    details?.order_id,
                  true,
                  true,
                  'paytmMID' + details?.mid,
                )
                  .then(result => {
                    // Alert.alert(
                    //   `Success`,
                    //   ,
                    // );
                    SuccessToast(toast, 'Your payment is successfully done.');
                    console.log(result);
                    setisSubmitting(false);
                    props.navigation.navigate('ThankYou');
                  })
                  .catch(err => {
                    // handleError(err);
                    console.log(err);
                    // Alert.alert(`Fail`, );
                    ErrorToast(toast, 'Your payment is failed.');

                    setisSubmitting(false);
                  })
              : // if platform is android
                AllInOneSDKManager.startTransaction(
                  details?.order_id,
                  details?.mid,
                  details?.txnToken,
                  details?.amount,
                  'https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=' +
                    details?.order_id,
                  true,
                  true,
                )
                  .then(result => {
                    // Alert.alert(
                    //   `Success`,
                    //   ,
                    // );
                    SuccessToast(toast, 'Your payment is successfully done.');
                    console.log(result);
                    setisSubmitting(false);
                    props.navigation.navigate('ThankYou');
                  })
                  .catch(err => {
                    // handleError(err);
                    console.log(err);
                    // Alert.alert(`Fail`, );
                    ErrorToast(toast, 'Your payment is failed.');

                    setisSubmitting(false);
                  });
          } else {
            setisSubmitting(false);
            // Alert.alert('Error', );
            ErrorToast(toast, `Please select a correct payment type`);
          }
        },
        res => {
          console.log(res);
          // Alert.alert('Fail', JSON.stringify(res));
          ErrorToast(toast, res.message || res.error || JSON.stringify(res));

          setisSubmitting(false);
        },
        res => {
          console.log(res);
          // Alert.alert('Fail', JSON.stringify(res));
          ErrorToast(toast, res.message || res.error || JSON.stringify(res));

          setisSubmitting(false);
        },
        props.navigation,
        setuser,
      );
    } catch (error) {
      console.log(error);
      // Alert.alert('Fail', error);
      ErrorToast(toast, error.message);
      setisSubmitting(false);
    }
  }
  return (
    <View style={styles.topBg}>
      <ScrollView style={styles.container}>
        <CustomHeader title="Checkout" />
        <View style={{paddingHorizontal: 20}}>
          <Text style={styles.heading}>Payment Method</Text>
          <Text style={styles.subHeading}>
            All transactions are secure and encrypted.
          </Text>
          {/* razor pay  */}
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
          {/* paytm  */}
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => {
                setorderDetail(pre => {
                  return {...pre, payment_type: 'paytm'};
                });
              }}>
              <View style={styles.circle}>
                {orderDetail?.payment_type == 'paytm' && (
                  <View style={styles.activeCircle} />
                )}
              </View>
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <Text style={styles.name}>Paytm</Text>

              <Text style={styles.otherInfo}>
                After clicking “Complete order”, you will be redirected to Paytm
                app to complete your purchase securely.
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
              style={{flex: 1, width: width * 0.65}}
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
                Rs.{' '}
                {checkout?.delivery_charges
                  ? checkout?.delivery_charges
                  : 'Free'}
              </Text>
            </View>
            <View style={{marginVertical: 2}} />
            <View style={styles.totalContainer}>
              <Text style={styles.devCharges}>
                Discount{' '}
                {discount?.value
                  ? `(${orderDetail?.coupon} applied ${
                      discount?.type == 'amount' ? '- Rs ' : ''
                    } ${discount?.value}${
                      discount?.type == 'amount' ? '' : '%'
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
