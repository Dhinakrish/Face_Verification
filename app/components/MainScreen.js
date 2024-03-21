import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, Image, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import JainMonkey from 'jail-monkey';
import { checkNetworkConnection } from "../redux/actions/NetworkAction";
import { ActivityIndicator, Button } from "react-native-paper";
import { splashIsLoading } from "../redux/reducers/SplashReducer";


const MainScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const isLoading = useSelector(splashIsLoading);
    const isJainBroken = JainMonkey.isJailBroken();
    const [isJailBroked, setIsJailBroked] = useState(false);
    useEffect(() => {

    }, []);

    return(
        <View style = {styleProps.container} >

            <Button   onPress={() => {
                        
                        navigation.navigate('webcall');
                    }}>
            
                Need Root Access
            </Button>
            
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

export default MainScreen;