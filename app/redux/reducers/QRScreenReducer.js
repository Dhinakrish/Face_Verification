import Constants from "../../util/Constants";

let initialState = {
    isQRLoading: true,
}

const {ACTIONS} = Constants;

export const qrstate = (state = initialState, action) => {
    const {type} = action;

    switch (type) {
        case ACTIONS.SHOW_QR_LOADING:
            return {...state, isQRLoading: true}
        case ACTIONS.HIDE_QR_LOADING:
            return {...state, isQRLoading: false}
        default:
            return state
    }
};

export const QRLoading = state => state.qrstate.isQRLoading;