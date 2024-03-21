import React from 'react';
import {OutlinedTextField} from 'react-native-material-textfield';
import {StyleSheet} from 'react-native';
import Constants from '../../../util/Constants';
import {InputBoxInterface} from '../../interface/InputBoxInterface';
const MyTextInput = () => {
  return (
    <OutlinedTextField
      style={[styles.inputStyle, props.customStyle]}
      fontSize={10}
      labelFontSize={10}
      tintColor={'black'}
      autoCapitalize={'none'}
      errorColor={'#D20117'}
      inputContainerStyle={styles.inputContainerStyle}
      autoCorrect={false}
      {...props}
      ref={props.setRef}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
  },
  inputContainerStyle: {backgroundColor: 'white'},
});

export default MyTextInput;
