/* eslint-disable prettier/prettier */
/*************************************************
 * Tracker
 * @exports
 * @class Loading.js
 * @extends Component
 * Created by Jagadish Sellamuthu on 03/03/2021
 * Copyright © 2021 Proglint. All rights reserved.
 *************************************************/

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';

import PropTypes from 'prop-types';

import Constants from '../../../util/Constants';
import StringFile from '../../../util/StringFile';
import Spinner from 'react-native-spinkit';

class Loading extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
    actionMessage: PropTypes.string,
    onReloadPress: PropTypes.func,
    isRefreshing: PropTypes.bool,
  };

  static defaultProps = {
    isLoading: true,
    isRefreshing: false,
    errorMessage: '',
    errorMessageColor: Constants.COLOR.FONT_COLOR,
    actionMessage: StringFile.MESSAGE.SETTINGS_RELOAD_TXT,
    actionMessageColor: Constants.COLOR.BUTTON_COLOR,
    backgroundColor: '#FFFFFFB3',
    loaderColor: Constants.COLOR.THEME_SECONDARY,
    loadingTextColor: Constants.COLOR.FONT_COLOR,
  };

  constructor(props) {
    super(props);
    this.state = {
      height: 100,
    };
  }

  /**
   * Renders the Loading spinner or no data message with reload option
   */
  _renderContent() {
    if (this.props.isLoading) {
      return (
        <View
          style={{
            // paddingTop: this.state.height * (2 / 5),
            alignItems: 'center',
          }}>
          {/* <Spinner
            isVisible={this.props.isLoading}
            size={40}
            type={'Wave'}
            color={this.props.loaderColor}
          /> */}
          <Text
              style={{
                textAlign: 'center',
                marginTop: 40,
                justifyContent: 'center',
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: Constants.FONT_SIZE.XL,
                color: this.props.loadingTextColor,
              }}>
              {'Admin'}
            </Text>
          {!this.props.disableText && (
            <Text
              style={{
                textAlign: 'center',
                marginTop: 40,
                fontSize: Constants.FONT_SIZE.M,
                color: this.props.loadingTextColor,
              }}>
              {'Connecting...'}
            </Text>
          )}
        </View>
      );
    } else {
      return (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isRefreshing}
              onRefresh={() => this.props.onReloadPress(true)}
            />
          }>
          {this._renderSpinnerOrMessage()}
        </ScrollView>
      );
    }
  }

  /**
   * Renders the given message or empty screen based on pull to refresh status
   */
  _renderSpinnerOrMessage() {
    if (this.props.isRefreshing) {
      return null;
    } else {
      return (
        <View
          style={{
            paddingTop: this.state.height * (2 / 5),
            alignItems: 'center',
          }}>
          <Text
            key={'0001'}
            style={{
              textAlign: 'center',
              fontSize: Constants.FONT_SIZE.L,
              padding: 20,
              color: this.props.errorMessageColor,
            }}>
            {this.props.errorMessage}
          </Text>
          <TouchableOpacity
            style={{
              paddingHorizontal: 25,
              paddingVertical: 10,
              marginTop: 20,
            }}
            onPress={() => {
              this.props.onReloadPress(false);
            }}>
            <Text
              style={{
                fontSize: Constants.FONT_SIZE.M,
                color: this.props.actionMessageColor,
                textDecorationLine: 'underline',
              }}>
              {this.props.actionMessage}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  measureView(event) {
    this.setState({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  }

  /**
   * Renders the Loading spinner or no data message with reload option
   */
  render() {
    return (
      <View
        style={{flex: 1, backgroundColor: this.props.backgroundColor}}
        onLayout={(event) => this.measureView(event)}>
        {this._renderContent()}
      </View>
    );
  }
}

export default Loading;

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
