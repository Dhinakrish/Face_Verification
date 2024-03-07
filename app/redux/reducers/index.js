import { combineReducers } from "redux";
import { splashState } from "./SplashReducer";
import { deviceState } from "./DeviceReducer";
import { qrstate } from "./QRScreenReducer";

const rootReducer = combineReducers({
    splashState,
    deviceState,
    qrstate
})

export default rootReducer;