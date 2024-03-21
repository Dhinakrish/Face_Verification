import Constants from "../../util/Constants";
import { useSelector  } from "react-redux";
import { networkStatus } from "../reducers/DeviceReducer";

export const handleNetwork = ({navigation}) => {
    
    return (dispatch, getState) => {
        navigation.navigate('loginscreen');
        if (!getState().deviceState.isNetworkConnectivityAvailable || getState().deviceState.isNetworkConnectivityAvailable == undefined){
            dispatch(hideSpinner());
            navigation.navigate('networkscreen');
        }
        else{
            dispatch(hideSpinner());
            navigation.navigate('qrscreen');
        }
    }
};

export const showSpinner = () => {
    return dispatch => {
        dispatch({
            type: Constants.ACTIONS.SHOW_LOADING,
        })
    }
};

export const hideSpinner = () => {
    return dispatch => {
        dispatch({
            type: Constants.ACTIONS.HIDE_LOADING,
        })
    }
};