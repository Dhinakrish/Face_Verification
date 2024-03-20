import Constants from './Constants';
import CookieManager from '@react-native-cookies/cookies';
 
export default class HttpBaseClient {
  /**
   * isAccessToken 0 defalut
   * isAccessToken 1 Is Access token Required
   * isAccessToken 2 oathu service
   * @param {*} isAccessToken
   */
  static httpHeader(isAccessToken,isfromtoken=false) {
    console.log('INSIDE HTTP HEADER',isAccessToken,isfromtoken);
    var headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json; charset=utf-8',
      offset: new Date().getTimezoneOffset().toString(),
      language: '1',
    };
    if (isfromtoken == false) {
      if (isAccessToken === Constants.HTTP_HEADER.BASIC) {
        headers = {
          Authorization: 'Basic dGVzdGp3dGNsaWVudGlkOlhZN2ttem9OemwxMDA=',
          offset: new Date().getTimezoneOffset().toString(),
        };
      } else if (isAccessToken === Constants.HTTP_HEADER.PUBLIC) {
        headers = {
          ...headers,
          Authorization: 'Token ',
        };
      } else {
        headers = {
          ...headers,
          Authorization: '',
        };
      }
      return headers;
 
    } else {
 
      headers = {
        Authorization: "Token " + isAccessToken,
      };
      return headers;
    }
 
  }
 
  /**
   * GET method
   * @param {*} url
   * @param {*} params
   * @param {*} isAccessToken
   */
  static get(url, params, isAccessToken = 1, isfromface= false, callback) {
    console.log('HTTP1', params);
 
    return new Promise(function (success, failed) {
       
      const config = {
        method: 'GET',
        params ,
        headers: HttpBaseClient.httpHeader(isAccessToken,isfromface),
      };
       
      console.log('HTTP42', config);
      HttpBaseClient.callApi(url, config, success, failed);
    });
  }
 
  /**
   * POST method
   * @param {*} url
   * @param {*} data
   * @param {*} isAccessToken
   */

  static post(url, data, isAccessToken = 1) {
 
    return new Promise(function (success, failed) {
      let config = {
        method: 'POST',
        headers: HttpBaseClient.httpHeader(isAccessToken),
      };
      if (isAccessToken === 2) {
        config = {
          ...config,
          body: data,
        };
      } else {
        config = {
          ...config,
          body: JSON.stringify(data),
        };
      }
     
      console.log(url,'0000000000000');
      HttpBaseClient.callApi(url, config, success, failed);
    });
  }

  /**
   * POST method
   * @param {*} url
   * @param {*} data
   * @param {*} isAccessToken
   */
  static postImg(url, data, isAccessToken = 1) {
    console.log('qwerty', data);
    // if (!store.getState().deviceState.isNetworkConnectivityAvailable) {
    //   return new Promise((success, failed) => {
    //     failed(CatchErrorHandler({status: Constants.HTTP_CODE.NO_INTERNET}));
    //   });
    // }
    return new Promise(function (success, failed) {
      let config = {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Token d9cc1f8c97285a50c53011b7657c31e94e0dff02',
        },
        body: data,
        // headers: HttpBaseClient.httpHeader(isAccessToken),
      };
      HttpBaseClient.callApi(url, config, success, failed);
    });
  }

 
  static callApi = (url, config, success, failed) => {
    console.log('CALLAPI', config)
    CookieManager.clearAll().then(done => {
      fetch(url, {
        ...config,
        timeoutInterval: 60000,
      })
        .then(response => {
          console.log("Status Code",response);
          if (response.status === Constants.HTTP_CODE.SUCCESS) {
            try {
              return response.json();
            } catch (error) {
              console.log('---- Error in structure ----', error);
              throw {
                status: response.status,
                message: 'Request Failed'
              };
            }
          } else {
            console.log('---- Error S----', response.status);
            throw {
              status: response.status,
              message: 'Request Failed'
            };
          }
        })
        .then(response => {
          success(response);
        })
        .catch(err => {
          console.log('---- Error E----', err);
        });
    });
  };
}
 