import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import LabelAtom from '../atoms/LabelAtom';
import Constants from '../../../util/Constants';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Divider} from 'react-native-elements';

const MenuButton = () => {
  return (
    <View>
      <TouchableOpacity
        style={styles.touchableView}
        onPress={() => {
          props.onTap(props.id);
        }}>
        <LabelAtom customStyle={styles.textStyle}>{props.title}</LabelAtom>
        <Image source={props.imageType} style={styles.rightArrow} />
      </TouchableOpacity>
      <Divider />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  subViewContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  touchableView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  rightArrow: {
    width: hp('1.6%'),
    height: hp('1.6%'),
    tintColor: Constants.COLOR.FONT_PRIMARY,
  },
  textStyle: {
    paddingVertical: 10,
    color: Constants.COLOR.FONT_PRIMARY,
  },
});

export default MenuButton;
