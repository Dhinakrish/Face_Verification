import NetInfo from '@react-native-community/netinfo';
import Constants from '../../util/Constants';
import { handleNetwork } from './SplashAction';

export const checkNetworkConnection = ({navigation}) => {

    return (dispatch) => {
        NetInfo.addEventListener(state => {
            dispatch(updateNetworkStatus(state.isConnected));
            dispatch(handleNetwork({navigation}));
        });
    }
};

export const updateNetworkStatus = (isNetworkConnectivityAvailable) => ({
    type: Constants.ACTIONS.NETWORK_STATUS_CHANGED,
    isNetworkConnectivityAvailable
});