import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  Platform,
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
import PickerCompo from '../../../../components/PickerCompo';

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
  const [allCity, setallCity] = useState({});
  const [user, setuser] = useGlobal('user');
  const toast = useToast();
  const [errorAlert, seterrorAlert] = useGlobal('errorAlert');
  const [successAlert, setsuccessAlert] = useGlobal('successAlert');
  const [warnAlert, setwarnAlert] = useGlobal('warnAlert');

  const onChange = async (event, selectedDate) => {
    let currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    let date_format = moment(currentDate).format('dddd, LL');
    setDate(currentDate);
    let result = await isHoliday(toast, currentDate, seterrorAlert);
    // console.log(date_format, currentDate, result);

    if ((Platform.OS == 'ios' || event.type == 'set') && result == 1) {
      setDod(date_format);
      setrightDateTime(pre => {
        return {...pre, date: true};
      });
    } else if ((Platform.OS == 'ios' || event.type == 'set') && result == 0) {
      setDod('Select date of delivery');
      setrightDateTime(pre => {
        return {...pre, date: false};
      });
      seterrorAlert({
        visible: true,
        message:
          date_format + ' is holiday and our delivery services will be closed.',
      });
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
    let result = await isStoreOnTime(toast, currTime, seterrorAlert);
    console.log(time_format, currTime, result);
    if ((Platform.OS == 'ios' || event.type == 'set') && result == 1) {
      setTod(time_format);
      setrightDateTime(pre => {
        return {...pre, time: true};
      });
    } else if ((Platform.OS == 'ios' || event.type == 'set') && result == 0) {
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
        console.log(data, ' =========> 59');
        setallAddress(data?.items);
      },
      res => console.log(res),
      props.navigation,
      setuser,
    );
    axiosGet(
      'cityandpin',
      data => {
        data = data.map(d => {
          return {label: d?.name, value: d?._id};
        });
        setallCity(data);
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
              // SuccessToast(toast, deleteMsg?.mgs || deleteMsg?.message);
              setsuccessAlert({
                visible: true,
                message:
                  deleteMsg.message ||
                  deleteMsg.error ||
                  JSON.stringify(deleteMsg),
              });

              setallAddress(deleteMsg?.data?.items);
            } else {
              // Alert.alert('Fail');
              seterrorAlert({
                visible: true,
                message: deleteMsg?.mgs || deleteMsg?.message,
              });
              // ErrorToast(toast, );
            }
          } catch (error) {
            // Alert.alert('Fail', error);
            // ErrorToast(toast, error.message);
            seterrorAlert({
              visible: true,
              message: error.message || error.error || JSON.stringify(error),
            });
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
                    {`${address?.address}, ${address?.landmark}, ${address?.city?.name}, - ${address?.pin_code?.code}`}
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
            <View style={{marginVertical: 15}}>
              <View style={styles.totalContainer}>
                <Text style={styles.subTotalHeading}>Subtotal</Text>
                <Text style={styles.subTotal}>₹ {checkout?.subTotal}</Text>
              </View>
              <View style={{marginVertical: 2}} />
              <View style={styles.totalContainer}>
                <Text style={styles.devCharges}>Delivery Charges</Text>
                <Text style={styles.devTotal}>
                  {checkout?.delivery_charges
                    ? '₹ ' + checkout?.delivery_charges
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
              ₹{' '}
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
          allCity={allCity}
        />
      </ScrollView>

      <View style={styles.bottomBtn}>
        <BrownBtn
          title="Proceed to payment"
          disabled={
            selectedAddress == null ||
            !rightDateTime.date ||
            !rightDateTime.time
          }
          onPress={() => {
            // if (

            // ) {
            //   console.log(
            //     selectedAddress,
            //     !rightDateTime.date,
            //     !rightDateTime.time,
            //   );
            //   return;
            // }
            props.navigation.navigate('CheckoutPayment', {
              address_id: allAddress[selectedAddress]?._id,
              checkout: checkout,
              tod: time,
              dod: date,
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
  allCity,
}) => {
  const toast = useToast();
  const [isLoading, setisLoading] = useState(false);

  const [errorAlert, seterrorAlert] = useGlobal('errorAlert');
  const [successAlert, setsuccessAlert] = useGlobal('successAlert');
  const [warnAlert, setwarnAlert] = useGlobal('warnAlert');

  const [addressData, setaddressData] = useState({
    address: null,
    city: null,
    pin_code: null,
    landmark: null,
    name: null,
    phone: null,
  });
  const [allPin, setallPin] = useState([]);
  const [isFormValid, setisFormValid] = useState(false);
  // console.log(address);
  useEffect(() => {
    setaddressData({
      address: address?.address ? address?.address : null,
      city: address?.city?._id ? address?.city?._id : null,
      pin_code: address?.pin_code?._id ? address?.pin_code?._id : null,
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
  function validform(addressData) {
    if (!addressData?.name) {
      // Alert.alert('Please check');
      // ErrorToast(toast, 'Name field is required.');

      return false;
    }
    if (!addressData?.address) {
      // Alert.alert('Please check');
      // ErrorToast(toast, 'Address field is required.');

      return false;
    }
    if (!addressData?.landmark) {
      // Alert.alert('Please check');
      // ErrorToast(toast, 'Landmark field is required.');

      return false;
    }
    if (!addressData?.city) {
      // Alert.alert('Please check');
      // ErrorToast(toast, 'City field is required.');

      return false;
    }
    if (!addressData?.pin_code) {
      // Alert.alert(
      //   'Please check',
      //   ,
      // );
      // ErrorToast(toast, 'Pin code is required');

      return false;
    }
    if (addressData?.phone?.length != 10) {
      // Alert.alert(
      //   'Please check',
      //   ,
      // );
      // ErrorToast(toast, 'Mobile number is required and must be of 10 digit.');
      return false;
    }

    return true;
  }

  function addAddress() {
    console.log(addressData);
    setisLoading(true);
    try {
      axiosPost(
        'address',
        addressData, // add a mongoid in state
        data => {
          console.log(data);
          // Alert.alert('Success', );
          // SuccessToast(toast, );
          setsuccessAlert({
            visible: true,
            message: 'Address added successfully',
          });
          setModalVisible(false);
          setallAddress(data?.items);
          setisLoading(false);
          setaddressData({
            address: null,
            city: null,
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
        // SuccessToast(toast, );
        setsuccessAlert({
          visible: true,
          message: updateData.mgs || updateData.message,
        });

        setallAddress(updateData?.data?.items);
        setModalVisible(false);
      } else {
        // Alert.alert('Fail', updateData?.mgs || updateData?.message);

        seterrorAlert({
          visible: true,
          message:
            updateData.mgs ||
            updateData.message ||
            updateData.error ||
            JSON.stringify(updateData),
        });
      }
    } catch (error) {
      // Alert.alert('Fail', error);
      // ErrorToast(toast, error.message || error.error || JSON.stringify(error));
      seterrorAlert({
        visible: true,
        message: error.message || error.error || JSON.stringify(error),
      });
      setisLoading(false);
    }
  }
  function getallPin(city_id) {
    console.log(city_id, 'hkjhkjjjhh');
    if (city_id)
      axiosGet(
        'cityandpin/' + city_id,
        res => {
          console.log(res);
          res = res.map(r => {
            return {label: r?.code, value: r?._id};
          });
          setallPin(res);
        },
        res =>
          // ErrorToast(toast, res.message || res.error || JSON.stringify(res))
          seterrorAlert({
            visible: true,
            message: res.message || res.error || JSON.stringify(res),
          }),
        null,
        null,
      );
  }
  useEffect(() => {
    getallPin(addressData?.city);
    return () => {
      setallPin([]);
    };
  }, [addressData?.city]);
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
                onBlur={() => setisFormValid(validform(addressData))}
                placeholder="Name"
              />

              <GreyInputBox
                value={addressData?.address}
                onChangeText={val => {
                  setaddressData(pre => {
                    return {...pre, address: val};
                  });
                }}
                onBlur={() => setisFormValid(validform(addressData))}
                placeholder="Address"
              />
              <GreyInputBox
                value={addressData?.landmark}
                onChangeText={val => {
                  setaddressData(pre => {
                    return {...pre, landmark: val};
                  });
                }}
                onBlur={() => setisFormValid(validform(addressData))}
                placeholder="Landmark"
              />
              <PickerCompo
                // showLabel="Time Slot"
                // required
                data={allCity}
                selectedValue={addressData?.city}
                onValueChange={val => {
                  // getallPin(val);
                  setaddressData(pre => {
                    pre = {...pre, city: val};
                    setisFormValid(validform(pre));
                    return pre;
                  });
                }}
                Placeholder="Select city"
                noDataMassage="No city is found"
                mode="dropdown"
              />
              <View style={{height: 10}}></View>
              <PickerCompo
                // showLabel="Time Slot"
                // required
                data={allPin}
                selectedValue={addressData?.pin_code}
                onValueChange={val => {
                  setaddressData(pre => {
                    pre = {...pre, pin_code: val};
                    setisFormValid(validform(pre));
                    return pre;
                  });
                }}
                Placeholder="Select Pin code"
                noDataMassage="No pin code found"
                mode="dropdown"
              />
              <GreyInputBox
                value={addressData?.phone?.toString()}
                onChangeText={val => {
                  setaddressData(pre => {
                    pre = {...pre, phone: val};
                    setisFormValid(validform(pre));
                    return pre;
                  });
                }}
                keyboardType="numeric"
                maxLength={10}
                placeholder="Mobile number"
              />
              <View style={{marginVertical: 10}}>
                <BrownBtn
                  disabled={!isFormValid}
                  isLoading={isLoading}
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
