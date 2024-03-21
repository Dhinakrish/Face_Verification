/*************************************************
 * Tracker
 * @exports
 * @function SplashScreen.js
 * Created by Saisubash on 31/07/2022
 * Copyright © 2021 Proglint. All rights reserved.
 *************************************************/

import React, {useState} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import Container from '../UI/organisms/container';
import Header from '../UI/organisms/Header';
import Constants from '../../util/Constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const VideoConnectionScreen = () => {
  const _VideoScreen = () => {
    return (
      <View
        style={{flex: 0.9, backgroundColor: Constants.COLOR.COLOR_BACKGROUND}}>
        <View
          style={{
            borderWidth: 2,
            borderColor: 'white',
            height: hp('22%'),
            width: wp('24%'),
            marginHorizontal: wp('73%'),
            marginVertical: hp('47%'),
            borderBottomLeftRadius: 11,
            borderBottomRightRadius: 11,
            borderTopLeftRadius: 11,
            borderTopRightRadius: 11,
          }}>
          <Image
            style={{
              height: hp('18%'),
              width: wp('18%'),
              marginLeft: wp('2%'),
              marginTop: hp('2%'),
            }}
            source={require('../../assets/images/default.png')}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  };

  const _AcessIcon = () => {
    return (
      <View style={{flex: 0.14, backgroundColor: Constants.COLOR.COLOR_GREY}}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: wp('15%'),
            marginTop: hp('1%'),
          }}>
          <View
            style={{
              borderWidth: 1.5,
              backgroundColor: 'white',
              borderBottomEndRadius: 50,
              borderTopEndRadius: 50,
              borderTopStartRadius: 50,
              borderBottomStartRadius: 50,
              borderColor: Constants.COLOR.FONT_WHITE_COLOR
            //   marginLeft: wp('2%'),
            }}>
            <TouchableOpacity style={{marginHorizontal: wp('3%')}}>
              <Image
                style={{
                  height: hp('8%'),
                  width: wp('8%'),
                  //   marginHorizontal: wp('4%'),
                  // backgroundColor: Constants.COLOR.FONT_WHITE_COLOR,
                }}
                source={require('../../assets/images/microphone.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderWidth: 1.5,
              backgroundColor: 'white',
              borderBottomEndRadius: 50,
              borderTopEndRadius: 50,
              borderTopStartRadius: 50,
              borderBottomStartRadius: 50,
              marginLeft: wp('5%'),
              borderColor: Constants.COLOR.FONT_WHITE_COLOR
            }}>
            <TouchableOpacity style={{marginHorizontal: wp('3%')}}>
              <Image
                style={{
                  height: hp('8%'),
                  width: wp('8%'),
                  //   marginHorizontal: wp('4%'),
                  // backgroundColor: Constants.COLOR.FONT_WHITE_COLOR,
                }}
                source={require('../../assets/images/video.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderWidth: 1.5,
              backgroundColor: 'white',
              borderBottomEndRadius: 50,
              borderTopEndRadius: 50,
              borderTopStartRadius: 50,
              borderBottomStartRadius: 50,
              marginLeft: wp('5%'),
              borderColor: Constants.COLOR.FONT_WHITE_COLOR
            }}>
            <TouchableOpacity style={{marginHorizontal: wp('3%')}}>
              <Image
                style={{
                  height: hp('8%'),
                  width: wp('8%'),
                  //   marginHorizontal: wp('5%'),
                  // backgroundColor: Constants.COLOR.FONT_WHITE_COLOR,
                }}
                source={require('../../assets/images/dial.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderWidth: 1.5,
              backgroundColor: 'white',
              borderBottomEndRadius: 50,
              borderTopEndRadius: 50,
              borderTopStartRadius: 50,
              borderBottomStartRadius: 50,
              marginLeft: wp('5%'),
              borderColor: Constants.COLOR.FONT_WHITE_COLOR
            }}>
            <TouchableOpacity style={{marginHorizontal: wp('3%')}}>
              <Image
                style={{
                  height: hp('8%'),
                  width: wp('8%'),
                  //   marginHorizontal: wp('4%'),
                  // backgroundColor: Constants.COLOR.FONT_WHITE_COLOR,
                }}
                source={require('../../assets/images/chat.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Container>
      <Header title={'Video Stream'} isHideBackButton />
      <TouchableHighlight onPress={() => {}} />
      <View style={{flex: 1}}>
        {_VideoScreen()}
        {_AcessIcon()}
      </View>
    </Container>
  );
};

export default VideoConnectionScreen;
