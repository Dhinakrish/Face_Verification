/* eslint-disable react-native/no-inline-styles */
/*************************************************
 * Tracker
 * @exports
 * @function Header.js
 * Created by sudhar on 03/03/2021
 * Copyright © 2021 Proglint. All rights reserved.
 *************************************************/

'use strict';
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import Constants from '../../../util/Constants';
import HeaderInterface from '../../interface/HeaderInterface';
import AppImages from '../../../assets/images/AppImages';

const Header = (props: HeaderInterface) => {
  const _renderBackButton = () => {
    if (props.isHideBackButton) {
      return null;
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            _backAction();
          }}>
          <Image
            source={AppImages.BACK}
            resizeMode={'contain'}
            style={{height: 30, width: 30, marginTop: 5, tintColor: 'white'}}
          />
        </TouchableOpacity>
      );
    }
  };
  const _backAction = () => {
  };
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: Constants.COLOR.THEME_COLOR,
        padding: Constants.DIMENSIONS.LEFT_BORDER,
      }}>
      {_renderBackButton()}
      <Text
        style={{
          flex: 1,
          color: 'white',
          fontSize: Constants.FONT_SIZE.XXL,
          textAlign: props.isHideBackButton ? 'left' : 'center',
          fontWeight: 'bold',
        }}>
        {props.title.toLowerCase()}
      </Text>
      <View style={{height: 30, width: 30}} />
    </View>
  );
};

export default Header;
