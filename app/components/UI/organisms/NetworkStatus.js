/* eslint-disable react-native/no-inline-styles */
/*************************************************
 * Tracker
 * @exports
 * @function NetworkStatus.js
 * Created by sudhar on 03/03/2021
 * Copyright © 2021 Proglint. All rights reserved.
 *************************************************/

import React from 'react';
import {SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import Constants from '../../../util/Constants';
import StringFile from '../../../util/StringFile';
import {devicenetworkconnection} from '../../../redux/reducers/DeviceReducer';
import LabelAtom from '../atoms/LabelAtom';

const NetworkStatus = () => {
  const isNetworkConnectivityAvailable = useSelector(devicenetworkconnection);
  if (isNetworkConnectivityAvailable === false) {
    return (
      <SafeAreaView style={{position: 'absolute', top: 0, left: 0, right: 0}}>
        <LabelAtom
          children={StringFile.MESSAGE.STRING_NO_INTERNET}
          customStyle={{
            backgroundColor: 'red',
            textAlign: 'center',
            padding: 5,
            color: 'white',
            fontSize: Constants.FONT_SIZE.SM,
          }}
        />
      </SafeAreaView>
    );
  }
  return null;
};

export default NetworkStatus;
