import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, Image, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import JainMonkey from 'jail-monkey';
import { checkNetworkConnection } from "../redux/actions/NetworkAction";
import { ActivityIndicator } from "react-native-paper";
import { splashIsLoading } from "../redux/reducers/SplashReducer";


const SplashScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const isLoading = useSelector(splashIsLoading);
    const isJainBroken = JainMonkey.isJailBroken();
    const [isJailBroked, setIsJailBroked] = useState(false);
    useEffect(() => {
        dispatch(checkNetworkConnection({navigation}));
        if (!isJainBroken){
            dispatch(checkNetworkConnection({navigation}));  
        }
        else{
            setIsJailBroked(true);
        }
    }, []);

    return(
        <View style = {styleProps.container}>
            <Image
            source={require('../assets/istockphoto-1076841360-612x612.jpg')}
            style = {styleProps.imageStyle}
            />
            {!isJailBroked && <ActivityIndicator 
            animating={isLoading} 
            color="lightgrey"
            size={wp('10%')}
            style = {styleProps.loader}
            />}
            {isJailBroked && 
            <Text>
                Need Root Access
            </Text>
            }
        </View>
    )
};

const styleProps = StyleSheet.create({
    container: {
        width: wp('100%'),
        height: hp('100%'),
        backgroundColor: 'black',
        alignItems: 'center'
    },

    imageStyle: {
        width: wp('60%'),
        height: wp('60%'),
        marginTop: hp('25%')
    },

    loader: {
        marginTop: wp('5%')
    }

})

export default SplashScreen;