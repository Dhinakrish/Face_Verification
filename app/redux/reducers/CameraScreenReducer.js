import Constants from "../../util/Constants";

let initialState = {
    isCameraLoading: false,
    imagePath: undefined
}

const {ACTIONS} = Constants;

export const cameraState = (state = initialState, action = {}) => {

    switch (action.type) {
        case ACTIONS.SHOW_CAMERA_LOADING:
            return {...state, isCameraLoading: true}
        case ACTIONS.HIDE_CAMERA_LOADING:
            return {...state, isCameraLoading: false}
        case ACTIONS.UPDATE_IMAGE_PATH:
            return {...state, imagePath: action.imagePath}
        default:
            return state
    }
};

export const CameraLoading = state => state.cameraState.isCameraLoading;
export const imagePathValue = state => state.cameraState.imagePath;