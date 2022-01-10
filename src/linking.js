const config = {
  screens: {
    Notification: {
      path: 'notification',
    },
    'My Profile': {
      path: 'profile',
    },
    CreateNewPass: {
      path: 'create-new-pass',
    },
    'My Bookings': {
      path: 'my-bookings',
    },
  },
};

const linking = {
  prefixes: ['dalsamarkand://app'],
  config,
};

export default linking;
