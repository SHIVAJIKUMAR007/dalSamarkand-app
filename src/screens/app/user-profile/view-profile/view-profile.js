import React, {useEffect} from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomHeader from '../../../../components/custom-header';
import {COLORS} from '../../../../constants/colors';
import styles from './style';
import Feather from 'react-native-vector-icons/Feather';
import BrownBtn from '../../../../components/brown-btn';
import {useGlobal} from 'reactn';
import {axiosGet} from '../../../../axios';
import AsyncStorage from '@react-native-community/async-storage';
import {dalsamarkandJwtToken} from '../../../../constants/appConstant';

export default function ViewProfile(props) {
  const [user, setuser] = useGlobal('user');
  useEffect(() => {
    axiosGet(
      'profile',
      async userData => {
        // console.log(userData, '===========>38 home.js');
        setuser(userData);
      },
      res => {
        AsyncStorage.removeItem(dalsamarkandJwtToken);
        setuser(null);
      },
      null,
      setuser,
    );
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <View>
        <CustomHeader title="My profile" />
        <View style={{paddingHorizontal: 25}}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Personal details</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('EditProfile')}>
              <Text style={styles.change}>Change</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: user?.profile_image
                    ? user?.profile_image
                    : 'https://ui-avatars.com/api/?name=' + user?.name,
                }}
                resizeMode="stretch"
                style={styles.image}
              />
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.name}>{user?.name}</Text>
              <View style={styles.divider} />
              <Text style={styles.otherInfo}>{user?.email}</Text>
              <View style={styles.divider} />
              <Text style={styles.otherInfo}>+91 {user?.phone}</Text>
              <View style={styles.divider} />
              {/* <Text style={styles.otherInfo}>
                No 15 uti street off ovie palace road effurun delta state
              </Text> */}
            </View>
          </View>
          <TouchableOpacity
            style={styles.listCard}
            onPress={() => props.navigation.navigate('Orders')}>
            <Text style={styles.cardHeading}>Orders</Text>
            <Feather name="chevron-right" color={COLORS.PRIMARY} size={18} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.listCard}>
            <Text style={styles.cardHeading}>Pending reviews</Text>
            <Feather name="chevron-right" color={COLORS.PRIMARY} size={18} />
          </TouchableOpacity> */}
        </View>
      </View>
      {/* <View style={{padding: 25}}>
        <BrownBtn
          title="Update"
          onPress={() => props.navigation.navigate('EditProfile')}
        />
      </View> */}
    </View>
  );
}
