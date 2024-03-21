import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import LabelAtom from '../atoms/LabelAtom';
import SpinnerAtom from '../atoms/SpinnerAtom';
import Constants from '../../../util/Constants';
const deviceWidth = Dimensions.get('window').width;

const ButtonMolecule = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onTap(props.title);
      }}
      style={{
        // borderRadius: (Constants.FONT_SIZE.M + 40) * 0.5,
        borderRadius: 1,
        backgroundColor: Constants.COLOR.BUTTON_COLOR,
        paddingHorizontal: Constants.FONT_SIZE.M * 2,
        minWidth: deviceWidth / 2,
        alignItems: 'center',
        justifyContent: 'center',
        height: Constants.FONT_SIZE.M + 40,
      }}>
      {props.isLoading ? (
        <SpinnerAtom />
      ) : (
        <LabelAtom
          type={props.type}
          children={props.title}
          textColor={props.textColor}
        />
      )}
    </TouchableOpacity>
  );
};

export default ButtonMolecule;
