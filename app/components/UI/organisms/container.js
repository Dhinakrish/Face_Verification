/* eslint-disable react-native/no-inline-styles */
/*************************************************
 * Tracker
 * Container
 * Created by Saravanan.H on 23/05/2022
 * Copyright © 2021 Proglint. All rights reserved.
 *************************************************/

'use strict';
import React, {Fragment} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
// import Constants from '../../../util/Constants';
import {ContainerInterface} from '../../interface/ContainerInterface';

const Container = (props: ContainerInterface) => {
  return (
    <Fragment>
      <View style={{flex: 1, backgroundColor: props.backgroundColor}}>
        <StatusBar barStyle={props.barStyle} />
        <SafeAreaView style={{flex: 0, backgroundColor: props.topColor}} />
        <SafeAreaView style={{flex: 1}}>{props.children}</SafeAreaView>
        <SafeAreaView style={{flex: 0, backgroundColor: props.bottomColor}} />
      </View>
    </Fragment>
  );
};

Container.defaultProps = {
  barStyle: 'light-content',
  topColor: 'black',
  backgroundColor: 'white',
  bottomColor: 'transparent',
};

export default Container;
