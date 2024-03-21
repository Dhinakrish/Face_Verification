import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';
import ChatText from './ChatText';
import Constants from '../../util/Constants';
import moment from 'moment';
import ChatImage from './ChatImage';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

class OtherChatListCell extends Component {
  static propTypes = {
    item: PropTypes.object,
    loggedInUserDetails: PropTypes.object,
  };
  _renderMessageType(item) {
    // if (this.props.item.messageType === 1) {
    return (
      <View>
        <TouchableOpacity
          onLongPress={() => {
            // this._onPressCopy(this.props.item.message);
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
  render() {
    return (
      <View>
        <View
          style={{
            maxWidth: wp('80%'),
            borderBottomEndRadius: wp('5%'),
            borderTopRightRadius: wp('5%'),
            borderTopLeftRadius: wp('5%'),
            padding: 8,
            margin: 10,
            backgroundColor: '#7F7C82',
            alignSelf: 'flex-start',
          }}>
          {this._renderMessageType()}
        </View>
      </View>
    );
  }
}

export default OtherChatListCell;
