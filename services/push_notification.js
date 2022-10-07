import {Permission, Notification} from 'react-native';
import {View, Text} from 'react-native';
import React from 'react';

const PUSH_NOTIFICATION = 'https://rallycoding.herokuapp.com/api/tokens';

export default async () => {
  let previousToken = await AsyncStorage.get('pushtoken');

  if (previousToken) {
    return;
  } else {
    let {status} = await AsyncStorage.get('pushtoken');
  }

  return (
    <View>
      <Text>push_notification</Text>
    </View>
  );
};
