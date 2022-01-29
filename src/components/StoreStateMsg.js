import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getSettings} from '../utils/settings';
import {COLORS} from '../constants/colors';

const StoreStateMsg = () => {
  const [settings, setsettings] = useState({});
  useEffect(() => {
    getSettings(setsettings);
  }, []);

  return (
    <View>
      {settings?.onMessage ||
      settings?.offMessage ||
      settings?.todayOffMessage ? (
        <Text
          style={{
            color:
              !settings?.todayOn || !settings.currOn
                ? COLORS.RED
                : COLORS.GREEN,
            marginVertical: 15,
            textAlign: 'center',
          }}>
          {settings?.todayOn
            ? settings?.currOn
              ? settings?.onMessage
              : settings?.offMessage
            : settings?.todayOffMessage}
        </Text>
      ) : null}
    </View>
  );
};

export default StoreStateMsg;
