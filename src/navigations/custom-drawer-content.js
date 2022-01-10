import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FONT_FAMILY} from '../constants/font-family';
import {useGlobal} from 'reactn';
import {COLORS} from '../constants/colors';
import AsyncStorage from '@react-native-community/async-storage';
import {ICONS} from '../constants/icons';
import {DrawerActions} from '@react-navigation/native';
import {dalsamarkandJwtToken} from '../constants/appConstant';
var {width, height} = Dimensions.get('window');

function CustomDrawerContent({navigation}) {
  const [user, setuser] = useGlobal('user');
  const [token, settoken] = useGlobal('jwtToken');
  const [isModalVisible, setModalVisible] = useState(false);
  const ShareApp = async () => {
    const options = {
      message: 'https://play.google.com/store/apps/details?id=com.whatsapp',
    };
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{position: 'absolute', top: 40, right: 20}}
          onPress={() => navigation.closeDrawer()}>
          <Ionicons name="close-outline" color={COLORS.WHITE} size={28} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        {user ? (
          <>
            <DrawerList
              // icon={ICONS.PROFILE}
              iconRNVI={
                <FontAwesome
                  name="user-circle-o"
                  size={20}
                  color={COLORS.WHITE}
                />
              }
              title={'Profile'}
              onPress={() => navigation.navigate('Profile')}
            />
            <DrawerList
              icon={ICONS.ORDERS}
              title={'Orders'}
              onPress={() => navigation.navigate('Orders')}
            />
            <DrawerList
              // icon={ICONS.OFFER}
              iconRNVI={
                <MaterialIcons
                  name="local-offer"
                  size={20}
                  color={COLORS.WHITE}
                />
              }
              title={'Offer & Promo'}
              onPress={() => navigation.navigate('Orders')}
            />

            <DrawerList
              // icon={ICONS.HISTORY}
              iconRNVI={
                <Ionicons name="notifications" size={20} color={COLORS.WHITE} />
              }
              title={'Notification'}
              onPress={() => navigation.navigate('Notification')}
            />
          </>
        ) : (
          <>
            <DrawerList
              // icon={ICONS.HISTORY}
              iconRNVI={
                <Ionicons name="notifications" size={20} color={COLORS.WHITE} />
              }
              title={'Home'}
              onPress={() => navigation.navigate('HomeScreen')}
            />
            <DrawerList
              // icon={ICONS.HISTORY}
              iconRNVI={
                <Ionicons name="notifications" size={20} color={COLORS.WHITE} />
              }
              title={'Login'}
              onPress={() => navigation.navigate('SignIn')}
            />
            <DrawerList
              // icon={ICONS.HISTORY}
              iconRNVI={
                <Ionicons name="notifications" size={20} color={COLORS.WHITE} />
              }
              title={'Register'}
              onPress={() => navigation.navigate('Signup')}
            />
          </>
        )}
      </View>

      {user ? (
        <TouchableOpacity
          style={styles.signOutContainer}
          onPress={() => setModalVisible(!isModalVisible)}>
          <Text style={styles.signOut}>Sign-Out</Text>
          <Image source={ICONS.SIGN_OUT} style={styles.logoutImage} />
        </TouchableOpacity>
      ) : null}

      <Modal
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        isVisible={isModalVisible}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeading}>Sign-Out !</Text>
            <Text style={styles.modalTxt}>
              Are you sure you want to logout ?
            </Text>
            <View style={styles.modalBtnContainer}>
              <TouchableOpacity
                onPress={() => setModalVisible(!isModalVisible)}>
                <Text style={styles.modalBtn}>Cancel</Text>
              </TouchableOpacity>
              <View style={{marginHorizontal: 15}} />
              <TouchableOpacity
                onPress={() => [
                  setModalVisible(!isModalVisible),
                  setuser(null),
                  settoken(null),

                  AsyncStorage.removeItem(dalsamarkandJwtToken),

                  navigation.dispatch(DrawerActions.toggleDrawer()),
                ]}>
                <Text style={styles.modalBtn}>SIGN-OUT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const DrawerList = ({icon, title, navigate, onPress, iconRNVI}) => {
  return (
    <>
      <View style={{marginHorizontal: 20}}>
        <TouchableOpacity style={styles.listContainer} onPress={onPress}>
          <View style={styles.iconContainer}>
            {icon ? <Image source={icon} style={styles.iconImage} /> : null}
            {iconRNVI}
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.labelStyle} numberOfLines={1}>
              {title}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.dot} />
          <View style={styles.bottomBorder} />
          <View style={styles.dot} />
        </View>
      </View>
    </>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },

  headerContainer: {
    justifyContent: 'flex-end',
    height: 120,
  },

  listContainer: {
    flexDirection: 'row',
    paddingVertical: 22.5,
  },

  iconContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    //   backgroundColor: 'red',
  },

  signOut: {
    color: COLORS.YELLOW,
    fontSize: 24,
    fontFamily: FONT_FAMILY.bellefair,
    marginRight: 10,
  },

  signOutContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },

  bottomBorder: {
    borderStyle: 'dashed',
    borderWidth: 0.5,
    borderRadius: 1,
    borderColor: COLORS.WHITE,
    flex: 1,
    marginHorizontal: 2.5,
  },

  dot: {
    height: 4,
    width: 4,
    backgroundColor: COLORS.WHITE,
    borderRadius: 4,
  },

  labelStyle: {
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.WHITE,
    fontSize: 18,
    marginLeft: 5,
    marginRight: 15,
  },
  iconImage: {
    height: 24,
    width: 24,
    resizeMode: 'stretch',
  },

  logoutImage: {
    height: 24,
    width: 24,
  },

  modalContainer: {
    backgroundColor: COLORS.PRIMARY,
    padding: 30,
    borderRadius: 10,
    width: width - 60,
    justifyContent: 'center',
  },

  modalBtn: {
    fontFamily: FONT_FAMILY.bellefair,
    textTransform: 'uppercase',
    color: COLORS.WHITE,
    fontSize: 14,
  },

  modalHeading: {
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.WHITE,
    fontSize: 16,
    marginBottom: 10,
  },

  modalTxt: {
    fontFamily: FONT_FAMILY.bellefair,
    color: COLORS.WHITE,
    fontSize: 14,
    marginVertical: 10,
  },

  modalBtnContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'flex-end',
  },
});
