import Constants from "../../util/Constants";

let initialState = {
    isQRLoading: false,
    qrCode: undefined
}

const {ACTIONS} = Constants;

export const qrstate = (state = initialState, action = {}) => {
    switch (action.type) {
        case ACTIONS.SHOW_QR_LOADING:
            return {...state, isQRLoading: true}
        case ACTIONS.HIDE_QR_LOADING:
            return {...state, isQRLoading: false}
        case ACTIONS.UPDATE_QR_VALUE:
            return {...state, qrCode: action.qrCodeValue}
        default:
            return state
    }
};

export const QRLoading = state => state.qrstate.isQRLoading;
export const qrCode = state => state.qrstate.qrCode;