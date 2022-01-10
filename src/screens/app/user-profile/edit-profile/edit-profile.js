import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../../../../components/custom-header';
import {COLORS} from '../../../../constants/colors';
import styles from './style';
import Feather from 'react-native-vector-icons/Feather';
import BrownBtn from '../../../../components/brown-btn';
import GreyInputBox from '../../../../components/grey-input-box';
// import ImagePicker from 'react-native-image-crop-picker';
import {useGlobal} from 'reactn';
import instance from '../../../../axios';
import AsyncStorage from '@react-native-community/async-storage';
import AlertMsg from '../../../../components/alert-msg';
import {dalsamarkandJwtToken} from '../../../../constants/appConstant';

export default function EditProfile(props) {
  const [user, setuser] = useGlobal('user');
  const [editedData, seteditedData] = useState(null);
  const [isEditing, setisEditing] = useState(false);
  useEffect(() => {
    seteditedData(user);
    return () => {
      seteditedData(null);
    };
  }, [user?._id]);

  const updateProfile = () => {
    setisEditing(true);
    try {
      AsyncStorage.getItem(dalsamarkandJwtToken).then(async token => {
        let res = await instance.put('profile', editedData, {
          headers: {
            Authorization: token,
          },
        });

        res = res.data;
        console.log(res);
        if (res?.status_code == 1) {
          AlertMsg(res?.message);
          setuser(editedData);
        } else {
          AlertMsg(res?.message);
        }
        setisEditing(false);
      });
    } catch (error) {
      console.log(error);
      setisEditing(false);
    }
    setTimeout(() => {
      setisEditing(false);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <View>
        <CustomHeader title="Edit profile" />
        <View style={{paddingHorizontal: 25}}>
          <View style={{alignItems: 'center'}}>
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
              {/* <TouchableOpacity
                style={styles.editContainer}
                onPress={() => onChangeProfile()}>
                <Feather name="edit" color={COLORS.WHITE} size={12} />
              </TouchableOpacity> */}
            </View>
          </View>
          <GreyInputBox
            value={editedData?.name}
            onChangeText={val =>
              seteditedData(pre => {
                return {...pre, name: val};
              })
            }
            placeholder="Name"
          />
          <GreyInputBox
            value={editedData?.phone.toString()}
            onChangeText={val =>
              seteditedData(pre => {
                return {...pre, phone: val};
              })
            }
            placeholder="Phone Number"
            keyboardType="numeric"
            maxLength={10}
          />
          <GreyInputBox
            value={editedData?.email}
            onChangeText={val =>
              seteditedData(pre => {
                return {...pre, email: val};
              })
            }
            placeholder="Email Address"
          />
          {/* <GreyInputBox placeholder="City" />
          <GreyInputBox placeholder="State" />
          <GreyInputBox placeholder="Pin Code" /> */}
        </View>
      </View>
      <View style={{padding: 25}}>
        <BrownBtn title="Update" disabled={isEditing} onPress={updateProfile} />
      </View>
    </ScrollView>
  );
}
