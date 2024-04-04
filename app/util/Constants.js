import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

module.exports = {
    ACTIONS: {

        // Commom Actions
        NETWORK_STATUS_CHANGED: 'NETWORK_STATUS_CHANGED',

        // Splash screen
        SHOW_LOADING: 'SHOW_LOADING',
        HIDE_LOADING: 'HIDE_LOADING',

        //QR Screen
        SHOW_QR_LOADING: 'SHOW_QR_LOADING',
        HIDE_QR_LOADING: 'HIDE_QR_LOADING',
        UPDATE_QR_VALUE: 'UPDATE_QR_VALUE',
        UPDATE_PERMISSION_STATUS: 'UPDATE_PERMISSION_STATUS',

        //Camera Screen
        SHOW_CAMERA_LOADING: 'SHOW_CAMERA_LOADING',
        HIDE_CAMERA_LOADING: 'HIDE_CAMERA_LOADING',
        UPDATE_IMAGE_PATH: 'UPDATE_IMAGE_PATH', 
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


    COLOR: {
        PRIMARY: '#7770ec',
        SECONDARY: '#708090',
        BLACK: '#000000',
        WHITE: '#ffffff'
    },

    FONT: {
        S: wp('2%'),
        M: wp('4%'),
        L: wp('6%')
    }
    

}