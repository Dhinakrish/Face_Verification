import React, {useEffect, useRef, useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, BackHandler } from "react-native";
import { IconButton } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { useBackHandler } from "@react-native-community/hooks";


const CameraScreen = ({navigation}) => {

    const [cameraDevices, setCameraDevices] = useState('front');
    const [rotateCamera, setRotateCamera] = useState(false);
    const [isImageCaptured, setIsImageCaptured] = useState(false);
    const [imagePath, setImagePath] = useState('');

    const cameraDevice = useCameraDevice(cameraDevices);
    const camera = useRef();

    useBackHandler(() => {
        navigation.navigate('qrscreen');
        return true;
    })

    const captureImage = async () => {
        const photo = await camera.current?.takePhoto({
            flash:'off',
            qualityPrioritization: 'speed',
            enableShutterSound: false,
        });
        
        console.log(photo);

        if (photo !== null){
            setIsImageCaptured(true);
            // navigation.navigate('previewscreen', {imagePath: photo.path});
            setImagePath(photo.path);
        }else {
            console.log('Camera picture not taking')
        }
    };

    return (
        <View style = {styleProps.container}>
            {!isImageCaptured && <View style = {{flex: 1}}>
                <Camera
                ref={camera}
                device={cameraDevice}
                photo={true}
                style = {StyleSheet.absoluteFill}
                isActive={true}
                />
                <View style = {{flexDirection: 'row'}}>
                    <View style = {styleProps.routeContainer}>
                        <IconButton
                        icon={require('../assets/CameraRotate.png')}
                        size={30}
                        iconColor='black'
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
                <View style = {styleProps.captureContainer}>
                    <View style = {{width: wp('33.3%'), height: wp ('23%'), justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity style = {{
                                width: wp ('18%'),
                                height: wp ('18%'),
                                backgroundColor: 'white',
                                borderRadius: wp ('18%'),
                                borderWidth: 3,
                                borderColor: 'black'
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
                        navigation.navigate('camerascreen')
                    }}
                    >
                        <Image
                        source={require('../assets/close.png')}
                        style = {styleProps.closeButton}
                        />
                    </TouchableOpacity>
                    <View style = {styleProps.bottomBtnContainer}>
                        <TouchableOpacity style = {styleProps.retakeBtn}
                        onPress={()=> {
                            setIsImageCaptured(false);
                            navigation.navigate('camerascreen')
                        }}
                        >
                            <Text style = {styleProps.btnTextStyle}>Retake</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styleProps.okayBtn}>
                            <Text style = {styleProps.btnTextStyle}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                </View>}
        </View>
    )
};

const styleProps = StyleSheet.create({
    container: {
        width: wp('100%'),
        height: hp('100%'),
        flex: 1
    },

    cameraContainer: {
        width: wp('100%'),
        height: hp('87%')
    },

    backButtonContainer: {
        width: wp ('10%'),
        height: wp ('10%'),
        marginTop: wp('2%'),
        marginLeft: wp('2%'),
        justifyContent: 'center',
        alignItems: 'center'
    },

    counterView: {
        width: wp ('20%'),
        height: wp ('7%'),
        marginTop: wp('4%'),
        marginLeft: wp('28%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderRadius: 10,
        flexDirection: 'row'
    },

    routeContainer: {
        width: wp ('10%'),
        height: wp ('10%'),
        marginTop: wp('2%'),
        marginLeft: wp('85%'),
        marginRight: wp ('2%'),
        justifyContent: 'center',
        alignItems: 'center',
    },

    flashContainer: {
        width: wp ('10%'),
        height: wp ('10%'),
        marginTop: wp('2%'),
        marginLeft: wp('87%'),
        marginRight: wp ('2%'),
        justifyContent: 'center',
        alignItems: 'center',
    },

    captureContainer: {
        width: wp('100%'),
        height: hp('12%'),
        marginTop: hp ('75%'),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    cameraSelectionContainer: {
        width: wp('100%'),
        height: hp('5%'),
        marginTop: hp ('67%'),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    closeButton: {
        width: wp('4%'), 
        height: wp('4%'), 
        marginTop: wp('3%'), 
        marginLeft: wp('3%')
    },

    bottomBtnContainer: {
        width: wp('100%'),
        height: hp('6%'),
        marginTop: hp ('87%'),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },

    retakeBtn: {
        width: wp ('30%'),
        height: hp('5%'),
        backgroundColor: 'lightblue',
        borderColor: 'black',
        borderRadius: 7,
        borderWidth: 1,
        marginLeft: wp ('8%')
    },

    btnTextStyle: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 17,
        color: 'black',
        marginTop: 5,
        fontFamily: 'sans-serif'
    },

    okayBtn: {
        width: wp ('30%'),
        height: hp('5%'),
        backgroundColor: 'lightblue',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 7,
        marginLeft: wp ('23.5%')
    },
});

export default CameraScreen;