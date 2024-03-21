/*************************************************
 * Tracker
 * @exports
 * Constants.js
 * Created by Saravanan.H  on 23/05/2022
 * Copyright © 2021 Proglint. All rights reserved.
 *************************************************/

'use strict';

import {Dimensions, Platform, PixelRatio} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

// based on iphone 5s's scale
const scale = deviceWidth / 320;

function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

/**
 * Returns all the constants used in the application
 * Separate constants according to the category and usage
 */
module.exports = {
  DIMENSIONS: {
    TOP_BORDER_RADIUS: 37,
    TOP_BORDER: 20,
    LEFT_BORDER: 30,
    BASIC_PADDING: 15,
  },
  SCREEN_SIZE: {
    PLUS_SIZE: 667,
  },
  ACTIONS: {
    //Common Actions
    SHOW_FULL_LOADING: 'SHOW_FULL_LOADING',
    HIDE_FULL_LOADING: 'HIDE_FULL_LOADING',
    NETWORK_STATUS_CHANGED: 'NETWORK_STATUS_CHANGED',
    CHANGE_TOUCH_ID_STATUS: 'CHANGE_TOUCH_ID_STATUS',
    CHANGE_IS_FIRST_OPEN: 'CHANGE_IS_FIRST_OPEN',
    DEVICE_TOUCH_ID_AVAILABLE: 'DEVICE_TOUCH_ID_AVAILABLE',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
    APP_GOES_TO_BACKGROUND: 'APP_GOES_TO_BACKGROUND',

    //Splash Screen Actions
    SPLASH_SHOW_LOADING: 'SPLASH_SHOW_LOADING',
    SPLASH_HIDE_LOADING: 'SPLASH_HIDE_LOADING',
    SPLASH_ERROR_UPDATE: 'SPLASH_ERROR_UPDATE',

    //Login Screen Actions
    LOGIN_SHOW_LOADING: 'LOGIN_SHOW_LOADING',
    LOGIN_HIDE_LOADING: 'LOGIN_HIDE_LOADING',
    LOGIN_USER_TOKEN_UPDATE: 'LOGIN_USER_TOKEN_UPDATE',
    LOGIN_USER_INFO_UPDATE: 'LOGIN_USER_INFO_UPDATE',
    LOGIN_UPDATE_PUBLIC_TOKEN: 'LOGIN_UPDATE_PUBLIC_TOKEN',
    LOGGEDIN_USER_DETAILS_RESET: 'LOGGEDIN_USER_DETAILS_RESET',

    //Signup Screen Actions
    SIGNUP_SHOW_PAGE_LOADING: 'SIGNUP_SHOW_PAGE_LOADING',
    SIGNUP_HIDE_PAGE_LOADING: 'SIGNUP_HIDE_PAGE_LOADING',
    SIGNUP_SHOW_LOADING: 'SIGNUP_SHOW_LOADING',
    SIGNUP_HIDE_LOADING: 'SIGNUP_HIDE_LOADING',
    SIGNUP_SET_CHECKING_STATUS: 'SIGNUP_SET_CHECKING_STATUS',
    SIGNUP_SET_DOB_NEED_OR_NOT: 'SIGNUP_SET_DOB_NEED_OR_NOT',
    SIGNUP_SET_USERNAME_VALID_OR_NOT: 'SIGNUP_SET_USERNAME_VALID_OR_NOT',
    SIGNUP_RESET_TO_INITIAL: 'SIGNUP_RESET_TO_INITIAL',

    //Verify OTP Screen Actions
    OTP_VERIFY_SHOW_LOADING: 'OTP_VERIFY_SHOW_LOADING',
    OTP_VERIFY_HIDE_LOADING: 'OTP_VERIFY_HIDE_LOADING',
    OTP_RESEND_SHOW_LOADING: 'OTP_RESEND_SHOW_LOADING',
    OTP_RESEND_HIDE_LOADING: 'OTP_RESEND_HIDE_LOADING',
  },
  SCREEN_TITLE: {
    SCHEDULE: 'Schedule',
  },
  COLOR: {
    THEME_COLOR: '#000000',
    THEME_COLOR_2: '#000000',
    BUTTON_COLOR: '#000000',
    TAB_BAR_BOTTOM: '#D6D3CC',
    FONT_COLOR: '#000000',
    FONT_WHITE_COLOR: '#FFFFFF',
    FONT_HINT: '#536765',
    PLACE_HOLDER: '#B3B3B3',
    SCREEN_BG: '#F2F2F2',
    HIGHLIGHT_03: '#1B30F9',
    COLOR_GREY: '#1e1f1e',
    COLOR_BACKGROUND: '#515451',
  },
  SETTINGS_PREF: {
    ENGLISH: 'English',
    GERMANY: 'German',
    ALWAYS: 'Always',
    NEVER: 'Never',
    ENABLE: 'Enabled',
    DISABLE: 'Disabled',
  },
  FONT_SIZE: {
    XXXL: normalize(23),
    XXL: normalize(20),
    XL: normalize(17),
    L: normalize(15),
    M: normalize(12),
    SM: normalize(10.5),
    S: normalize(9),
    XS: normalize(8),
  },
  ALERT: {
    TITLE: {
      INFO: 'Info',
      ERROR: 'Error',
      FAILED: 'Failed',
      SUCCESS: 'Success',
      AUTH_FAILED: 'Authentication Failure',
      WENT_WRONG: 'Sorry, something went wrong',
      EXPIRED: 'Logout',
    },
    BTN: {
      OK: 'Ok',
      CANCEL: 'Cancel',
      YES: 'Yes',
      NO: 'No',
    },
  },
  VALIDATION_MSG: {
    NO_INTERNET: 'Please check your internet connectivity.',
    WENT_WRONG: "We're working on it and we'll get it fixed as soon as we can.",
    NO_FIRSTNAME: 'First Name is required.',
    NO_LASTNAME: 'Last Name is required.',
    NO_USERNAME: 'Valid User Name is required.',
    NO_EMP_ID: 'Empolyee ID is required.',
    NO_PASSWORD: 'Need atleast 8 characters in password.',
    VALID_PASSWORD: 'Password did not match.',
    NO_DOB: 'Date of Birth is required.',
    NO_MOBILE_NO: 'Valid Cell Number is required.',
    INVALID_EMAIL: 'Invalid Work Email Address.',
    CHECK_USERNAME_FAILED: 'Unable to check username try again later.',
    SIGNUP_FAILED:
      'Signup failed. Please check the provided inputs and try again.',
    ALREADY_SIGNUP:
      'Already signedup. Please login using your mobile number and password.',
    NOT_FOUND_SIGNUP:
      'Unable to signup. Please check the provided inputs and try again.',
    NEED_DOB_SIGNUP:
      'Found a difficulty on registration. Please enter Date of Birth.',
    DUPLICATE_SIGNUP:
      'Found a difficulty on registration. Please contact the support team.',

    OTP_RESEND_SUCCESS: 'New OTP sent to the registered mobile number.',
    OTP_RESEND_FAILED: 'Unable to send OTP now. Please try after sometime.',
    OTP_VERIFY_FAILED: 'OTP verification failed. Please try again later.',

    AUTH_FAILED: 'The username and password you entered does not match.',
    REQ_FAILED: 'Request failed.',
    NO_DATA_FOUND: 'No data found',
  },
  HTTP_HEADER: {
    BASIC: 2,
    PUBLIC: 3,
    OAUTH: 1,
  },
  HTTP_CODE: {
    SUCCESS: 200,
    INSERT_SUCESS: 201,
    AUTHENTICATION_FAILURE: 401,
    REQUIRED_MISSING: 403,
    REQUEST_TIMED_OUT_FAILURE: 500,
    INPUT_VALIDATION_ERROR: 400,
    NO_DATA_FOUND: 404,
    NO_INTERNET: 503,
    UNPROCESSABLE_ENTITY: 422,
  },
};
