import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {Alert} from 'react-native';
import {serverEndPoint} from './config';
import {dalsamarkandJwtToken} from './constants/appConstant';

let instance = axios.create({
  baseURL: serverEndPoint,
});

function invalid_user_handler(navigation, setuser) {
  Alert.alert('', 'Please login first');
  try {
    AsyncStorage.removeItem(dalsamarkandJwtToken);
    setuser(null);
    navigation?.navigate('SignIn');
  } catch (error) {
    setuser(null);
  }
}

function err_handler(error_msg, url) {
  console.log(error_msg, url, '==>axios24');
  Alert.alert('Error!', error_msg);
}

function unknown_err_handler(response, url) {
  console.log(response, url, 'sdjfk');
  Alert.alert(
    'Error!',
    response?.message ? response.message : 'Somthing when wrong.',
  );
}

function success_handler({message}) {
  Alert.alert('Success', message);
}

function form_validation_handler(response) {
  Alert.alert('Please check', JSON.stringify(response?.validation_errors));
}
async function axiosPost(
  url,
  form,
  cb_success,
  cb_error,
  cb_form_validator,
  navigation,
  setuser,
) {
  // console.log(serverEndPoint + url);
  AsyncStorage.getItem(dalsamarkandJwtToken).then(token => {
    let isForm = form instanceof FormData;
    instance
      .post(url, form, {
        headers: {
          Authorization: token,
          'Content-Type': isForm ? 'multipart/form-data' : 'application/json',
        },
      })
      .then(res => res.data)
      .then(response => {
        // console.log(response, '========>rekjfksdkfjss');
        switch (response.status_code) {
          case 0: {
            if (cb_error) cb_error(response);
            else
              err_handler(
                response?.error ? response?.error : response?.message,
                url,
              );
            break;
          }

          case 1: {
            if (cb_success) {
              cb_success(response?.data ? response?.data : response);
            } else success_handler(response);
            break;
          }

          case -1: {
            invalid_user_handler(navigation, setuser);

            break;
          }

          case -2: {
            if (cb_form_validator) cb_form_validator(response);
            else form_validation_handler(response);

            break;
          }

          default:
            unknown_err_handler(response, url);
        }
      })
      .catch(err => {
        console.log(err?.response?.status);
        if (err?.response?.status == 422) {
          console.log(err?.response?.data?.errors, 'err ');
          if (cb_form_validator) cb_form_validator(err);
          else form_validation_handler(err);
        } else if (err?.response?.status == 401) {
          console.log('invalide user login first ');
          invalid_user_handler(navigation, setuser);
        } else {
          if (cb_error) cb_error(err);
          else err_handler(err, url + 'catch');
        }
      });
  });
}

async function axiosGet(url, cb_success, cb_error, navigation, setuser) {
  AsyncStorage.getItem(dalsamarkandJwtToken).then(token => {
    // console.log(token, url);
    instance
      .get(url, {
        headers: {Authorization: token},
      })
      .then(res => res.data)
      .then(response => {
        // console.log(response, 'get request res', url);
        switch (response.status_code) {
          case 0: {
            if (cb_error) cb_error(response?.error);
            else err_handler(response?.error, url);
            break;
          }
          case 1: {
            if (cb_success)
              cb_success(response?.data ? response?.data : response);
            else success_handler(response);

            break;
          }

          case -1: {
            invalid_user_handler(navigation, setuser);

            break;
          }

          case -2: {
            form_validation_handler(response?.validation_errors);

            break;
          }
          case -4: {
          }
          default:
            unknown_err_handler(response, url);
        }
      })

      .catch(err => {
        console.log(err?.response);
        if (err?.response?.status == 422 || err?.response?.status == 401) {
          console.log('invalide user login first ');
          invalid_user_handler(navigation, setuser);
        } else {
          if (cb_error) cb_error(err);
          else err_handler(err, url + 'catch');
        }
      });
  });
}

export {axiosGet, axiosPost};
export default instance;
