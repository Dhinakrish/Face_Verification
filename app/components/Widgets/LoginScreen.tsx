import React from 'react';
import {Dimensions, Image, View, TouchableOpacity} from 'react-native';
import ButtonMolecule from '../UI/molecules/ButtonMolecule';
import Container from '../UI/organisms/container';
import StringFile from '../../util/StringEnglish';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import AppImages from '../../assets/images/AppImages';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LabelAtom from '../UI/atoms/LabelAtom';
import Constants from '../../util/Constants';
import MyTextInput from '../UI/atoms/MyTextInput';
import {loginState} from '../../redux/reducers/SignInReducer';
import {loginButtonSubmit} from '../../redux/action/SignInAction';
import {useSelector, useDispatch} from 'react-redux';
import Utility from '../../util/Utility';

const LoginScreeen = () => {
  const dispatch = useDispatch();
  const loginstateValue = useSelector(loginState);
  const [username, EmailSetstate] = React.useState('sudhar');
  const [password, passwordSetstate] = React.useState('sdksd');
  const [passwordSecure, passwordSecureSetstate] = React.useState(true);
  const [usernameError, usernameErrorSetstate] = React.useState('');
  const [passwordError, passwordErrorSetstate] = React.useState('');
  let emailInputText: string;
  let passwordInputText: string;
  const _validateInputs = () => {
    if (username.trim().length < 4) {
      usernameErrorSetstate(Constants.VALIDATION_MSG.NO_USERNAME);
      Utility.showSnackBar(Constants.VALIDATION_MSG.NO_USERNAME);
      // emailInputText.focus();
    } else {
      usernameErrorSetstate('');
    }
    if (password.trim().length < 4) {
      passwordErrorSetstate(Constants.VALIDATION_MSG.NO_PASSWORD);
    } else {
      passwordErrorSetstate('');
    }
    if (username.trim().length > 4 && password.trim().length > 4) {
      dispatch(loginButtonSubmit());
    }
  };

  const onTap = () => {
    _validateInputs();
  };

  return (
    <Container topColor={'white'}>
      <View style={{flex: 1}}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          extraHeight={hp('5%')}
          enableOnAndroid={true}
          bounces={false}>
          <View
            style={{
              paddingHorizontal: hp('3%'),
              height: Dimensions.get('window').height,
              justifyContent: 'center',
            }}>
            <Image
              style={{
                width: wp('50%'),
                height: hp('10%'),
              }}
              resizeMode="contain"
              source={AppImages.LOGO}
            />
            <LabelAtom children={'Welcome'} />
            <LabelAtom children={'Sign in to continue'} />

            <View style={{marginTop: hp('3%')}}>
              {/* <InputMolecule label={'userName'} /> */}
              <MyTextInput
                error={usernameError}
                value={username}
                formatText={'userName'}
                label={StringFile.MESSAGE.STRING_USERNAME}
                onChangeText={user => {
                  EmailSetstate(user);
                }}
                returnKeyType={'next'}
                maxLength={10}
                id="emailInputText"
                onSubmitEditing={() => {}}
              />
            </View>
            <View style={{marginTop: hp('1%')}}>
              <MyTextInput
                error={passwordError}
                value={password}
                formatText={'password'}
                label={StringFile.MESSAGE.STRING_PASSWORD}
                onChangeText={user => {
                  passwordSetstate(user);
                }}
                returnKeyType={'next'}
                maxLength={10}
                id="emailInputText"
                onSubmitEditing={() => {}}
                secureTextEntry={passwordSecure}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 5,
                  top: 7,
                  padding: 10,
                }}
                onPress={() => {
                  passwordSecureSetstate(!passwordSecure);
                }}>
                <Image
                  source={
                    !passwordSecure ? AppImages.EYEVIEW : AppImages.EYEHIDDEN
                  }
                  resizeMode={'contain'}
                  style={{
                    width: wp('5%'),
                    height: wp('5%'),
                    tintColor: Constants.COLOR.FONT_HINT,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignSelf: 'center',
                marginTop: hp('5%'),
              }}>
              <ButtonMolecule
                title={'Sign In'}
                textColor={'white'}
                onTap={onTap}
                type={'L'}
                isLoading={loginstateValue.isLoginLoading}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: hp('2%'),
                justifyContent: 'center',
              }}>
              <LabelAtom children={'Forgot Password?'} />
            </View>
            <View style={{alignItems: 'center'}}>
              <LabelAtom
                children={'Powered By'}
                customStyle={{padding: 5, marginTop: hp('1%')}}
                type={'S'}
              />

              <Image
                style={{
                  width: wp('50%'),
                  height: wp('15%'),
                  marginTop: hp('2%'),
                }}
                resizeMode="contain"
                source={AppImages.LOGO}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Container>
  );
};

export default LoginScreeen;
