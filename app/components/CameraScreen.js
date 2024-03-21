import React, {useEffect, useRef, useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, BackHandler } from "react-native";
import { ActivityIndicator, Button, IconButton, Modal } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { useBackHandler } from "@react-native-community/hooks";
import { useDispatch, useSelector } from "react-redux";
import { hideCameraLoading, showCameraLoading, verifyFace } from "../redux/actions/CameraAction";
import { qrCode } from "../redux/reducers/QRScreenReducer";
import { CameraLoading, imagePathValue } from "../redux/reducers/CameraScreenReducer";
import { store } from "../redux/store";
import { updateQRValue } from "../redux/actions/QRScreenAction";
import Constants from '../util/Constants'
import RNFS, { moveFile } from 'react-native-fs';
import RotatePhoto from "react-native-rotate-photo";


const CameraScreen = ({navigation}) => {

    const [cameraDevices, setCameraDevices] = useState('front');
    const [rotateCamera, setRotateCamera] = useState(false);
    const [isImageCaptured, setIsImageCaptured] = useState(false);
    const [imagePath, setImagePath] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setSuccessModal] = useState(false);
    const [success, setSuccess] = useState(false);

    const dispatch = useDispatch();

    const QRCode = useSelector(qrCode);
    const ImagePath = useSelector(imagePathValue)
    const cameraLoading = useSelector(CameraLoading);

    const {COLOR, FONT} = Constants;

    const cameraDevice = useCameraDevice(cameraDevices, {
        physicalDevices: [
            'wide-angle-camera'
        ]
    });
    const camera = useRef();

    useBackHandler(() => {
        dispatch(updateQRValue(''));
        navigation.navigate('qrscreen');
        return true;
    });


    const captureImage = async () => {
        // dispatch(showCameraLoading());
        const photo = await camera.current?.takePhoto({
            flash:'off',
            qualityPrioritization: 'speed',
            enableShutterSound: false,
        });
        console.log('Initial_Photo', photo);
        if (photo != null){
            if (photo.orientation == 'landscape-right'){
                RotatePhoto.createRotatedPhoto(photo.path, wp('100%'), hp('100%'), 'PNG', 100, 90, RNFS.TemporaryDirectoryPath, false)
            .then(response => {
                dispatch(hideCameraLoading());
                console.log('rotatedPhoto', response);
                setImagePath(response.uri);
                setIsImageCaptured(true);
            })
            .catch(err => {
                dispatch(hideCameraLoading());
                console.log('err', err)
            })
            }
            else{
                const photoPath = photo.path.split('/');
                const filename = photoPath[photoPath.length - 1]
                console.log('filename',filename)
    
                const destinationPath = RNFS.TemporaryDirectoryPath + filename;
    
                if (await RNFS.exists(destinationPath)){
                    await RNFS.unlink(destinationPath);
                }
            
                await moveFile(photo?.path ?? '', destinationPath);
    
                const newPhotoUri = 'file://' + destinationPath;
    
                console.log('cachefilename', newPhotoUri);
 
            if (newPhotoUri !== null){
                dispatch(hideCameraLoading());
                console.log('rotatedPhoto', newPhotoUri);
                setImagePath(newPhotoUri);
                setIsImageCaptured(true);
            }else {
                dispatch(hideCameraLoading());
                console.log('Camera picture not taking')
            }
            }
        }
        else{
            dispatch(hideCameraLoading());   
        }
    };

    const callApi = () => {
        setShowModal(true);
        let data = {qrValue: store.getState().qrstate.qrCode, imageValue: imagePath }
        dispatch(verifyFace(data, (res) => {
            console.log('Face_Verify_CallBack_res', res);
            if (res != ''){
                if (res.message != ''){
                    if (res.message == 'Authentication Failure'){
                        console.log('dhiaaa');
                        setResponseMessage('Authentication Failed');
                        setSuccessModal(true);
                    }
                    else if (res.message == 'success'){
                        setResponseMessage('Verified successfully');
                        setSuccessModal(true);
                        setSuccess(true)
                    }
                    else if (res.message == 'invalid qr code'){
                        setResponseMessage('Scan valid QR again')
                        setSuccessModal(true);
                    }
                    else {
                        setResponseMessage('Invalid face, scan again');
                        setSuccessModal(true);
                    }
                }else{
                    setResponseMessage('Try after the time')
                    setSuccessModal(true);
                }
            }
            else{
                setResponseMessage('Try after the time');
                setSuccessModal(true);
            }
        }));
        
    }

    const renderModal = () => {
        return(
            <Modal
            contentContainerStyle={styleProps.modalContainer}
            visible={true}
            dismissableBackButton={false}
            dismissable={false}
            >
                {!showSuccessModal && <View style = {{alignItems: 'center'}}>
                    <Text style = {{fontSize: FONT.M, color: COLOR.BLACK, marginTop: hp('5%')}}>
                        Just a moment
                    </Text>
                    <ActivityIndicator
                    animating={true}
                    size={wp('12%')}
                    color="black"
                    style = {{marginTop: hp('3%')}}
                    />
                    <Text style = {{fontSize: FONT.M, color: COLOR.BLACK, marginTop: hp('3%')}}>
                        verifing..
                    </Text>
                    </View>}
                {showSuccessModal && <View style = {{alignItems: 'center'}}>
                    <Image source={success ? require('../assets/checked.png') : require('../assets/no.png')} style = {{width: wp('12%'), height: wp('12%'), marginTop: hp('3%')}}/>
                        <Text style= {{fontSize: FONT.M, color: COLOR.BLACK, marginTop: hp('4%')}}>{responseMessage}</Text>
                        <Button
                        mode="elevated"
                        style = {{marginTop: hp('4%'), backgroundColor: COLOR.PRIMARY}}
                        textColor="black"
                        labelStyle={{width: wp('20%'), borderColor: 'black'}}
                        onPress={() => {
                            setImagePath('');
                            setIsImageCaptured(false);
                            setCameraDevices('front');
                            setSuccessModal(false);
                            setResponseMessage('');
                            setShowModal(false);
                            setSuccess(false);
                            navigation.navigate('qrscreen');
                        }}
                        >
                            {success ? 'Okay' : 'Okay'}
                        </Button>
                </View>}
            </Modal>
        )
    }

    return (
        <View style = {{width: wp('100%'), height: hp('100%')}}>
        {cameraLoading ? (<View style = {{justifyContent: 'center', backgroundColor: 'black', alignItems: 'center', width: wp('100%'), height: '100%'}}>
            <ActivityIndicator
            animating={true}
            size={wp('10%')}
            color="white"
            />
        </View>) : (<View style = {{width: wp('100%'), height: hp('100%'), flex: 1}}>
            {!isImageCaptured && <View style = {{flex: 1}}>
                <Camera
                ref={camera}
                device={cameraDevice}
                photo={true}
                style = {StyleSheet.absoluteFill}
                isActive={true}
                resizeMode="cover"
                focusable = {true}
                orientation={'portrait'}
                zoom={cameraDevice.neutralZoom}
                />
                <View style = {{flexDirection: 'row'}}>
                    <View style = {{width: wp ('10%'), height: wp ('10%'), marginTop: wp('2%'), marginLeft: wp('85%'), marginRight: wp ('2%'), justifyContent: 'center', alignItems: 'center',}}>
                        <IconButton
                        icon={require('../assets/rotation.png')}
                        size={30}
                        iconColor='white'
                        onPress={() => {
                            if (rotateCamera == false){
                                setCameraDevices('front')
                                setRotateCamera(true);
                            }
                            else{
                                setCameraDevices('back')
                                setRotateCamera(false);
                            }
                        }}
                        />
                    </View>
                </View>
                <View style = {{width: wp('100%'), height: hp('12%'), marginTop: hp ('75%'), flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <View style = {{width: wp('33.3%'), height: wp ('23%'), justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity style = {{
                                width: wp ('18%'),
                                height: wp ('18%'),
                                backgroundColor: COLOR.WHITE,
                                borderRadius: wp ('18%'),
                                borderWidth: 3,
                                borderColor: COLOR.BLACK
                            }}
                            onPress={() => {
                                captureImage()
                            }}
                            >
                        </TouchableOpacity>
                    </View>
                </View>
            </View>}
            {isImageCaptured && <View style = {{flex: 1}}>
                <ImageBackground
                source={{uri: 'file://' + imagePath}}
                style = {{width: wp('100%'), height: hp('100%')}}
                >
                    <TouchableOpacity 
                    onPress={() => {
                        setIsImageCaptured(false);
                        setImagePath('');
                        navigation.navigate('camerascreen')
                    }}
                    >
                        <Image
                        source={require('../assets/close.png')}
                        style = {{width: wp('4%'), height: wp('4%'), marginTop: wp('3%'), marginLeft: wp('3%')}}
                        />
                    </TouchableOpacity>
                    {showModal && renderModal()}
                    <View style = {{width: wp('100%'), height: hp('6%'), marginTop: hp ('87%'), alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <TouchableOpacity style = {{width: wp ('30%'), height: hp('5%'), backgroundColor: COLOR.PRIMARY, borderColor: COLOR.BLACK, borderRadius: 7, borderWidth: 1, marginLeft: wp ('8%')}}
                        onPress={()=> {
                            setIsImageCaptured(false);
                            // dispatch(updateImagePath(''));
                            setImagePath('');
                            navigation.navigate('camerascreen')
                        }}
                        >
                            <Text style = {{textAlign: 'center', fontWeight: '700', fontSize: FONT.M, color: COLOR.BLACK, marginTop: 5, fontFamily: 'sans-serif'}}>Retake</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {{width: wp ('30%'), height: hp('5%'), backgroundColor: COLOR.PRIMARY, borderColor: COLOR.BLACK, borderWidth: 1, borderRadius: 7, marginLeft: wp ('23.5%')}}
                        onPress={() => {
                            callApi();
                        }}
                        >
                            <Text style = {{textAlign: 'center', fontWeight: '700', fontSize: FONT.M, color: 'black', marginTop: 5, fontFamily: 'sans-serif'}}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                </View>}
        </View>)}
        
        </View>
    )
};

const styleProps = StyleSheet.create({
    modalContainer: {
        width: wp('60%'), 
        height: wp('60%'), 
        backgroundColor: 'white', 
        alignItems: 'center',  
        shadowRadius: 10,
        borderRadius: 20,
        marginLeft: wp('20%'),
        marginBottom: hp('10%'),
        borderColor: 'black',
        borderWidth: 0.5,
        shadowColor: 'grey',
        shadowOpacity: 10,
        justifyContent: 'flex-start',
    }
});

export default CameraScreen;