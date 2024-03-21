import React from 'react';
import {Text} from 'react-native';
import Constants from '../../../util/Constants';

const LabelAtom = ({
  customStyle = {},
  children = '',
  textColor = Constants.COLOR.THEME_COLOR,
  type = 'M',
}) => {
  // const fontFamily =
  //   style.fontWeight === 'bold'
  //     ? 'Poppins-Bold'
  //     : style.fontWeight === '800'
  //     ? 'Poppins-SemiBold'
  //     : style.fontWeight === '500'
  //     ? 'Poppins-Medium'
  //     : 'Poppins-Regular';
  return (
    <Text
      style={[
        {fontSize: Constants.FONT_SIZE[type], color: textColor},
        customStyle,
      ]}>
      {children}
    </Text>
  );
};

export default LabelAtom;
