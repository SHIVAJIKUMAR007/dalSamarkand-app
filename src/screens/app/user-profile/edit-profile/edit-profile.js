import React, {useEffect, useState} from 'react';
import {View, StatusBar, Image, ScrollView} from 'react-native';
import CustomHeader from '../../../../components/custom-header';
import styles from './style';
import BrownBtn from '../../../../components/brown-btn';
import GreyInputBox from '../../../../components/grey-input-box';
// import ImagePicker from 'react-native-image-crop-picker';
import {useGlobal} from 'reactn';
import instance from '../../../../axios';
import AsyncStorage from '@react-native-community/async-storage';
import {dalsamarkandJwtToken} from '../../../../constants/appConstant';
// import {useToast} from 'react-native-toast-notifications';

export default function EditProfile(props) {
  const [user, setuser] = useGlobal('user');
  const [editedData, seteditedData] = useState(null);
  const [isEditing, setisEditing] = useState(false);
  // const toast = useToast();

  const [errorAlert, seterrorAlert] = useGlobal('errorAlert');
  const [successAlert, setsuccessAlert] = useGlobal('successAlert');
  useEffect(() => {
    seteditedData(user);
    return () => {
      seteditedData(null);
    };
  }, [user?._id]);

  const updateProfile = () => {
    // if(editedData?.email)
    let validEmailType = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!editedData?.email?.match(validEmailType) || !editedData?.name) {
      console.log(editedData, 'djfkjskdfkjk');
      seterrorAlert({
        visible: true,
        message: 'Please fill all your details correctly.',
      });
      return;
    }
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
          setsuccessAlert({
            visible: true,
            message: res.message || res.error || JSON.stringify(res),
          });
          setuser(editedData);
        } else {
          seterrorAlert({
            visible: true,
            message: res.message || res.error || JSON.stringify(res),
          });
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
            value={editedData?.phone?.toString()}
            editable={false}
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
        <BrownBtn
          title="Update"
          isLoading={isEditing}
          onPress={updateProfile}
        />
      </View>
    </ScrollView>
  );
}
