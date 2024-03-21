/*************************************************
 * Tracker
 * @exports
 * @function SplashScreen.js
 * Created by sudhar on 03/03/2021
 * Copyright © 2021 Proglint. All rights reserved.
 *************************************************/

import React, {useState, useEffect, Fragment} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {checkNetworkConnection} from '../../redux/action/NetworkAction';

import Constants from '../../util/Constants';
import Spinner from 'react-native-spinkit';
import StringFile from '../../util/StringFile';
import JailMonkey from 'jail-monkey';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  splashisloading,
  splasherrorMessage,
} from '../../redux/reducers/SplashReducer';
import AppImages from '../../assets/images/AppImages';

const SplashScreen = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(splashisloading);
  const errorMessage = useSelector(splasherrorMessage);

  const [isJailBroken] = useState(JailMonkey.isJailBroken());
  useEffect(() => {
    dispatch(checkNetworkConnection());
    if (!isJailBroken) {
      dispatch(checkNetworkConnection());
    }
  }, [dispatch, isJailBroken]);
  const _renderAcitvityIndicator = () => {
    if (isJailBroken) {
      return (
        <View
          style={{
            paddingTop: hp('10%'),
            paddingHorizontal: wp('5%'),
            alignItems: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: Constants.FONT_SIZE.M,
              color: Constants.COLOR.FONT_COLOR,
            }}>
            {StringFile.MESSAGE.STRING_ROOT_ACCESS_WARNING}
          </Text>
          <View style={{height: hp('5%')}} />
        </View>
      );
    } else if (isLoading) {
      return (
        <View>
          <Spinner
            style={{marginTop: hp('12.5%')}}
            isVisible={true}
            size={40}
            type={'Wave'}
            color={Constants.COLOR.THEME_SECONDARY}
          />
          <View style={{height: hp('10%')}} />
        </View>
      );
    } else {
      return (
        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: wp('5%'),
            paddingTop: hp('10%'),
          }}>
          <Text
            key={'0001'}
            style={{
              textAlign: 'center',
              color: Constants.COLOR.FONT_COLOR,
              fontSize: Constants.FONT_SIZE.M,
            }}>
            {errorMessage}
          </Text>
          <TouchableOpacity
            style={{marginTop: hp('5%')}}
            key={'0002'}
            onPress={() => {
              dispatch(checkNetworkConnection());
            }}>
            {errorMessage === StringFile.MESSAGE.USE_TOUCH_ID ? (
              <Image
                resizeMode="contain"
                source={AppImages.TOUCHID}
                style={{
                  height: wp('14%'),
                  width: wp('14%'),
                  tintColor: Constants.COLOR.THEME_COLOR,
                }}
              />
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: Constants.FONT_SIZE.L,
                  color: Constants.COLOR.FONT_COLOR,
                  fontWeight: 'bold',
                }}>
                {StringFile.MESSAGE.SETTINGS_RELOAD_TXT}
              </Text>
            )}
          </TouchableOpacity>
          <View style={{height: hp('5%')}} />
        </View>
      );
    }
  };
  return (
    <Fragment>
      <View
        style={{
          flex: 1,
          resizeMode: 'cover',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          resizeMode="contain"
          source={AppImages.LOGO}
          style={styles.image}
        />

        {_renderAcitvityIndicator()}
      </View>
    </Fragment>
  );
};

export default SplashScreen;

// define your styles
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: wp('60%'),
    height: hp('20%'),
  },
});
