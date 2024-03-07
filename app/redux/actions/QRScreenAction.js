import Constants from "../../util/Constants";

export const showQRLoading = () => {
    return dispatch => {
        dispatch({
            type: Constants.ACTIONS.SHOW_QR_LOADING
        })
    }
};

export const hideQRLoading = () => {
    return dispatch => {
        dispatch({
            type: Constants.ACTIONS.HIDE_QR_LOADING
        })
    }
};