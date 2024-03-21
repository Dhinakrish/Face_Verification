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
import LoginScreeen from '../Widgets/LoginScreen';

const LoginScreeen = () => {
  const dispatch = useDispatch();
  const loginstateValue = useSelector(loginState);
  const [username, EmailSetstate] = React.useState('test');
  const [password, passwordSetstate] = React.useState('sdksd');
  const [passwordSecure, passwordSecureSetstate] = React.useState(true);
  const [usernameError, usernameErrorSetstate] = React.useState('');
  const [passwordError, passwordErrorSetstate] = React.useState('');
  let emailInputText: string;
  let passwordInputText: string;
  const _validateInputs = data => {
    if (username.trim().length < 4) {
      usernameErrorSetstate(Constants.VALIDATION_MSG.NO_USERNAME);
      emailInputText.focus();
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

  const onTap = (data: string) => {
    _validateInputs(data);
  };

  return <LoginScreeen  onTap={onTap} _validateInputs={_validateInputs} />;
};

export default LoginScreeen;
