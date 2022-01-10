import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './custom-drawer-content';
import HomeNavigator from './home-navigator';
import HomeNavigator2 from './home-no-onbording';
import OrdersNavigator from './orders-navigator';
import ProfileNavigator from './profile-navigator';
import HistoryNavigator from './history-navigator';
import PrivacyPolicy from '../screens/app/policies/privacy-policy/privacy-policy';
import RefundPolicy from '../screens/app/policies/refund-policy/refund-policy';
import ShippingPolicy from '../screens/app/policies/shipping-policy/shipping-policy';
import TermsServices from '../screens/app/policies/terms-of-services/terms-services';
import Notification from '../screens/app/notification/Notification';
import {firstTimeThreeScreen} from '../constants/appConstant';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  //////////////////////////////////////////////////////////////////////////////
  //        for implement the three inpro screen one time in lifetime   start
  //////////////////////////////////////////////////////////////////////////
  const [isFirstTime, setisFirstTime] = React.useState(true);

  React.useLayoutEffect(() => {
    // AsyncStorage.removeItem(firstTimeThreeScreen);
    async function stater() {
      const notFirstTime = await AsyncStorage.getItem(firstTimeThreeScreen);
      if (notFirstTime && notFirstTime.length > 0) {
        setisFirstTime(false);
        console.log(notFirstTime);
        SplashScreen.hide();
      } else {
        setisFirstTime(true);
        console.log('seening first time now');
        SplashScreen.hide();
        AsyncStorage.setItem(firstTimeThreeScreen, 'seen one time before');
      }
    }
    stater();
    return () => {
      setisFirstTime(false);
    };
  }, []);
  //////////////////////////////////////////////////////////////////////////////
  //   end ------ for implement the three inpto screen one time in lifetime
  //////////////////////////////////////////////////////////////////////////
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => (
          <CustomDrawerContent navigation={props.navigation} />
        )}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            width: '100%',
          },
        }}>
        {/* HomeNavigator2   does not contain onbording component */}
        <Drawer.Screen
          name="Home"
          component={isFirstTime ? HomeNavigator : HomeNavigator2}
        />
        <Drawer.Screen name="Orders" component={OrdersNavigator} />
        <Drawer.Screen name="Profile" component={ProfileNavigator} />
        <Drawer.Screen name="History" component={HistoryNavigator} />
        <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Drawer.Screen name="RefundPolicy" component={RefundPolicy} />
        <Drawer.Screen name="ShippingPolicy" component={ShippingPolicy} />
        <Drawer.Screen name="TermsServices" component={TermsServices} />
        <Drawer.Screen name="Notification" component={Notification} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
