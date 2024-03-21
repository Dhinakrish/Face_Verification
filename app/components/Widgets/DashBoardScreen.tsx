import React, {useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Container from '../UI/organisms/container';
import AppImages from '../../assets/images/AppImages';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MyTextInput from '../UI/atoms/MyTextInput';
import ButtonMolecule from '../UI/molecules/ButtonMolecule';
import {loginState} from '../../redux/reducers/SignInReducer';
import {useSelector} from 'react-redux';

const DashboardScreen = () => {
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
          justifyContent: 'center',
          alignContent: 'center',
          marginTop: wp('2%'),
          flex: 1,
        }}>
          <View style={{flex: 0.8}}>
        <Image
          resizeMode="contain"
          source={AppImages.CALLER}
          style={styles.image}
        />
        <Text style={{alignSelf: 'center', alignItems: 'center'}}>
          We`re delighted to have you as our customer
        </Text>
        <Text style={{alignSelf: 'center', alignItems: 'center'}}>
          It`s designed to help you
        </Text>

        <View style={{margin: hp('3%')}}>
          <MyTextInput
            error={nameError}
            value={name}
            formatText={'Full Name'}
            label={'Full Name'}
            onChangeText={(user) => {
              setName(user);
            }}
            returnKeyType={'done'}
            id="emailInputText"
            onSubmitEditing={() => {
              onTap();
            }}
          />
        </View>
        </View>

        <View
          style={{
            alignSelf: 'center',
            // marginTop: hp('2%'),
            flex: 0.1,
          }}>
          <ButtonMolecule
            title={'Call Now'}
            textColor={'white'}
            onTap={onTap}
            type={'L'}
            isLoading={false}
          />
        </View>

        {/* <SwipeButton
          thumbIconBackgroundColor={'black'}
          railBackgroundColor={'white'}
          title={'start to call'}
          shouldResetAfterSuccess={true}
          screenReaderEnabled={true}
          onSwipeSuccess={() => {
            Actions.CallJoinScreen();
          }}
        /> */}
      </View>
    </Container>
  );
};

export default DashboardScreen;

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
