import Constants from "../../util/Constants";

let initialState = {
    isNetworkConnectivityAvailable: undefined
}

const {ACTIONS} = Constants;

export const deviceState = (state = initialState, action) => {
    const {type, isNetworkConnectivityAvailable} = action;

    switch (type) {
        case ACTIONS.NETWORK_STATUS_CHANGED:
            return {...state, isNetworkConnectivityAvailable};
        default:
            return state
    }
}

export const networkStatus = state => state.deviceState.isNetworkConnectivityAvailable