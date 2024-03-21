/*************************************************
 * Tracker
 * @exports
 * StringFile.js
 * Created by Saravanan.H  on 23/05/2022
 * Copyright © 2021 Proglint. All rights reserved.
 *************************************************/

import {Platform} from 'react-native';

/**
 * Returns all the constants used in the application
 * Separate constants according to the category and usage
 */
module.exports = {
  MESSAGE: {
    ALERT: {
      TITLE: {
        INFO: 'Info' /*'Info'*/,
        ERROR: 'Fehler' /*'Error'*/,
        FAILED: 'Fehlgeschlagen' /*'Failed'*/,
        SUCCESS: 'Erfolgreich' /*'Success'*/,
        WENT_WRONG: 'Unbekannter Fehler' /*'Sorry, something went wrong'*/,
        EXPIRED: 'Ausloggen' /*'Logout'*/,
      },
      BTN: {
        OK: 'OK' /*'Ok'*/,
        CANCEL: 'Abbrechen' /*'Cancel'*/,
        YES: 'Ja' /*'Yes'*/,
        NO: 'Nein' /*'No'*/,
      },
    },
    NO_INTERNET:
      'Bitte überprüfe deine Internetverbindung' /*'Please check your internet connectivity.'*/,
    TOUCHID_MESSAGE:
      'Zum Einloggen mit Touch ID wird eine Authentifizierung benötigt' /*'Authentication is needed to login to the app.'*/,
    USE_TOUCH_ID:
      Platform.OS === 'ios'
        ? 'Bitte Touch ID / Face ID zum Einloggen benutzen' /*'Use TouchID/FaceID to access the application'*/
        : 'Bitte Touch ID zum Einloggen benutzen' /*'Use TouchID to access the application'*/,
    NO_DATA_FOUND: 'Keine Daten gefunden' /*'No data found'*/,

    AUTH_FAILED:
      'Die E-Mail und das Passwort stimmen nicht überein' /*'Campus id and password you entered does not match.'*/,
    EXPIRED: 'Session abgelaufen' /*'Session Expired.'*/,
    REQ_FAILED: 'Anfrage fehlgeschlagen' /*'Request failed.'*/,
    WENT_WRONG:
      'Wir arbeiten daran und werden den Fehler so schnell wie möglich beheben' /*'We\'re working on it and we'll get it fixed as soon as we can.'*/,
    SETTINGS_RELOAD_TXT: 'Zum erneuten Laden tippen',
    SETTINGS_LOADING_TXT: 'Lädt...',
    STRING_LOGIN_TO_APP: 'Einloggen',
    STRING_TOUCH_SENSOR: 'Touch ID',
    STRING_NO_INTERNET: 'Keine Internetverbindung',
    STRING_ROOT_ACCESS_WARNING:
      Platform.OS === 'ios'
        ? 'Jail-brake auf dem Smartphone erkannt. Sicherheitslücke gefunden.'
        : 'Root Zugriff aktiviert. Sicherheitslücke gefunden.' /*'Root access enable. We found security vulnerability.'*/,

    STRING_PASSWORD_HINT:
      '8 bis 15 Zeichen, mindestens ein Klein- und Großbuchstabe, eine Ziffer und ein Sonderzeichen',
    /*'8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'*/
    STRING_PASSWORD_HINT_MIN_CHAR: '8 bis 15 Zeichen',
    STRING_PASSWORD_HINT_2: ', mindestens ',
    STRING_PASSWORD_HINT_LOW: 'ein Klein-',
    STRING_PASSWORD_HINT_4: ' und ',
    STRING_PASSWORD_HINT_UP: 'Großbuchstabe',
    STRING_PASSWORD_HINT_6: ', ',
    STRING_PASSWORD_HINT_NUMERIC: 'eine Ziffer',
    STRING_PASSWORD_HINT_8: ' und ',
    STRING_PASSWORD_HINT_SPECIAL: 'ein Sonderzeichen',
    STRING_SIGNUP_OTP_HINT:
      'Wir werden ein OTP an diese E-Mail-Adresse versenden' /*'We will send an OTP to this email id'*/,
  },
};
