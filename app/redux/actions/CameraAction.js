import Constants from "../../util/Constants";
import HttpBaseClient from "../../util/HttpBaseClient";

export const showCameraLoading = () => {
    return dispatch => {
        dispatch({
            type: Constants.ACTIONS.SHOW_CAMERA_LOADING
        })
    }
};

export const hideCameraLoading = () => {
    return dispatch => {
        dispatch({
            type: Constants.ACTIONS.HIDE_CAMERA_LOADING
        })
    }
};

export const updateImagePath = (imagePath) => ({
    type: Constants.ACTIONS.UPDATE_IMAGE_PATH,
    imagePath
});

export const verifyFace = (params, callback) => {
    console.log('qrValue', params.qrValue);
    console.log('imageValue', params.imageValue);    

    return (dispatch) => {
        let formData = new FormData();
        formData.append('qr_code', params.qrValue);
        formData.append('file', {
          name: 'image.jpg',
          uri : params.imageValue, 
          type: 'image/png' || 'image/jpg' });

        HttpBaseClient.postImg('http://192.168.1.75:9500/validate/qr/face', formData).then(
            response => {
                console.log('Verify_API_response', response);
                console.log('Verify_Face_API_message', response.message);
                callback(response);
            }
        ).catch(err => {
            console.error(err);
            callback('');
        })
    }
    
}


export const loginButtonSubmit = (params, callBack) => {
    return (dispatch, getState) => {
      HttpBaseClient.post('http://192.168.1.75:9500/login', params)
        .then(response => {
          console.log('RESSS', response);
          if (response.status_code === 1) {
            console.log('hajjaa', response);
          } else {
            console.log('hajjaa', response);
          }
        })
        .catch(e => {
          console.log('Errors!', e);
        });
    };
  };