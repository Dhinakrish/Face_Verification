import { combineReducers } from "redux";
import { splashState } from "./SplashReducer";
import { deviceState } from "./DeviceReducer";
import { qrstate } from "./QRScreenReducer";
import { cameraState } from "./CameraScreenReducer";
import storage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

const devicePersistConfig = {
    key: 'device',
    storage: storage,
    whitelist: ['permissionGranted']
}

const rootReducer = combineReducers({
    splashState,
    deviceState: persistReducer(devicePersistConfig, deviceState),
    qrstate,
    cameraState
})

export default rootReducer;