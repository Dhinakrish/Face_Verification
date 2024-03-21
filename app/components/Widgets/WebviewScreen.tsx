import React, {useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Container from '../UI/organisms/container';
import Header from '../UI/organisms/Header';
import SwipeButton from 'rn-swipe-button';
import AppImages from '../../assets/images/AppImages';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {WebView} from 'react-native-webview';
import LabelAtom from '../UI/atoms/LabelAtom';
import MyTextInput from '../UI/atoms/MyTextInput';
import StringFile from '../../util/StringEnglish';
import ButtonMolecule from '../UI/molecules/ButtonMolecule';
import {loginState} from '../../redux/reducers/SignInReducer';
import {useSelector, useDispatch} from 'react-redux';


const WebviewScreen = () => {
  const loginstateValue = useSelector(loginState);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const onTap = () => {
    if (name.length === 0) {
      setNameError('Please enter the full name');
    } else {
      // Actions.CallJoinScreen({FullName: name});
    }
  };
  return (
    <Container>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          // paddingHorizontal: wp('5%'),
          // paddingTop: wp('5%'),
        }}>
        <WebView
          // ref={(ref) => (webview = ref)}
          style={{
            flex: 1,
          }}
          source={{
            uri: 'https://dev-meet.proglint.com/custom/4a57904061048d0fcb61fc53405b850e',
          }}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          startInLoadingState={true}
          renderLoading={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <ActivityIndicator
                color={Constants.COLOR.THEME_COLOR}
                size="large"
              /> */}
            </View>
          )}
          automaticallyAdjustContentInsets={true}
          useWebKit={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </Container>
  );
};

export default WebviewScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: wp('60%'),
    alignContent: 'center',
    alignSelf: 'center',
    height: hp('20%'),
  },
});
