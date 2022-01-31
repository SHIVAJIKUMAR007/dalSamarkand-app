import React, {useCallback, useEffect, useState} from 'react';
import {
  StatusBar,
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import CustomHeader from '../../../components/custom-header';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../constants/colors';
import {timeToAgo} from '../../../utils/dateTimeManipulation';
import {axiosGet} from '../../../axios';
import {useGlobal} from 'reactn';

const {height, width} = Dimensions.get('window');

const Notification = props => {
  const [notifications, setnotifications] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [errorAlert, seterrorAlert] = useGlobal('errorAlert');
  const [successAlert, setsuccessAlert] = useGlobal('successAlert');
  const [warnAlert, setwarnAlert] = useGlobal('warnAlert');
  const [user, setuser] = useGlobal('user');
  //get all upcomming notification of user
  const getNotification = async () => {
    setisLoading(true);
    try {
      axiosGet(
        'notification',
        data => {
          setnotifications(data);
          setisLoading(false);
          // console.log(data);
        },
        res => {
          seterrorAlert({
            visible: true,
            message: res.message || res.error || JSON.stringify(res),
          });
          setisLoading(false);
        },
        props.navigation,
        setuser,
      );

      // console.log(notification);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
    setTimeout(() => {
      setisLoading(false);
    }, 10000);
  };
  useEffect(() => {
    getNotification();
  }, []);
  const _onRefresh = () => {
    console.log('_onRefresh');
    getNotification();
  };
  return (
    <>
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="dark-content"
        />

        <CustomHeader title="Notification" />
        {/* all notification are here */}
        {isLoading ? (
          <ActivityIndicator
            color={COLORS.PRIMARY_LIGHT}
            size="large"
            style={{marginTop: 100}}
          />
        ) : notifications?.length ? (
          <SafeAreaView>
            <FlatList
              data={notifications}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={_onRefresh}
                  tintColor={COLORS.PRIMARY}
                />
              }
              renderItem={(notification, i) => (
                <NotificationDetails
                  key={i}
                  getnotification={getNotification}
                  notification={notification.item}
                />
              )}
            />
          </SafeAreaView>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="notifications"
              size={108}
              style={styles.image}
              color={COLORS.PRIMARY_LIGHT}
            />
            <Text style={styles.heading}>No notifications yet</Text>
          </View>
        )}
      </View>
    </>
  );
};

export default Notification;

const NotificationDetails = ({getnotification, notification}) => {
  // console.log(notification);
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length > 2); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  return (
    <>
      <View
        style={{
          borderBottomColor: '#C4C4C4',
          borderBottomWidth: 0.5,
          width: width,
          paddingHorizontal: width * 0.05,
          paddingVertical: 10,
          backgroundColor: '#ffffff',
        }}>
        <Text style={{fontWeight: '700', marginLeft: 4}}>
          {notification?.title
            ? notification?.title
            : notification?.notification?.title}
        </Text>
        {/* <Text numberOfLines={2}>{notification.body}</Text> */}
        <Text
          onTextLayout={onTextLayout}
          numberOfLines={textShown ? undefined : 2}
          style={{lineHeight: 21}}>
          {notification?.body
            ? notification?.body
            : notification?.notification?.body}
        </Text>

        {lengthMore ? (
          <TouchableOpacity onPress={() => {}}>
            <Text
              onPress={toggleNumberOfLines}
              style={{lineHeight: 21, marginTop: 10}}>
              {textShown ? 'Read less' : 'Read more'}
            </Text>
          </TouchableOpacity>
        ) : null}
        <Text
          style={{
            fontSize: 12,
            color: 'rgba(0,0,0,0.5)',
            marginVertical: 10,
          }}>
          {timeToAgo(notification?.createdAt)}
        </Text>
      </View>
    </>
  );
};
