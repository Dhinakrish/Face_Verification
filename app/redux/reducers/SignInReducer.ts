/*************************************************
 * Tracker
 * SignInReducer.js
 * Created by Saravanan.H  on 23/05/2022
 * Copyright © 2021 Proglint. All rights reserved.
 *************************************************/

import Constants from '../../util/Constants';

const {ACTIONS} = Constants;

let loggedInUserInitialState = {
  isLoginLoading: false,
  loggedInUserDetails: undefined,
  loggedInUserToken: undefined,
  loggedInUserRefreshToken: undefined,
  publicUserToken: undefined,
};

export const loggedInUserDetailsState = (
  state = loggedInUserInitialState,
  action: any,
) => {
  switch (action.type) {
    case ACTIONS.LOGIN_SHOW_LOADING:
      return {...state, isLoginLoading: true};
    case ACTIONS.LOGIN_HIDE_LOADING:
      return {...state, isLoginLoading: false};
    case ACTIONS.LOGIN_USER_TOKEN_UPDATE:
      // set user tokens from api
      return {
        ...state,
        loggedInUserDetails: action.loggedInUserDetails,
        loggedInUserToken: action.loggedInUserToken,
        loggedInUserRefreshToken: action.loggedInUserRefreshToken,
        publicUserToken: undefined,
      };
    case ACTIONS.LOGIN_USER_INFO_UPDATE:
      // set user tokens from api
      return {
        ...state,
        loggedInUserDetails: action.loggedInUserDetails,
      };
    case ACTIONS.LOGIN_UPDATE_PUBLIC_TOKEN:
      // set user tokens from api
      return {
        ...state,
        publicUserToken: action.publicUserToken,
      };

    case ACTIONS.LOGGEDIN_USER_DETAILS_RESET:
      return {...loggedInUserInitialState};

    default:
      return state;
  }
};
export const loginState = (state: any) => state.loggedInUserDetailsState;
