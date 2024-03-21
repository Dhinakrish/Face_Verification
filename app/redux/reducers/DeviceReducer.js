import Constants from "../../util/Constants";

let initialState = {
    isNetworkConnectivityAvailable: undefined,
    permissionGranted: false
}

const {ACTIONS} = Constants;

export const deviceState = (state = initialState, action) => {
    const {type, isNetworkConnectivityAvailable} = action;

    switch (type) {
        case ACTIONS.NETWORK_STATUS_CHANGED:
            return {...state, isNetworkConnectivityAvailable};
        case ACTIONS.UPDATE_PERMISSION_STATUS:
            return {...state, permissionGranted: action.permissionGranted}
        default:
            return state
    }
}

export const networkStatus = state => state.deviceState.isNetworkConnectivityAvailable;
export const permissionGranted = state => state.deviceState.permissionGranted;