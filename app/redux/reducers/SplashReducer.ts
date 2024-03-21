/*************************************************
 * Tracker
 * @exports
 * @class SplashReducer.js
 * Created by Saravanan.H  on 23/05/2022
 * Copyright © 2021 Proglint. All rights reserved.
 *************************************************/

'use strict';

import Constants from '../../util/Constants';

let initialState = {
  isLoading: true, //Shows spinner when the version api is being called.
  errorMessage: '', //Error message of the intenret check and version api failure error
};
const {ACTIONS} = Constants;

export const splashState = (state = initialState, action: any) => {
  const {type, errorMessage} = action;
  switch (type) {
    case ACTIONS.SPLASH_SHOW_LOADING:
      return {...state, isLoading: true};
    case ACTIONS.SPLASH_HIDE_LOADING:
      return {...state, isLoading: false};
    case ACTIONS.SPLASH_ERROR_UPDATE:
      return {...state, isLoading: false, errorMessage};
    default:
      return state;
  }
};

export const splashisloading = (state: any) => state.splashState.isLoading;
export const splasherrorMessage = (state: any) =>
  state.splashState.errorMessage;
