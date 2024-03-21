import React, { useState } from 'react';

import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView, Dimensions, Image } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

  import Utility from '../util/Utility';


const LoginScreen = ({navigation}) => {

  const [Username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('jiya', Username);

    if(Username.length < 3){
        console.log('Username:', Username);

        Utility.showSnackBar('Please enter valid Username');

    }else if (password.length < 3){
        console.log('Password:', password);
        Utility.showSnackBar('Please enter valid Password');

    }else{
        navigation.navigate('calldetails');
        
    }

  };

  return (
    <SafeAreaView style={{flex:1, backgroundColor :'white'}}>
{/* <ImageBackground style={{flex:1}}source={require('../assets/login-bg.png')}> */}
<View>
    <Image  resizeMode="contain"   style={{ height: hp('30%'), width: wp('90%'), alignSelf: 'center', marginTop: hp('5%')}}source={require("../assets/images/loginImage.png")}/>
</View>
<View style={styles.container}>
      <Text style={styles.titletext}>Welcome to Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={Username}
        cursorColor={'black'}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        cursorColor={'black'}
        secureTextEntry
      />

      <TouchableOpacity onPress={() => {
        handleLogin()
      }}>
            <View style={styles.Button}>
            <Text style={styles.Text}>
                {'Login'}</Text></View></TouchableOpacity>
                
    </View>
  
    {/* </ImageBackground> */}
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({

  container: {

    flex: 0.7,

    justifyContent: 'center',

    alignItems: 'center',

    paddingHorizontal: 60,

    marginTop: hp('15')
  },

  titletext: {

// flex: 0.1,

    fontSize: 24,

    fontWeight: 'bold',

    color:'black'

  },

  input: {

    width: '100%',

    height: 40,

    borderColor: 'gray',

    borderWidth: 1,

    borderRadius: 5,

    borderColor: 'black',
    // paddingHorizontal: 10,

    marginTop: hp('3%')

  },
  Button:{
     
    marginTop: hp('5%'),

    backgroundColor: 'black',

    alignSelf: 'center',

    borderRadius: 5,

    width: wp('25%'),

    height:hp('3%'), 

    margin:5

  },
  Text:{
    fontWeight: 'bold',

    color: 'white',
    
    textAlign: 'center'
  }

});

export default LoginScreen;