/*************************************************
 * Tracker
 * @exports
 * @class SignInAction.js
 * Created by Saravanan.H  on 23/05/2022
 * Copyright © 2021 Proglint. All rights reserved.
 *************************************************/
'use strict';

import Constants from '../../util/Constants';
import Utility from '../../util/Utility';
import HttpBaseClient from '../../util/HttpBaseClient';
import {OAUTH} from '../../util/URL';
import {useCallback} from 'react';

export const loginButtonSubmit = ({navigation}) => {
  return (dispatch) => {
    navigation.navigate('qrscreen');
    // Actions.homeScreenTab();

    //dispatch(showLoginLoading());

    // HttpBaseClient.post(OAUTH, {grant_type: 'password', username, password}, Constants.HTTP_HEADER.BASIC)
    //   .then(response => {
    //     dispatch(hideLoginLoading());
    //     if (
    //       _.has(response, 'access_token') &&
    //       _.has(response, 'token_type') &&
    //       _.has(response, 'refresh_token') &&
    //       _.has(response, 'expires_in') &&
    //       _.has(response, 'userInfo')
    //     ) {
    //       Actions.homeScreenTab();
    //     } else {
    //       Utility.showSnackBar(
    //         Constants.VALIDATION_MSG.AUTH_FAILED,
    //       );
    //     }
    //   })
    //   .catch(error => {
    //     dispatch(hideLoginLoading());
    //     Utility.showSnackBar(
    //       Constants.VALIDATION_MSG.AUTH_FAILED,
    //     );
    //   });
  };
};

export const callButton = (name, callBack) => {
  return (dispatch) => {
    dispatch(showLoginLoading());
    console.log('ENTERED');
    HttpBaseClient.post(
      'https://dev-webrtcapi.proglint.com/api/customer',
      {
        fullName: "saravanna",
        phone: '000000',
        vendorId: '066d7b86e9473316c3e24c933ed0c8f8',
        callPriority : 1,
        roleId: 4 

      },
      1,
    )
      .then((response) => {
        console.log('zxcvb', response);
        callBack(response);
      })
      .catch((error) => {
        dispatch(hideLoginLoading());
        Utility.showSnackBar('Error');
      });
  };
};

export const getChatList = (roomId, callBack) => {
  return (dispatch) => {
    dispatch(showLoginLoading());
    console.log('ENTERED');
    HttpBaseClient.get(
      'http://localhost:8082/api/chat/list',
      {
        roomId: roomId,
        message: 'hi',
        roleId: 4,
        userId: 45,
      },
      1,
    )
      .then((response) => {
        callBack(response);
      })
      .catch((error) => {
        dispatch(hideLoginLoading());
        Utility.showSnackBar('Constants.VALIDATION_MSG.AUTH_FAILED');
      });
  };
};

export const addChat = (roomId, callBack) => {
  return (dispatch) => {
    dispatch(showLoginLoading());
    console.log('ENTERED');
    HttpBaseClient.post(
      'https://dev-webrtcapi.proglint.com/api/customer/appointment/update',
      {
        roomId: roomId,
      },
      1,
    )
      .then((response) => {
        callBack(response);
      })
      .catch((error) => {
        dispatch(hideLoginLoading());
        Utility.showSnackBar('Error');
      });
  };
};


export const callEnd = (roomId, callBack) => {
  return (dispatch) => {
    dispatch(showLoginLoading());
    console.log('ENTERED');
    HttpBaseClient.post(
      'https://dev-webrtcapi.proglint.com/api/customer/appointment/update',
      {
        roomId: roomId,
        callEndTime: new Date().getTime(),
      },
      1,
    )
      .then((response) => {
        callBack(response);
      })
      .catch((error) => {
        dispatch(hideLoginLoading());
        Utility.showSnackBar('Error');
      });
  };
};
export const showLoginLoading = () => {
  return (dispatch) => {
    dispatch({
      type: Constants.ACTIONS.LOGIN_SHOW_LOADING,
    });
  };
};

export const hideLoginLoading = () => {
  return (dispatch) => {
    dispatch({
      type: Constants.ACTIONS.LOGIN_HIDE_LOADING,
    });
  };
};

export const showPageLoading = () => {
  return (dispatch) => {
    dispatch({
      type: Constants.ACTIONS.LOGIN_SHOW_PAGE_LOADING,
    });
  };
};

export const hidePageLoading = () => {
  return (dispatch) => {
    dispatch({
      type: Constants.ACTIONS.LOGIN_HIDE_PAGE_LOADING,
    });
  };
};
