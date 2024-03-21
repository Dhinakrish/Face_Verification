import React from "react";
import { store } from "./app/redux/store";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./app/components/SplashScreen";
import QRScreen from "./app/components/QRScreen";
import NetworkScreen from "./app/components/NetworkActivity";
import CameraScreen from "./app/components/CameraScreen";
import DashboardScreen from "./app/components/Widgets/DashBoardScreen";
import CallJoinScreen from "./app/CallJoinScreen";
import MainScreen from "./app/components/MainScreen";
import LoginScreeen from "./app/components/LoginScreen";
import WebCall from "./app/webrtc";
import CallDetails from './app/components/CallDetailsScreen';
import ClientCall from "./app/Client";
const App = () => {

    const Stack = createNativeStackNavigator();

    return(
        <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator 
            initialRouteName='splashscreen'
            screenOptions={{
                headerShown: false,
            }}
            >
                <Stack.Screen name='splashscreen' component={SplashScreen}/>
                <Stack.Screen name='calldetails'component={CallDetails}/>

                <Stack.Screen name='loginscreen'component={LoginScreeen}/>
                <Stack.Screen name='qrscreen' component={QRScreen}/>
                <Stack.Screen name="networkscreen" component={NetworkScreen}/>
                <Stack.Screen name="camerascreen" component={CameraScreen}/>
                <Stack.Screen name="dashboard" component={DashboardScreen}/>
                <Stack.Screen name="calljoinscreen" component={CallJoinScreen}/>
                <Stack.Screen name="mainscreen" component={MainScreen}/>
                <Stack.Screen name="webcall" component={WebCall}/>
                <Stack.Screen name="clientcall" component={ClientCall}/>

            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    )
};

export default App;