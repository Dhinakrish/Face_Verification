import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';
import ChatText from './ChatText';
import ChatImage from './ChatImage';
import Constants from '../../util/Constants';
import moment from 'moment';
import Clipboard from '@react-native-clipboard/clipboard';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

class MyChatListCell extends Component {
  static propTypes = {
    item: PropTypes.object,
    loggedInUserDetails: PropTypes.object,
  };
  constructor(props) {
    super(props);
  }

  _renderMessageType(item) {
    // if (this.props.item.messageType === 1) {
    return (
      <View>
        <TouchableOpacity
          onLongPress={() => {
            this._onPressCopy(this.props.item.message);
          }}>
          <ChatText
            item={this.props.item}
            // loggedInUserId={this.props.loggedInUserDetails.user._id}
          />
        </TouchableOpacity>
      </View>
    );
    // } else if (this.props.item.messageType === 2) {
    //   return (
    //     <ChatImage
    //       item={this.props.item}
    //       // loggedInUserId={this.props.loggedInUserDetails.user._id}
    //     />
    //   );
    // } else {
    //   return null;
    // }
  }

  _onPressCopy = (message) => {
    Clipboard.setString(message);
  };

  render() {
    return (
      <View>
        <View
          style={{
            maxWidth: wp('80%'),
            borderTopLeftRadius: wp('5%'),
            borderTopRightRadius: wp('5%'),
            borderBottomLeftRadius: wp('5%'),
            padding: wp('2%'),
            margin: this.props.item === 1 ? 10 : 0,
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
            alignSelf: 'flex-end',
            backgroundColor: Constants.COLOR.THEME_COLOR,
          }}>
          {this._renderMessageType()}
        </View>
      </View>
    );
  }
}

export default MyChatListCell;

const styles = StyleSheet.create({
  rowMainContainer: {
    flex: 1,
  },
});
