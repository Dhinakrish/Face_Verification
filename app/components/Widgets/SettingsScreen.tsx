/*************************************************
 * Tracker
 * @exports
 * @function SettingsScreen.js
 * Created by sudhar on 03/03/2021
 * Copyright © 2021 Proglint. All rights reserved.
 *************************************************/

'use strict';
import React from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';

import Constants from '../../util/Constants';
import Header from '../UI/organisms/Header';
import Container from '../UI/organisms/container';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppImages from '../../assets/images/AppImages';
import MenuButton from '../UI/molecules/MenuButton';

const SettingsScreen = () => {
  const signOut = () => {
    Alert.alert(
      'Info',
      'Are you sure you want to Logout',
      [
        {
          text: 'Logout',
          onPress: () => {},
          style: 'destructive',
        },
        {
          text: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };
  const OnPress = (id: string) => {
    if(id === 'call'){
      // Actions.CallJoinScreen();
    } else {
      // Actions.CallJoinScreen();
    }
    
    //Actions.VideoConnectionScreen();
  };
  return (
    <Container>
      {
        //toolbar starts
      }
      <Header title={'settings'} isHideBackButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.container, {marginTop: 30}]}>
          <View style={[styles.subViewContainer]}>
            <MenuButton
              id="profile"
              title="My Profile"
              imageType={AppImages.ARROW}
              onTap={OnPress}
            />
            <MenuButton
              id="Settings"
              title="Settings"
              imageType={AppImages.ARROW}
              onTap={OnPress}
            />
            <MenuButton
              id="call"
              title="Call"
              imageType={AppImages.ARROW}
              onTap={OnPress}
            />
            <MenuButton
              id="About"
              title="About"
              imageType={AppImages.ARROW}
              onTap={OnPress}
            />
          </View>
          <View style={{height: 45}} />
          <View style={[styles.subViewContainer]}>
            <MenuButton
              id="logout"
              title="Log out"
              imageType={AppImages.ARROW}
              onTap={OnPress}
            />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default SettingsScreen;

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  subViewContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  touchableView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  rightArrow: {
    width: hp('1.6%'),
    height: hp('1.6%'),
    tintColor: Constants.COLOR.FONT_PRIMARY,
  },
  textStyle: {
    paddingVertical: 10,
    color: Constants.COLOR.FONT_PRIMARY,
  },
});
