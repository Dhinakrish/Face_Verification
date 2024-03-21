/*************************************************
 * Tracker
 * @exports
 * @class SplashAction.js
 * Created by Saravanan.H  on 23/05/2022
 * Copyright © 2021 ProglintCampus. All rights reserved.
 *************************************************/

import Constants from '../../util/Constants';
import StringFile from '../../util/StringFile';
// import {callRefreshTokenApi} from './SignInAction';
// import TouchID from 'react-native-touch-id';
// import PasscodeAuth from 'react-native-passcode-auth';
// import Utility from '../../util/Utility';
// import {Platform} from 'react-native';

export const checkMinimumVersion = () => {
  return (dispatch: any, getState: any) => {
    dispatch(showSpinner());
    if (!getState().deviceState.isNetworkConnectivityAvailable) {
      dispatch(updateErrorMessage(StringFile.MESSAGE.NO_INTERNET));
      dispatch(hideSpinner());
    } else {
      // dispatch(loadRefreshToken());
      // Actions.dashboardScreen();
    }
  };
};

// export const loadRefreshToken = () => {
//   return (dispatch, getState) => {
//     if (getState().loggedInUserDetailsState.loggedInUserRefreshToken) {
//       if (
//         getState().deviceState.isTouchIdAvailable &&
//         getState().deviceState.prefTouchID === Constants.SETTINGS_PREF.ENABLE
//       ) {
//         if (Platform.OS === 'ios') {
//           PasscodeAuth.isSupported()
//             .then(() => {
//               return PasscodeAuth.authenticate(
//                 StringFile.MESSAGE.TOUCHID_MESSAGE,
//               );
//             })
//             .then((success) => {
//               dispatch(callRefreshTokenApi(true));
//             })
//             .catch((error) => {
//               dispatch(updateErrorMessage(StringFile.MESSAGE.USE_TOUCH_ID));
//               dispatch(hideSpinner());
//               Utility.showSnackBar('', StringFile.MESSAGE.USE_TOUCH_ID);
//             });
//         } else {
//           const optionalConfigObject = {
//             title: StringFile.MESSAGE.STRING_LOGIN_TO_APP, // Android
//             imageColor: Constants.COLOR.THEME_COLOR, // Android
//             imageErrorColor: '#ff0000', // Android
//             sensorDescription: 'Touch sensor', // Android
//             sensorErrorDescription: StringFile.MESSAGE.ALERT.TITLE.FAILED, // Android
//             cancelText: StringFile.MESSAGE.ALERT.BTN.CANCEL, // Android
//             unifiedErrors: true, // use unified error messages (default false)
//             passcodeFallback: true, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
//           };
//           TouchID.authenticate(
//             StringFile.MESSAGE.TOUCHID_MESSAGE,
//             optionalConfigObject,
//           )
//             .then((success) => {
//               dispatch(callRefreshTokenApi(true));
//             })
//             .catch((error) => {
//               if (
//                 error.code === 'NOT_PRESENT' ||
//                 error.code === 'NOT_SUPPORTED' ||
//                 error.code === 'NOT_AVAILABLE' ||
//                 error.code === 'NOT_ENROLLED'
//               ) {
//                 dispatch(callRefreshTokenApi(true));
//               } else {
//                 dispatch(updateErrorMessage(StringFile.MESSAGE.USE_TOUCH_ID));
//                 dispatch(hideSpinner());
//                 Utility.showSnackBar('', error.message);
//               }
//             });
//         }
//       } else {
//         dispatch(callRefreshTokenApi(true));
//       }
//     } else {
//       if (getState().deviceState.isFirstOpen) {
//         Actions.welcomeScreen();
//       } else {
//         Actions.signInScreen();
//       }
//     }
//   };
// };

export const showSpinner = () => {
  return (dispatch: any) => {
    dispatch({
      type: Constants.ACTIONS.SPLASH_SHOW_LOADING,
    });
  };
};

export const hideSpinner = () => {
  return (dispatch: any) => {
    dispatch({
      type: Constants.ACTIONS.SPLASH_HIDE_LOADING,
    });
  };
};

export const updateErrorMessage = (errorMessage: string) => {
  return (dispatch: any) => {
    dispatch({
      type: Constants.ACTIONS.SPLASH_ERROR_UPDATE,
      errorMessage,
    });
  };
};
