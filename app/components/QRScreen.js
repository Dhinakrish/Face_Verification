import React, { useEffect, useState } from "react";
import {View, Text, PermissionsAndroid, StyleSheet, Image, BackHandler, Alert, Platform, Linking, TouchableOpacity, ImageBackgroundBase, ImageBackground} from 'react-native';
import { Appbar, Modal, Button, ActivityIndicator, Icon } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import DeviceInfo from "react-native-device-info";
import IntentLauncher from '@suxueweibo/react-native-intent-launcher';
import BarcodeMask from "react-native-barcode-mask";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { hideQRLoading, showQRLoading, updatePermissionStatus, updateQRValue } from "../redux/actions/QRScreenAction";
import { QRLoading } from "../redux/reducers/QRScreenReducer";
import Constants from '../util/Constants';
import { permissionGranted } from "../redux/reducers/DeviceReducer";
import { RNCamera } from "react-native-camera";
import { SliderBox } from 'react-native-image-slider-box';

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
        checkCameraPermission();
    }, []);

    const checkCameraPermission = async () => {
        const result = await PermissionsAndroid.requestMultiple(
            [PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO]
        );

        if (result["android.permission.CAMERA"] === PermissionsAndroid.RESULTS.GRANTED && result["android.permission.RECORD_AUDIO"] === PermissionsAndroid.RESULTS.GRANTED){
            setGotCameraPermission(true);
            dispatch(updatePermissionStatus(true));
        }
        else{
            dispatch(updatePermissionStatus(false));
            setGotCameraPermission(false);
            checkCameraPermission();
        }
    };

    const handleBackHandler = () => {
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
    }

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
            handleBackHandler()
            return true
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            }
        }, []),
    );

    const sliderImages = [
        require('../assets/qr-code-icon-with-phone-vector.jpg'),
        require('../assets/facial-recognition-system-3985539-3356791.png'),
        require('../assets/1646290228947.png')
    ]

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
                    <Text style= {{fontSize: FONT.M, color: COLOR.BLACK, marginTop: wp('3%')}}>QR Code verified</Text>
                    <Text style= {{fontSize: FONT.M, color: COLOR.BLACK, marginTop: wp('1%')}}>Successfully</Text>
                    <Button
                    mode="contained-tonal"
                    textColor={COLOR.WHITE}
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
                    <Text style= {{fontSize: FONT.M, color: COLOR.BLACK, marginTop: wp('3%')}}>Need Camera Permission</Text>
                    <Text style= {{fontSize: FONT.M, color: COLOR.BLACK, marginTop: wp('1%')}}>to access the camera</Text>
                    <Button
                    mode="contained-tonal"
                    style = {{marginTop: hp('3%'), backgroundColor: COLOR.PRIMARY}}
                    textColor={COLOR.WHITE}
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
                <RNCamera
                style = {{flex: 1, width: wp('100%'), height: hp('97%')}}
                type="back"
                focusable={true}
                onBarCodeRead={(data) => {
                    console.log('QR_Code', data.data);
                    dispatch(updateQRValue(data.data));
                    setIsCameraActivate(false);
                    setShowModel(true);
                }}
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
        <View style = {{width: wp('100%'), height: hp('100%'), alignItems: 'center', backgroundColor: 'white'}}>
            <Appbar.Header style = {{width: wp('100%'), height: hp('7%'), backgroundColor: COLOR.PRIMARY}}>
            <Appbar.Content  titleStyle= {{fontWeight: '700', fontSize: FONT.L, color: COLOR.WHITE}} title = 'QR Screen'/>
            <Appbar.Action icon={require('../assets/logout.png')} iconColor={COLOR.WHITE} onPress={() => handleBackHandler()}/>
            </Appbar.Header>
            <View style = {{width: wp('100%'), height: hp ('93%'), position: "relative", justifyContent: 'center', alignItems: 'center', alignSelf: 'center',}}>
                {QrLoading && <ActivityIndicator
                animating={QrLoading}
                color="lightgrey"
                size={wp('10%')}
                />}
                {!isCameraActivate && 
                <View style = {styleProps.qrContainer}>
                <View style = {{width: wp('80%'), height: hp('30%'), marginTop: hp('15%'), alignItems: 'center', justifyContent: 'center'}}>
                    <SliderBox
                    images = {sliderImages}
                    disableOnPress={false}
                    sliderBoxHeight={hp('30%')}
                    parentWidth={wp('85%')}
                    dotColor={COLOR.PRIMARY}
                    inactiveDotColor={COLOR.WHITE}
                    autoplay={true}
                    autoplayInterval={2000}
                    circleLoop
                    imageLoadingColor={COLOR.WHITE}
                    />
                </View>
                <TouchableOpacity style = {{width: wp ('40%'), height: hp('6%'), backgroundColor: COLOR.PRIMARY, borderRadius: 10, justifyContent: 'space-between', alignItems: 'center', marginTop: hp('15%'), flexDirection: 'row', paddingHorizontal: wp('5%')}}
                onPress={() => {
                    dispatch(showQRLoading());
                    if (PermissionGranted === false){
                        renderPermissionModel();
                    }else{
                        setIsCameraActivate(true);
                    }
                }}
                >
                    <Text style = {{fontSize: FONT.M, fontWeight: '500', color: COLOR.WHITE, marginRight: hp('2%')}}>Tap to scan</Text>
                    <Icon 
                    source={require('../assets/qr-code.png')}
                    size={wp('5%')}
                    />
                </TouchableOpacity>
                </View>}
                {isCameraActivate && renderQRView()}
                {!PermissionGranted && renderPermissionModel()}
                {showModel && renderModal()}
            </View>
        </View>
    )
}

const styleProps = StyleSheet.create({
    
    qrContainer: {
        width: wp('100%'), height: hp ('93%'),
        position: "relative",
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'center',
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
        marginLeft: wp('20%'),
        marginBottom: hp('20%')
    },
})

export default QRScreen;