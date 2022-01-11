import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CustomHeader from '../../../../components/custom-header';
import styles from './style';
import BrownBtn from '../../../../components/brown-btn';
import {ICONS} from '../../../../constants/icons';
import {COLORS} from '../../../../constants/colors';
import {ScrollView} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {IMAGES} from '../../../../constants/images';
import {useGlobal} from 'reactn';
import {axiosGet} from '../../../../axios';
import {FONT_FAMILY} from '../../../../constants/font-family';

const {height} = Dimensions.get('window');

export default function OrderStatus(props) {
  let orderId = props?.route?.params?.orderId;
  const [orderDetail, setorderDetail] = useState({});
  const [user, setuser] = useGlobal('user');
  useEffect(() => {
    axiosGet(
      'order/' + orderId,
      data => {
        // console.log(data);
        setorderDetail(data);
      },
      res => console.log(res),
      props.navigation,
      setuser,
    );
    return () => {
      setorderDetail({});
    };
  }, []);
  return (
    <>
      <ScrollView style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="dark-content"
        />

        <CustomHeader title="Order Status" />

        <View style={{paddingHorizontal: 30}}>
          <Text style={styles.heading}>#{orderDetail?._id}</Text>

          <View style={styles.card}>
            <View style={{flex: 3}}>
              <Text style={styles.otherInfo}>Date Purchased</Text>
              <Text style={styles.date}>Fri, Oct 17, 2021</Text>
            </View>
            <View style={{flex: 1}}>
              <Feather name="chevron-right" color={COLORS.BLACK} size={24} />
            </View>
            <View style={{flex: 3}}>
              <Text style={styles.otherInfo}>Estimated Delivery</Text>
              <Text style={styles.date}>Sun, Oct 19, 2021</Text>
            </View>
          </View>

          <View style={styles.stepperContainer}>
            <View style={styles.activeCircle}>
              <Feather name="check" color={COLORS.WHITE} size={20} />
            </View>
            <View style={styles.stepperCompletedLine} />
            <View style={styles.activeCircle}>
              <Feather name="check" color={COLORS.WHITE} size={20} />
            </View>
            <View style={styles.stepperLine} />
            <View style={styles.circle}></View>
          </View>

          <View style={{marginVertical: 20}}>
            <View style={styles.orderStatusContainer}>
              <Text style={styles.orderStatus}>
                Fri, Oct 17, 201, 11:100 am
              </Text>
              <Text style={styles.orderStatus}>
                Your order has been received
              </Text>
            </View>
            <View style={styles.orderStatusContainer}>
              <Text style={styles.orderStatus}>
                Fri, Oct 17, 201, 11:100 am
              </Text>
              <Text style={styles.orderStatus}>
                Your order has been processed
              </Text>
            </View>
            <View style={styles.orderStatusContainer}>
              <Text style={styles.orderStatus}>
                Fri, Oct 18, 201, 11:100 am
              </Text>
              <Text style={styles.orderStatus}>Your order is on the way</Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <View style={styles.btn}>
                <Feather name="map-pin" color={COLORS.WHITE} size={14} />
                <Text style={styles.btnTxt}>Track My Order</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.heading}>Your Orders</Text>
            <View style={styles.divider} />
            {orderDetail?.cart?.map((cartItem, i) => (
              <View style={styles.productCard} key={i}>
                <View style={{flex: 1, justifyContent: 'space-between'}}>
                  <Text style={styles.productName}>
                    {cartItem?.productId?.title}
                  </Text>
                  <View>
                    <Text style={styles.productPrice}>
                      {cartItem?.price} each
                    </Text>
                    <Text style={styles.productQty}>
                      Qty : {cartItem?.quantity}
                    </Text>
                  </View>
                </View>
                <View style={styles.imageContainer}>
                  <Image style={styles.image} source={IMAGES.PRODUCT} />
                </View>
              </View>
            ))}
          </View>
        </View>
        <RatingSystem order={orderDetail} />
      </ScrollView>
      <View style={{padding: 25, backgroundColor: COLORS.WHITE}}>
        <BrownBtn
          title="Continue Shopping"
          onPress={() => {
            props.navigation.navigate('Home');
          }}
        />
      </View>
    </>
  );
}

const RatingSystem = ({order}) => {
  const [rating, setrating] = useState(null);

  return (
    <>
      <Text style={[styles.heading, {marginHorizontal: 30, marginTop: 10}]}>
        Rate Us
      </Text>

      <View style={styles.ratingBorderView}>
        <Text
          style={{
            fontFamily: FONT_FAMILY.baskervilleOldFace,
            fontSize: 13,
          }}>
          Rate your Experience
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => setrating(pre => (pre == 1 ? null : 1))}>
            {rating && rating >= 1 ? (
              <Entypo name="star" size={25} color={COLORS.YELLOW} />
            ) : (
              <Entypo name="star-outlined" size={25} color={COLORS.BLACK} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setrating(pre => (pre == 2 ? null : 2))}>
            {rating && rating >= 2 ? (
              <Entypo name="star" size={25} color={COLORS.YELLOW} />
            ) : (
              <Entypo name="star-outlined" size={25} color={COLORS.BLACK} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setrating(pre => (pre == 3 ? null : 3))}>
            {rating && rating >= 3 ? (
              <Entypo name="star" size={25} color={COLORS.YELLOW} />
            ) : (
              <Entypo name="star-outlined" size={25} color={COLORS.BLACK} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setrating(pre => (pre == 4 ? null : 4))}>
            {rating && rating >= 4 ? (
              <Entypo name="star" size={25} color={COLORS.YELLOW} />
            ) : (
              <Entypo name="star-outlined" size={25} color={COLORS.BLACK} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setrating(pre => (pre == 5 ? null : 5))}>
            {rating && rating >= 5 ? (
              <Entypo name="star" size={25} color={COLORS.YELLOW} />
            ) : (
              <Entypo name="star-outlined" size={25} color={COLORS.BLACK} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
