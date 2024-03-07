import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { checkNetworkConnection } from "../redux/actions/NetworkAction";

const NetworkScreen = ({navigation}) => {

    const dispatch = useDispatch();
    return (
        <View style = {styleProps.container}>
            <Text style = {styleProps.messageStyle}>No Network Connection</Text>
            <Image
            source={require('../assets/network-error.png')}
            style = {styleProps.imageStyle}
            />
            <TouchableOpacity style = {styleProps.buttonStyle}
            onPress={() => {
                dispatch(checkNetworkConnection({navigation}))
            }}
            >
                <Text>Retry</Text>
            </TouchableOpacity>
        </View>
    )
};


const styleProps = StyleSheet.create({
    container: {
        width: wp('100%'),
        height: hp('100%'),
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    messageStyle: {
        fontWeight: "700",
        fontSize: wp('5%'),
        marginTop: hp ('25%'),
        color: 'black'
    },

    imageStyle: {
        width: wp('50%'),
        height: wp('50%'),
        marginTop: hp('5%')
    },

    buttonStyle: {
        width: wp('20%'),
        height: hp('5%'),
        backgroundColor: 'lightblue',
        marginTop: hp('3%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    }

})
export default NetworkScreen;