import React,  {useEffect, useRef, useState} from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ActivityIndicator, Button, Modal } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useBackHandler } from "@react-native-community/hooks";
import { useDispatch, useSelector } from "react-redux";
import { verifyFace } from "../redux/actions/CameraAction";
import { updateQRValue } from "../redux/actions/QRScreenAction";
import Constants from '../util/Constants'
import { RNCamera } from "react-native-camera";
import { qrCode } from "../redux/reducers/QRScreenReducer";


const CameraScreen = ({navigation}) => {
    const [isImageCaptured, setIsImageCaptured] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setSuccessModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [count, setCount] = useState(0);
    const [isDetecting, setIsDetecting] = useState(false);

    const QRCode = useSelector(qrCode);

    let counts = 6
    useEffect(() => {
        const updateCount = setInterval(() => {
            counts = counts - 1;
            setCount(counts);
            if (counts === 0){
                setIsDetecting(true);
                clearInterval(updateCount)
            }
        }, 1000);
        return () => clearInterval(updateCount);
    }, []);

    const dispatch = useDispatch();

    const {COLOR, FONT} = Constants;
    const camera = useRef();

    useBackHandler(() => {
        dispatch(updateQRValue(''));
        navigation.navigate('qrscreen');
        return true;
    });


    const captureImage = async () => {
        const option = {quality: 0.5, base64: true}
        const image = await camera.current.takePictureAsync(option);
        console.log('imagedata', image.uri);
        if (image.uri != ''){
            setIsImageCaptured(true);
            setShowModal(true);
            let data = {qrValue: QRCode, imageValue: image.uri }
            dispatch(verifyFace(data, (res) => {
                console.log('Face_Verify_CallBack_res', res);
                if (res != ''){
                    if (res.message != ''){
                        if (res.message == 'Authentication Failure'){
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
    };

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
                        verifing...
                    </Text>
                    </View>}
                {showSuccessModal && <View style = {{alignItems: 'center'}}>
                    <Image source={success ? require('../assets/checked.png') : require('../assets/no.png')} style = {{width: wp('12%'), height: wp('12%'), marginTop: hp('3%')}}/>
                        <Text style= {{fontSize: FONT.M, color: COLOR.BLACK, marginTop: hp('4%')}}>{responseMessage}</Text>
                        <Button
                        mode="elevated"
                        style = {{marginTop: hp('4%'), backgroundColor: COLOR.PRIMARY}}
                        textColor={COLOR.WHITE}
                        labelStyle={{width: wp('20%'), borderColor: 'black'}}
                        onPress={() => {
                            setIsImageCaptured(false);
                            setSuccessModal(false);
                            setResponseMessage('');
                            setShowModal(false);
                            setSuccess(false);
                            navigation.navigate('qrscreen');
                        }}
                        >
                            Okay
                        </Button>
                </View>}
            </Modal>
        )
    }

    return (
        <View style = {{width: wp('100%'), height: hp('100%'), alignItems: 'center', justifyContent: 'center'}}>
            <RNCamera
            ref={camera}
            style = {{width: wp('100%'), height: hp('100%')}}
            type="front"
            focusable={true}
            onFacesDetected={(face) => {
                if (isImageCaptured == false && isDetecting == true){
                    if(face.faces.length != 0){
                        face.faces.map((item) => {
                            const leftEyeProb = item.leftEyeOpenProbability;
                            const rightEyeProb = item.rightEyeOpenProbability;
                            const nosePosition = item.noseBasePosition.y;
                            if (leftEyeProb >= 0.80 && rightEyeProb >= 0.80){
                                if ((nosePosition >= 350) && (nosePosition <= 500)){
                                    captureImage();
                                }
                                else {
                                    console.log('nose not okay');
                                }
                            }else{
                                console.log('Eye not okay');
                            }
                        })
                    }
                }  
            }}
            faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
            faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
            faceDetectionClassifications={RNCamera.Constants.FaceDetection.Classifications.all}
            >
                {(isDetecting && !isImageCaptured) && <View style = {{width: wp('100%'), height: hp('5%'), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: wp('38%')}}>
                    <Image
                    source={require('../assets/record.png')}
                    style={{width: wp('3%'), height: wp('3%')}}
                    />
                    <Text style = {{fontSize: FONT.M}}>Detecting</Text>
                </View>}
                {(!isDetecting && !isImageCaptured) && <Text style = {{fontSize: wp('25%'), textAlign: 'center', marginTop: hp('40%')}}>{count}</Text>}
            </RNCamera>
            {showModal && renderModal()}
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