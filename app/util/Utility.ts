/*************************************************
 * Tracker
 * Utility.js
 * Created by Saravanan.H  on 23/05/2022
 * Copyright © 2021 Proglint. All rights reserved.
 *************************************************/

import {Alert, Dimensions} from 'react-native';

import Snackbar from 'react-native-snackbar';
import StringFile from './StringFile';

export let userTokenRenewalTimer;
import {ALERT} from './Constants';

export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;

export default class Utility {
  static showSnackBar(message: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
    });
  }

  static showSnackBarAlways(message: string, isError: boolean) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_INDEFINITE,
      action: {
        text: StringFile.MESSAGE.ALERT.BTN.OK,
        textColor: isError ? 'red' : 'green',
        onPress: () => {
          /* Do something. */
        },
      },
    });
  }

  static hideSnackBar() {
    Snackbar.dismiss();
  }

  static showAlertWithPopAction(title: string, message: string) {
    Alert.alert(
      title,
      message,
      [{text: ALERT.BTN.OK, onPress: () => console.log('')}],
      {cancelable: false},
    );
  }

  static validateEmail(email: string) {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  static validateName(name : string) {
    let re = /^[a-zA-Z ẞßÉäöüÄÖÜùûüÿàâæéèêëïîôœÙÛÜŸÀÂÆÉÈÊËÏÎÔŒ]{1,250}$/;
    return re.test(String(name).toLowerCase());
  }

  static validatePassword(inputtxt : string) {
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    return decimal.test(String(inputtxt));
  }

  static validateChar(inputtxt: string) {
    var decimal = /^.{8,15}$/;
    return decimal.test(String(inputtxt));
  }

  static validateOneLow(inputtxt: string) {
    var decimal = /^(?=.*[a-z]).{1,}$/;
    return decimal.test(String(inputtxt));
  }

  static validateOneCap(inputtxt: string) {
    var decimal = /^(?=.*[A-Z]).{1,}$/;
    return decimal.test(String(inputtxt));
  }

  static validateOneDigit(inputtxt: string) {
    var decimal = /^(?=.*[0-9]).{1,}$/;
    return decimal.test(String(inputtxt));
  }

  static validateOneSpecial(inputtxt: string) {
    var decimal = /^(?=.*[^a-zA-Z0-9]).{1,}$/;
    return decimal.test(String(inputtxt));
  }

  static myLog(...params: any) {
    console.log(...params);
  }
}
