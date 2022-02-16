import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  Pressable,
} from 'react-native';
import CustomHeader from '../../../../components/custom-header';
import styles from './style';
import BrownBtn from '../../../../components/brown-btn';
import {ICONS} from '../../../../constants/icons';
import {axiosGet} from '../../../../axios';
import {FlatList} from 'react-native-gesture-handler';
import {useGlobal} from 'reactn';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS} from '../../../../constants/colors';
import {FONT_FAMILY} from '../../../../constants/font-family';
import {ActivityIndicator} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
  dalDeliveredStatus,
  dalOrderRecivedStatus,
} from '../../../../constants/appConstant';

const {height} = Dimensions.get('window');
export default function OrdersList(props) {
  const [allOrders, setallOrders] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isRefreshing, setisRefreshing] = useState(false);
  const [user, setuser] = useGlobal('user');
  const [errorAlert, seterrorAlert] = useGlobal('errorAlert');
  const getOrders = () => {
    setisLoading(true);
    axiosGet(
      'order',
      data => {
        // console.log(data);
        setisLoading(false);
        setallOrders(data);
      },
      res => console.log(res),
      props.navigation,
      setuser,
    );
    setTimeout(() => {
      setisLoading(false);
    }, 5000);
  };
  useEffect(() => {
    getOrders();
    return () => {
      setallOrders([]);
    };
  }, []);
  const _onRefresh = () => {
    // setisRefreshing(true)
    console.log('_onRefresh');
    getOrders();
  };
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />

      <CustomHeader title="Orders" />
      {isLoading ? (
        <>
          <ActivityIndicator
            color={COLORS.PRIMARY_LIGHT}
            size="large"
            style={{marginBottom: height / 2}}
          />
        </>
      ) : allOrders?.length ? (
        <>
          <FlatList
            data={allOrders}
            // onRefresh={_onRefresh}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={_onRefresh}
                tintColor={COLORS.PRIMARY}
              />
            }
            renderItem={(item, i) => (
              <OneOrder
                item={item?.item}
                key={item?.index}
                navigation={props.navigation}
              />
            )}
          />
        </>
      ) : (
        <>
          <View style={styles.emptyContainer}>
            <Image source={ICONS.CART} style={styles.image} />
            <Text style={styles.heading}>No orders yet</Text>

            <Text style={styles.subHeading}>
              Hit the button down below to start ordering.
            </Text>
          </View>
          <View style={{padding: 25}}>
            <BrownBtn
              title="Start Ordering"
              onPress={() => props.navigation.navigate('HomeScreen')}
            />
          </View>
        </>
      )}
    </View>
  );
}

function OneOrder({item, navigation}) {
  // console.log(item?.order_status);
  // const {navigation} = useNavigationState();
  return (
    <>
      <Pressable
        onPress={() => {
          navigation.navigate('OrderStatus', {orderId: item?._id});
        }}>
        <View
          style={{
            paddingHorizontal: 20,
            marginVertical: 10,
            borderBottomColor: 'rgba(0,0,0,0.1)',
            borderTopColor: 'rgba(0,0,0,0.1)',
            borderBottomWidth: 7.5,
            borderTopWidth: 7.5,
            paddingTop: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  fontFamily: FONT_FAMILY.baskervilleOldFace,
                }}>
                #OrderID
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '300',
                  color: 'rgba(0,0,0,0.5)',
                  fontFamily: FONT_FAMILY.baskervilleOldFace,
                }}>
                {item?._id}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('OrderStatus', {orderId: item?._id});
              }}
              style={styles.borderBtn}>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.baskervilleOldFace,
                }}>
                Order Details
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',

              fontFamily: FONT_FAMILY.baskervilleOldFace,
              marginTop: 18,
            }}>
            Ordered {item?.cart?.length} items
          </Text>
          {/* <Text
            style={{
              fontSize: 14,
              color: 'rgba(0,0,0,0.5)',

              fontFamily: FONT_FAMILY.baskervilleOldFace,
              marginVertical: 8,
            }}>
            {item?.order_status?._id == dalOrderRecivedStatus?"Your "+item?.order_status?.title}
            We will process your order witthin 12-24 hours. Once processed we
            will update the Estimated Delivery Date and Time.
          </Text> */}
          {/* <RatingSystem order={item} /> */}
          <StepedTrack status={item?.order_status} />
        </View>
      </Pressable>
    </>
  );
}

export const StepedTrack = ({status}) => {
  const [statusMaster, setstatusMaster] = useState({});
  // console.log(status?.title);
  useEffect(() => {
    if (status?._id == dalOrderRecivedStatus)
      setstatusMaster({id: 1, title: status?.title});
    else if (status?._id == dalDeliveredStatus)
      setstatusMaster({id: 3, title: status?.title});
    else setstatusMaster({id: 2, title: status?.title});

    return () => {
      setstatusMaster({});
    };
  }, [status?._id]);
  return (
    <>
      <View style={styles.stepperContainer}>
        {/* always active  */}
        <View style={styles.activeCircle}>
          <Feather name="check" color={COLORS.WHITE} size={20} />
        </View>
        {/* active line if id>1 */}
        {statusMaster?.id > 1 ? (
          <View style={styles.stepperCompletedLine} />
        ) : (
          <View style={styles.stepperLine} />
        )}
        {/* active circle if id>1 */}
        {statusMaster?.id > 1 ? (
          <View style={styles.activeCircle}>
            <Feather name="check" color={COLORS.WHITE} size={20} />
          </View>
        ) : (
          <View style={styles.circle}></View>
        )}
        {/* active line if id>2 */}
        {statusMaster?.id > 2 ? (
          <View style={styles.stepperCompletedLine} />
        ) : (
          <View style={styles.stepperLine} />
        )}
        {/* active circle if id>2 */}
        {statusMaster?.id > 2 ? (
          <View style={styles.activeCircle}>
            <Feather name="check" color={COLORS.WHITE} size={20} />
          </View>
        ) : (
          <View style={styles.circle}></View>
        )}
      </View>
      <Text
        style={{
          fontFamily: FONT_FAMILY.baskervilleOldFace,
          marginBottom: 10,
          textAlign:
            statusMaster?.id == 1
              ? 'left'
              : statusMaster?.id == 3
              ? 'right'
              : 'center',
        }}>
        {statusMaster?.title}
      </Text>
    </>
  );
};

const RatingSystem = ({order}) => {
  const [rating, setrating] = useState(null);

  return (
    <>
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
            <Entypo
              name="star-outlined"
              size={25}
              color={rating && rating >= 1 ? COLORS.YELLOW : COLORS.BLACK}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setrating(pre => (pre == 2 ? null : 2))}>
            <Entypo
              name="star-outlined"
              size={25}
              color={rating && rating >= 2 ? COLORS.YELLOW : COLORS.BLACK}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setrating(pre => (pre == 3 ? null : 3))}>
            <Entypo
              name="star-outlined"
              size={25}
              color={rating && rating >= 3 ? COLORS.YELLOW : COLORS.BLACK}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setrating(pre => (pre == 4 ? null : 4))}>
            <Entypo
              name="star-outlined"
              size={25}
              color={rating && rating >= 4 ? COLORS.YELLOW : COLORS.BLACK}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setrating(pre => (pre == 5 ? null : 5))}>
            <Entypo
              name="star-outlined"
              size={25}
              color={rating && rating >= 5 ? COLORS.YELLOW : COLORS.BLACK}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
