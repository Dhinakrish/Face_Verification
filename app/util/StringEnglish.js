/*************************************************
 * Tracker
 * @exports
 * StringEnglish.js
 * Created by Saravanan.H  on 23/05/2022
 * Copyright © 2021 Proglint. All rights reserved.
 *************************************************/

import {Platform} from 'react-native';

/**
 * Returns all the meesages in English language
 */
module.exports = {
  MESSAGE: {
    ALERT: {
      TITLE: {
        INFO: 'Info',
        ERROR: 'Error',
        FAILED: 'Failed',
        SUCCESS: 'Success',
        WENT_WRONG: 'Sorry, something went wrong',
        EXPIRED: 'Logout',
      },
      BTN: {
        OK: 'OK',
        CANCEL: 'Cancel',
        YES: 'Yes',
        NO: 'No',
      },
    },
    NO_INTERNET: 'Please check your internet connectivity.',
    TOUCHID_MESSAGE: 'Authentication is needed to login to the app.',
    USE_TOUCH_ID:
      Platform.OS === 'ios'
        ? 'Use TouchID/FaceID to access the application'
        : 'Use TouchID to access the application',
    NO_DATA_FOUND: 'No data found',

    AUTH_FAILED: 'Email and password you entered does not match.',
    EXPIRED: 'Session Expired.',
    REQ_FAILED: 'Request failed.',
    WENT_WRONG: "We're working on it and we'll get it fixed as soon as we can.",
    SETTINGS_RELOAD_TXT: 'Tap to Reload',
    SETTINGS_LOADING_TXT: 'Loading...',
    STRING_LOGIN_TO_APP: 'Login to shop.box',
    STRING_TOUCH_SENSOR: 'Touch sensor',
    STRING_NO_INTERNET: 'No internet connection',
    STRING_ROOT_ACCESS_WARNING:
      Platform.OS === 'ios'
        ? 'Phone has been jail-broken. We found security vulnerability.'
        : 'Root access enable. We found security vulnerability.',

    STRING_PASSWORD_HINT:
      '8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
    STRING_PASSWORD_HINT_MIN_CHAR: '8 to 15 characters',
    STRING_PASSWORD_HINT_2: ' which contain at least ',
    STRING_PASSWORD_HINT_LOW: 'one lowercase letter',
    STRING_PASSWORD_HINT_4: ', ',
    STRING_PASSWORD_HINT_UP: 'one uppercase letter',
    STRING_PASSWORD_HINT_6: ', ',
    STRING_PASSWORD_HINT_NUMERIC: 'one numeric digit',
    STRING_PASSWORD_HINT_8: ', and ',
    STRING_PASSWORD_HINT_SPECIAL: 'one special character',

    STRING_USERNAME: 'Username',
    STRING_PASSWORD: 'Password',
  },
};
