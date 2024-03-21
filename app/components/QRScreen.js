import React, { useEffect, useState } from "react";
import {View, Text, PermissionsAndroid, StyleSheet, Image, BackHandler, Alert, Platform, Linking, TouchableOpacity, ImageBackgroundBase, ImageBackground} from 'react-native';
import { Appbar, Modal, Button, ActivityIndicator } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Camera, useCameraDevice, useCodeScanner } from "react-native-vision-camera";
import DeviceInfo from "react-native-device-info";
import IntentLauncher from '@suxueweibo/react-native-intent-launcher';
import BarcodeMask from "react-native-barcode-mask";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { hideQRLoading, showQRLoading, updatePermissionStatus, updateQRValue } from "../redux/actions/QRScreenAction";
import { QRLoading } from "../redux/reducers/QRScreenReducer";
import Constants from '../util/Constants';
import { permissionGranted } from "../redux/reducers/DeviceReducer";

const QRScreen = ({navigation}) => {

    const packageName = DeviceInfo.getBundleId();

    const [isCameraActivate, setIsCameraActivate] = useState(false);
    const [showModel, setShowModel] = useState(false);
    const [gotCameraPermission, setGotCameraPermission] = useState(false);
    const dispatch = useDispatch();
    const QrLoading = useSelector(QRLoading);
    const PermissionGranted = useSelector(permissionGranted);

    const {COLOR, FONT} = Constants;

    useEffect(() => {
        // checkCameraPermission();
    }, []);

    const checkCameraPermission = async () => {
        const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA
        );

        if (result === PermissionsAndroid.RESULTS.GRANTED){
            setGotCameraPermission(true);
            dispatch(updatePermissionStatus(true));
        }
        else{
            dispatch(updatePermissionStatus(false));
            setGotCameraPermission(false);
            checkCameraPermission();
        }
    };

    const device = useCameraDevice('back', {
        physicalDevices: [
            'wide-angle-camera',
        ],
    });

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (code) => {
            console.log('QR_Code', code);
            code.map(item => {
                dispatch(updateQRValue(item.value));
            })
            setIsCameraActivate(false);
            setShowModel(true);
        }
    });

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                Alert.alert('Warning', 'Are you sure you want to exit the app.', [{
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {}
                },
                {
                    text: 'Ok',
                    style: 'default',
                    onPress: () => {
                        BackHandler.exitApp();
                    }
                }
            ])
            return true
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            }
        }, []),
    );

    const renderModal = () => {
        dispatch(hideQRLoading());
        return (
                <Modal
                contentContainerStyle={styleProps.modalContainer}
                visible={true}
                dismissableBackButton = {true}
                dismissable = {true}
                >  
                    <Image source={require('../assets/checked.png')} style = {{width: wp('15%'), height: wp('15%'), marginTop: hp('2%')}}/>
                    <Text style= {{fontSize: '10', color: COLOR.BLACK, marginTop: wp('3%')}}>QR Code verified</Text>
                    <Text style= {{fontSize: '10', color: COLOR.BLACK, marginTop: wp('1%')}}>Successfully</Text>
                    <Button
                    mode="contained-tonal"
                    style = {{marginTop: hp('3%'), backgroundColor: COLOR.PRIMARY}}
                    onPress={() => {
                        setShowModel(false);
                        setIsCameraActivate(false);
                        navigation.navigate('camerascreen');
                    }}
                    >
                        Take Picture
                    </Button>
                </Modal>
        )
    };

    const renderPermissionModel = () => {
        dispatch(hideQRLoading());
        return (
                <Modal
                contentContainerStyle={styleProps.modalContainer}
                visible={true}
                dismissableBackButton = {true}
                dismissable = {true}
                >  
                    <Image source={require('../assets/inventory.png')} style = {{width: wp('15%'), height: wp('15%'), marginTop: hp('2%')}}/>
                    <Text style= {{fontSize:' 10', color: COLOR.BLACK, marginTop: wp('3%')}}>Need Camera Permission</Text>
                    <Text style= {{fontSize: '10', color: COLOR.BLACK, marginTop: wp('1%')}}>to access the camera</Text>
                    <Button
                    mode="contained-tonal"
                    style = {{marginTop: hp('3%'), backgroundColor: COLOR.PRIMARY}}
                    onPress={() => {
                        if (Platform.OS === 'ios'){
                            Linking.openURL('app-settings:');
                        }else{
                            IntentLauncher.startActivity({
                                action: 'android.settings.APPLICATION_DETAILS_SETTINGS',
                                data: 'package:' + packageName
                            })
                        }
                    }}
                    >
                        Settings
                    </Button>
                </Modal>
        )
    };

    const renderQRView = () => {
        dispatch(hideQRLoading());
        return (
            <View>
                <Camera
                device={device}
                style = {{width: wp ('70%'), height: wp ('70%')}}
                codeScanner={codeScanner}
                isActive={isCameraActivate ? true : false}
                focusable = {true}
                resizeMode="cover"
                zoom={device.neutralZoom}
                />
                <BarcodeMask
                width={wp('70%')}
                height={wp('70%')}
                lineAnimationDuration={1000}
                edgeColor="black"
                animatedLineColor="black"
                showAnimatedLine= {isCameraActivate ? true : false }
            >
            </BarcodeMask>
            </View>
        )
    }

    return(
        <View style = {{width: wp('100%'), height: hp('100%'), alignItems: 'center', backgroundColor: 'lightgrey'}}>
            <ImageBackground
            source={require('../assets/login-bg.png')}
            style={{width: wp('100%'), height: hp('100%'), alignItems: 'center'}}
            >
                <Appbar.Header style  = {{width: wp('100%'), height: hp('7%'), backgroundColor: COLOR.PRIMARY}}>
                <Appbar.Content  titleStyle= {{fontWeight: '700', fontSize: '12'}} title = 'QR Screen'/>
            </Appbar.Header>
            <View style = {{width: wp ('100%'), height: hp('5%'), marginTop: hp ('10%'), justifyContent: 'center', alignItems: 'center'}} onPress={() => {
                    // dispatch(showQRLoading());
                    // if (PermissionGranted === false){
                    //     renderPermissionModel();
                    // }else{
                    //     setIsCameraActivate(true);
                    // }
                    navigation.navigate('calljoinscreen');
                }}>
                <Text style = {{fontSize: '12', fontWeight: '400', color: COLOR.BLACK}}>
                    Scan QR Code
                </Text>
            </View>
        
            </ImageBackground>
        </View>
    )
}

const styleProps = StyleSheet.create({
    
    qrContainer: {
        width: wp('70%'), height: wp ('70%'),
        marginTop: hp('5%'), 
        position: "relative",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderColor: 'grey',
        borderWidth: 0.5,
        shadowColor: '#DDD',
        shadowOpacity: 10,
        shadowRadius: 3,
        alignSelf: 'center'
    },


    modalContainer: {
        width: wp('60%'), 
        height: wp('60%'), 
        backgroundColor: 'white', 
        alignItems: 'center',  
        shadowRadius: 10,
        borderRadius: 20,
        marginLeft: wp('5%'),
        borderColor: 'black',
        borderWidth: 0.5,
        shadowColor: 'grey',
        shadowOpacity: 10,
        justifyContent: 'flex-start',
    },
})

export default QRScreen;