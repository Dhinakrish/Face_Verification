/*************************************************
 * Tracker
 * @exports
 * StringFile.js
 * Created by Saravanan.H  on 23/05/2022
 * Copyright © 2021 Proglint. All rights reserved.
 *************************************************/

import {store} from '../redux/store';
import Constants from './Constants';
import StringGerman from './StringGerman';
import StringEnglish from './StringEnglish';
/**
 * Returns all the meesages to the screans
 */
module.exports = {
  MESSAGE:
    store.getState().deviceState.prefLanguage ===
    "Germany"
      ? StringGerman.MESSAGE
      : StringEnglish.MESSAGE,
};
