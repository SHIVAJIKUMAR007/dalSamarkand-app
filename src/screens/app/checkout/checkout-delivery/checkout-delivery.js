import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
} from 'react-native';
import styles from './style';
import CustomHeader from '../../../../components/custom-header';
import BrownBtn from '../../../../components/brown-btn';
import moment from 'moment';
import TimeDatePicker from '../../../../components/time-date-picker';
import GreyInputBox from '../../../../components/grey-input-box';
import axios, {axiosPost, axiosGet} from '../../../../axios';
import {useGlobal} from 'reactn';
import AsyncStorage from '@react-native-community/async-storage';
import {dalsamarkandJwtToken} from '../../../../constants/appConstant';
import {useToast} from 'react-native-toast-notifications';
import {isHoliday, isStoreOnTime} from '../../../../utils/settings';
import {ErrorToast, SuccessToast} from '../../../../components/CustmToast';

export default function CheckoutDelivery(props) {
  const [dod, setDod] = useState(moment().format('dddd, LL'));
  const [date, setDate] = useState(new Date());
  const [rightDateTime, setrightDateTime] = useState({
    date: false,
    time: false,
  });
  const [show, setShow] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [allAddress, setallAddress] = useState([]);
  const [selectedAddress, setselectedAddress] = useState(null);
  const [updateNotAdd, setupdateNotAdd] = useState(false);
  const [updateAddressIndex, setupdateAddressIndex] = useState(null);
  const [checkout, setcheckout] = useState({});
  const [user, setuser] = useGlobal('user');
  const toast = useToast();
  const onChange = async (event, selectedDate) => {
    let currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    let date_format = moment(currentDate).format('dddd, LL');
    setDate(currentDate);
    let result = await isHoliday(toast, currentDate);
    // console.log(date_format, currentDate, result);

    if (event.type === 'set' && result == 1) {
      setDod(date_format);
      setrightDateTime(pre => {
        return {...pre, date: true};
      });
    } else if (event.type === 'set' && result == 0) {
      setDod('Select date of delivery');
      setrightDateTime(pre => {
        return {...pre, date: false};
      });

      ErrorToast(
        toast,
        date_format + ' is holiday and our delivery services will be closed.',
      );
    } else {
      setDod('Select date of delivery');
      setrightDateTime(pre => {
        return {...pre, date: false};
      });
    }
  };

  const [tod, setTod] = useState(moment().format('LT'));
  const [time, setTime] = useState(new Date());
  const [showTime, setShowTime] = useState(false);

  const onChangeTime = async (event, selectedTime) => {
    let currTime = selectedTime || time;
    setShowTime(Platform.OS === 'ios');
    let time_format = moment(currTime).format('LT');
    setTime(currTime);
    let result = isStoreOnTime(toast, currTime);
    console.log(time_format, currTime, result);
    if (event.type === 'set' && result == 1) {
      setTod(time_format);
      setrightDateTime(pre => {
        return {...pre, time: true};
      });
    } else if (event.type === 'set' && result == 0) {
      setTod('Select time of delivery');
      setrightDateTime(pre => {
        return {...pre, time: false};
      });
    } else {
      setTod('Select time of delivery');
      setrightDateTime(pre => {
        return {...pre, time: false};
      });
    }
  };

  useEffect(() => {
    axiosGet(
      'address',
      data => {
        // console.log(data, ' =========> 59');
        setallAddress(data?.items);
      },
      res => console.log(res),
      props.navigation,
      setuser,
    );
    setDod('Select date of delivery');
    setTod('Select time of delivery');
    setcheckout(props?.route?.params?.checkout);
    // console.log(props?.route?.params?.checkout);
    return () => {
      setallAddress([]);
      setcheckout(null);
    };
  }, []);

  function editThisAddress(index) {
    setupdateAddressIndex(index);
    setupdateNotAdd(true);
    setShowAddressModal(true);
  }

  async function deleteThisAddress(id) {
    Alert.alert('Are you sure?', 'Click on continue to delete this address', [
      {
        text: 'Continue',
        onPress: async () => {
          try {
            let token = await AsyncStorage.getItem(dalsamarkandJwtToken);
            let deleteMsg = await axios.delete('address', {
              headers: {
                Authorization: token,
              },
              data: {
                address_id: id,
              },
            });
            deleteMsg = await deleteMsg.data;
            console.log(deleteMsg);

            if (deleteMsg?.status_code == 1) {
              // Alert.alert('Success');
              SuccessToast(toast, deleteMsg?.mgs || deleteMsg?.message);

              setallAddress(deleteMsg?.data?.items);
            } else {
              // Alert.alert('Fail');
              ErrorToast(toast, deleteMsg?.mgs || deleteMsg?.message);
            }
          } catch (error) {
            // Alert.alert('Fail', error);
            ErrorToast(toast, error.message);
          }
        },
      },
      {
        text: 'Do not delete',
        onPress: () => {},
      },
    ]);
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
          <Text style={styles.heading}>Delivery</Text>

          <View style={styles.headingContainer}>
            <Text style={styles.subHeading}>Delivery details</Text>
          </View>
          {/* one of addresses  */}
          {allAddress?.map((address, i) => (
            <View style={styles.card} key={i}>
              <View style={styles.selectAddressView}>
                <TouchableOpacity
                  onPress={() => {
                    selectedAddress == i
                      ? setselectedAddress(null)
                      : setselectedAddress(i);
                  }}>
                  <View style={styles.circle}>
                    {selectedAddress == i && (
                      <View style={styles.activeCircle} />
                    )}
                  </View>
                </TouchableOpacity>
                <View style={{width: '75%'}}>
                  <Text style={styles.name}>{address?.name}</Text>
                  <View style={styles.divider} />
                  <Text style={styles.otherInfo}>
                    {`${address?.address}, ${address?.landmark}, ${address?.city}, ${address?.state} - ${address?.pin_code}`}
                  </Text>
                  <View style={styles.divider} />
                  <Text style={styles.otherInfo}>+91 {address?.phone}</Text>
                </View>
              </View>

              <View style={styles.editAndDelete}>
                <TouchableOpacity
                  onPress={() => {
                    editThisAddress(i);
                  }}>
                  <Text style={styles.editOrDeleteBtnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    deleteThisAddress(address?._id);
                  }}>
                  <Text style={styles.editOrDeleteBtnText}> Delete </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* add address btn  */}
          <TouchableOpacity
            style={styles.addAddressBtn}
            onPress={() => {
              setupdateAddressIndex(null);
              setupdateNotAdd(false);
              setShowAddressModal(true);
            }}>
            <Text style={styles.addAddressBtnText}>+ Add Address</Text>
          </TouchableOpacity>

          <View style={{marginBottom: 120}}>
            <Text style={[styles.subHeading, {marginBottom: 15}]}>
              Pick Date & Time of delivery
            </Text>

            <TimeDatePicker
              show={show}
              value={date}
              date={dod}
              onChange={onChange}
              onPress={() => setShow(true)}
              label="Select date of delivery"
              mode={'date'}
            />

            <TimeDatePicker
              show={showTime}
              value={time}
              date={tod}
              onChange={onChangeTime}
              onPress={() => setShowTime(true)}
              label="Select time of delivery"
              mode={'time'}
            />
            {/* <Text style={[styles.subHeading, {marginVertical: 15}]}>
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
                style={{flex: 1}}
                value={couponCode}
                onChangeText={val => {
                  setcouponCode(val);
                }}
              />
              <TouchableOpacity
                onPress={applyCoupon}
                style={[styles.addAddressBtn, {marginBottom: 0, padding: 15}]}>
                <Text style={styles.addAddressBtnText}>Apply</Text>
              </TouchableOpacity>
            </View> */}

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
            </View>
            <View style={styles.dotContainer}>
              <View style={styles.dot} />
              <View style={styles.bottomBorder} />
              <View style={styles.dot} />
            </View>

            <Text style={styles.totalAmt}>
              Rs.{' '}
              {checkout?.subTotal +
                (checkout?.delivery_charges ? checkout?.delivery_charges : 0)}
            </Text>
          </View>
        </View>
        <AddressModal
          modalVisible={showAddressModal}
          setModalVisible={setShowAddressModal}
          navigation={props.navigation}
          setuser={setuser}
          setallAddress={setallAddress}
          address={
            updateNotAdd ? allAddress[parseInt(updateAddressIndex)] : null
          }
          update={updateNotAdd}
        />
      </ScrollView>

      <View style={styles.bottomBtn}>
        <BrownBtn
          title="Proceed to payment"
          onPress={() => {
            if (selectedAddress == null) {
              // Alert.alert(
              //   'Select address',
              //   'Please select an address to proceed.',
              // );
              ErrorToast(toast, 'Please select an address to proceed.');
              return;
            } else if (!rightDateTime.date) {
              ErrorToast(toast, 'Please select an delivery date to proceed.');
              return;
            } else if (!rightDateTime.time) {
              ErrorToast(toast, 'Please select an delivery time to proceed.');
              return;
            }
            props.navigation.navigate('CheckoutPayment', {
              address_id: allAddress[selectedAddress]?._id,
              checkout: checkout,
              tod: selectedTime,
              dod: selectedDate,
            });
          }}
        />
      </View>
    </View>
  );
}

const AddressModal = ({
  modalVisible,
  setModalVisible,
  navigation,
  setuser,
  setallAddress,
  address,
  update,
}) => {
  const toast = useToast();
  const [isLoading, setisLoading] = useState(false);
  const [addressData, setaddressData] = useState({
    address: null,
    city: null,
    state: null,
    pin_code: null,
    landmark: null,
    name: null,
    phone: null,
  });
  // console.log(address);
  useEffect(() => {
    setaddressData({
      address: address?.address ? address?.address : null,
      city: address?.city ? address?.city : null,
      state: address?.state ? address?.state : null,
      pin_code: address?.pin_code ? address?.pin_code : null,
      landmark: address?.landmark ? address?.landmark : null,
      name: address?.name ? address?.name : null,
      phone: address?.phone ? address?.phone : null,
    });
    return () => {
      setaddressData({
        address: null,
        city: null,
        state: null,
        pin_code: null,
        landmark: null,
        name: null,
        phone: null,
      });
    };
  }, [address?._id]);
  function validform() {
    if (!addressData?.name) {
      // Alert.alert('Please check');
      ErrorToast(toast, 'Name field is required.');

      return false;
    }
    if (!addressData?.address) {
      // Alert.alert('Please check');
      ErrorToast(toast, 'Address field is required.');

      return false;
    }
    if (!addressData?.landmark) {
      // Alert.alert('Please check');
      ErrorToast(toast, 'Landmark field is required.');

      return false;
    }
    if (!addressData?.city) {
      // Alert.alert('Please check');
      ErrorToast(toast, 'City field is required.');

      return false;
    }
    if (!addressData?.state) {
      // Alert.alert('Please check');
      ErrorToast(toast, 'State field is required.');

      return false;
    }
    if (addressData?.pin_code?.length != 6) {
      // Alert.alert(
      //   'Please check',
      //   ,
      // );
      ErrorToast(toast, 'Pin code is required and must be of 6 digit.');

      return false;
    }
    if (addressData?.phone?.length != 10) {
      // Alert.alert(
      //   'Please check',
      //   ,
      // );
      ErrorToast(toast, 'Mobile number is required and must be of 10 digit.');
      return false;
    }

    return true;
  }

  function addAddress() {
    // console.log(addressData);
    if (!validform()) return;
    setisLoading(true);
    try {
      axiosPost(
        'address',
        {...addressData, state: '6185543d5dbef53480fb6ad9'}, // add a mongoid in state
        data => {
          // Alert.alert('Success', );
          SuccessToast(toast, 'Address added successfully');
          setModalVisible(false);
          setallAddress(data?.items);
          setisLoading(false);
          setaddressData({
            address: null,
            city: null,
            state: null,
            pin_code: null,
            landmark: null,
            name: null,
            phone: null,
          });
        },
        null,
        null,
        navigation,
        setuser,
      );
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  }
  async function updateAddress() {
    setisLoading(true);
    try {
      let token = await AsyncStorage.getItem(dalsamarkandJwtToken);
      let updateData = await axios.put(
        'address',
        {...addressData, address_id: address?._id},
        {
          headers: {
            Authorization: token,
          },
        },
      );
      updateData = await updateData.data;
      setisLoading(false);

      if (updateData?.status_code == 1) {
        // Alert.alert('Success', updateData?.mgs || updateData?.message);
        SuccessToast(toast, updateData.mgs || updateData.message);
        setallAddress(updateData?.data?.items);
        setModalVisible(false);
      } else {
        // Alert.alert('Fail', updateData?.mgs || updateData?.message);
        ErrorToast(
          toast,
          updateData.mgs ||
            updateData.message ||
            updateData.error ||
            JSON.stringify(updateData),
        );
      }
    } catch (error) {
      // Alert.alert('Fail', error);
      ErrorToast(toast, error.message || error.error || JSON.stringify(error));

      setisLoading(false);
    }
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{marginBottom: 10}}>
              <View style={styles.rowAlignApart}>
                <Text style={styles.heading}>Shipping Address</Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                  <Text>Close </Text>
                </TouchableOpacity>
              </View>
              <GreyInputBox
                value={addressData?.name}
                onChangeText={val => {
                  setaddressData(pre => {
                    return {...pre, name: val};
                  });
                }}
                placeholder="Name"
              />

              <GreyInputBox
                value={addressData?.address}
                onChangeText={val => {
                  setaddressData(pre => {
                    return {...pre, address: val};
                  });
                }}
                placeholder="Address"
              />
              <GreyInputBox
                value={addressData?.landmark}
                onChangeText={val => {
                  setaddressData(pre => {
                    return {...pre, landmark: val};
                  });
                }}
                placeholder="Landmark"
              />
              <GreyInputBox
                value={addressData?.city}
                onChangeText={val => {
                  setaddressData(pre => {
                    return {...pre, city: val};
                  });
                }}
                placeholder="City"
              />
              <GreyInputBox
                value={addressData?.state}
                onChangeText={val => {
                  setaddressData(pre => {
                    return {...pre, state: val};
                  });
                }}
                placeholder="State"
              />
              <GreyInputBox
                value={addressData?.pin_code?.toString()}
                onChangeText={val => {
                  setaddressData(pre => {
                    return {...pre, pin_code: val};
                  });
                }}
                keyboardType="numeric"
                maxLength={6}
                placeholder="Pincode"
              />
              <GreyInputBox
                value={addressData?.phone?.toString()}
                onChangeText={val => {
                  setaddressData(pre => {
                    return {...pre, phone: val};
                  });
                }}
                keyboardType="numeric"
                maxLength={10}
                placeholder="Mobile number"
              />
              <View style={{marginVertical: 10}}>
                <BrownBtn
                  disabled={isLoading}
                  title={update ? 'Update Address' : 'Save Address'}
                  onPress={() => {
                    update ? updateAddress() : addAddress();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
