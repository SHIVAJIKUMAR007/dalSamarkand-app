import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';
import instance, {axiosGet, axiosPost} from '../axios';
import AlertMsg from '../components/alert-msg';
import {
  dalsamarkandCartId,
  dalsamarkandJwtToken,
} from '../constants/appConstant';
/////////////////////   server end cart ///////////////////////////////////

const getCartId = async () => {
  try {
    let cartId = await AsyncStorage.getItem(dalsamarkandCartId);
    if (cartId) return cartId;
    else {
      let cart = await (await instance.get('cart/create_cart')).data;
      console.log(cart);
      if (cart?.status_code == 1) {
        await AsyncStorage.setItem(dalsamarkandCartId, cart?.data?._id);
        return cart?.data?._id;
      } else {
        return null;
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addToCart = async (
  cartItemId,
  qty,
  setcart,
  navigation,
  setuser,
  setisLoading,
  itemName,
) => {
  try {
    setisLoading(true);
    // const startTime = Date.now();
    let cartId;
    let token = await AsyncStorage.getItem(dalsamarkandJwtToken);
    if (!token) {
      cartId = await getCartId();
      if (!cartId) {
        AlertMsg(`Some problem occured`);
        setisLoading(false);
        return;
      }
    }
    axiosPost(
      token ? 'cart' : `cart/${cartId}`,
      {productId: cartItemId, quantity: qty, cartId},
      async data => {
        // const endtime = Date.now();
        // console.log(
        //   endtime - startTime,
        //   'time taken to get response from remove item to  cart time api',
        // );
        AlertMsg(`${itemName ? itemName : 'Product'} added to cart.`);

        setcart(data?.items);
        setisLoading(false);
        return true;
      },
      null,
      null,
      navigation,
      setuser,
    );
  } catch (error) {
    console.log(error);
    setisLoading(false);
    AlertMsg('Error occured' + error);
    return false;
  }
};

export const removeFromCart = async (
  itemId,
  setcart,
  navigation,
  setuser,
  setcheckout,
  itemName,
  setisCartLoading,
) => {
  try {
    // const startTime = Date.now();
    let token = await AsyncStorage.getItem(dalsamarkandJwtToken);
    let cartId;
    if (!token) {
      cartId = await getCartId();
      if (!cartId) {
        AlertMsg(`Some problem occured`);
        setisLoading(false);
        return;
      }
    }
    let form = {productId: itemId, quantity: '0', cartId};

    axiosPost(
      token ? 'cart' : `cart/${cartId}`,
      form,
      async data => {
        // AlertMsg(itemName + ' removed from the cart.');
        // const endtime = Date.now();
        // console.log(
        //   endtime - startTime,
        //   'time taken to get response from remove item to  cart time api',
        // );
        // console.log(data?.items);
        setcart(data?.items);
        if (setcheckout) setcheckout(data);
        setisCartLoading(false);

        return true;
      },
      null,
      null,
      navigation,
      setuser,
    );
  } catch (error) {
    console.log(error);
    AlertMsg('Error occured' + error);
    setisCartLoading(false);

    return false;
  }
};

export const updateItemInCart = async (
  itemId,
  qty,
  setisLoading,
  navigation,
  setuser,
  setcheckout,
  setisCartLoading,
  setcart,
) => {
  let form = {productId: itemId, quantity: qty, cartId};
  let cartId;
  try {
    if (setisLoading) setisLoading(true);
    let token = await AsyncStorage.getItem(dalsamarkandJwtToken);

    if (!token) {
      cartId = await getCartId();
      console.log(cartId);
      if (!cartId) {
        AlertMsg(`Some problem occured`);
        setisLoading(false);
        return;
      }
    }
    // const startTime = Date.now();
    let updateData = await instance.put(
      token ? 'cart/quantity' : `cart/${cartId}/quantity`,
      form,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    updateData = await updateData?.data;

    if (updateData?.status_code == 1) {
      updateData = updateData?.data;
      // AlertMsg(
      //   qty
      //     ? itemName + ' quantity updated to ' + qty
      //     : itemName + ' removed from the cart.',
      // );
      // const endtime = Date.now();
      // console.log(
      //   endtime - startTime,
      //   'time taken to get response from update cart time api',
      // );
      if (setcart) setcart(updateData?.items);
      if (setcheckout) setcheckout(updateData);
      // settotalPrice(updateData?.subTotal);
      if (setisLoading) setisLoading(false);

      if (setisCartLoading) setisCartLoading(false);

      return true;
    } else {
      AlertMsg('Error ' + updateData?.message);
      console.log(updateData);
    }
    if (setisLoading) setisLoading(false);
    if (setisCartLoading) setisCartLoading(false);
  } catch (error) {
    console.log(error);
    AlertMsg('Error occured' + error);
    if (setisCartLoading) setisCartLoading(false);
    if (setisLoading) setisLoading(false);
    return false;
  }
};

/////////////////////   client end cart ///////////////////////////////////

// export const addToCart = async (cartItem, qty, cart, setcart) => {
//   try {
//     let newcart = [];
//     let already = false;
//     cart?.forEach(item => {
//       if (item?.item?._id == cartItem?._id) {
//         already = true;
//         newcart = [...newcart, {...item, quantity: item?.quantity + qty}];
//       } else newcart = [...newcart, item];
//     });
//     if (already) {
//       //   console.log(newcart);
//       await AsyncStorage.setItem('dalsamarkandCart', JSON.stringify(newcart));
//       setcart(newcart);
//       AlertMsg('Product added to cart.');
//       return true;
//     } else {
//       let newCart = [...cart, {item: cartItem, quantity: qty}];
//       //   console.log(newCart);
//       await AsyncStorage.setItem('dalsamarkandCart', JSON.stringify(newCart));
//       setcart(newCart);
//       AlertMsg('Product added to cart.');
//       return true;
//     }
//   } catch (error) {
//     console.log(error);
//     AlertMsg('Error occured' + error);
//     return false;
//   }
// };

// export const removeFromCart = async (itemId, cart, setcart) => {
//   try {
//     let newCart = cart?.filter(item => item?.item?._id != itemId);
//     await AsyncStorage.setItem('dalsamarkandCart', JSON.stringify(newCart));
//     setcart(newCart);
//     AlertMsg('Product removed from the cart.');
//     return true;
//   } catch (error) {
//     console.log(error);
//     AlertMsg('Error occured' + error);
//     return false;
//   }
// };

// export const updateItemInCart = async (
//   itemId,
//   qty,
//   cart,
//   setcart,
//   settotalPrice,
// ) => {
//   let newcart = [];
//   let totalPrice = 0;

//   try {
//     cart?.forEach(item => {
//       if (item?.item?._id == itemId) {
//         // let curPrice = item?.quantity * item?.item?.sale_price;
//         // let newPrice = qty * item?.item?.sale_price;
//         totalPrice += qty * item?.item?.sale_price;
//         // settotalPrice(pre => pre - curPrice + newPrice);
//         newcart = [...newcart, {...item, quantity: qty}];
//       } else {
//         totalPrice += item?.quantity * item?.item?.sale_price;
//         newcart = [...newcart, item];
//       }
//     });
//     settotalPrice(totalPrice);
//     await AsyncStorage.setItem('dalsamarkandCart', JSON.stringify(newcart));
//     setcart(newcart);
//     AlertMsg('Product quantity updated to ' + qty);
//     return true;
//   } catch (error) {
//     console.log(error);
//     AlertMsg('Error occured' + error);
//     return false;
//   }
// };
