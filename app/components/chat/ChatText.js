import React, {Component} from 'react';
import {View, Text} from 'react-native';

import Constants from '../../util/Constants';
import PropTypes from 'prop-types';
import StringFile from '../../util/StringFile';
import moment from 'moment';

const getDateTime = (createdDate) => {
  let dateTime = '';
  if (
    moment(moment().format('YYYY-MM-DD')).isSame(
      moment(createdDate).format('YYYY-MM-DD'),
    )
  ) {
    dateTime = moment(createdDate).format('hh:mm A');
  } else if (
    moment(moment().subtract(1, 'day').format('YYYY-MM-DD')).isSame(
      moment(createdDate).format('YYYY-MM-DD'),
    )
  ) {
    dateTime = StringFile.MESSAGE.STRING_YESTERDAY;
  } else {
    dateTime = moment(createdDate).format('MM/DD/YYYY');
  }
  return dateTime;
};
export default class ChatText extends Component {
  constructor(props) {
    super(props);
    // To avoid dessign issue when default font size increase or decrease
    if (Text.defaultProps == null) {
      Text.defaultProps = {};
    }
    Text.defaultProps.allowFontScaling = false;
    //end
  }
  static propTypes = {
    item: PropTypes.object,
    loggedInUserId: PropTypes.string,
  };

  render() {
    const {item} = this.props;
    return (
      <View
        style={{
          elevation: 4,
          marginHorizontal: 15,
          marginVertical: 5,
        }}>
        {this.props.item.isCustomer === 1 && (
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: Constants.FONT_SIZE.M,
              color: 'white',
            }}>
            {StringFile.MESSAGE.STRING_ADMIN_CHAT}
          </Text>
        )}
        {this.props.item.isCustomer === 2 && (
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: Constants.FONT_SIZE.M,
              color: 'white',
            }}>
            {StringFile.MESSAGE.STRING_VENDOR_CHAT}
          </Text>
        )}
        {this.props.item.isCustomer === 3 && (
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: Constants.FONT_SIZE.M,
              color: 'white',
            }}>
            {StringFile.MESSAGE.STRING_CUSTOMER_CHAT}
          </Text>
        )}

        <Text
          style={{
            fontSize: Constants.FONT_SIZE.M,
            color: this.props.item.isCustomer === 1 ? 'white' : 'white',
          }}>
          {item.message}
        </Text>
        <Text
          style={{
            alignSelf: 'flex-end',
            fontSize: Constants.FONT_SIZE.S,
            color: this.props.item.isCustomer === 1 ? 'white' : 'white',
            marginTop: 8,
          }}>
          {getDateTime(this.props.item.createdDate)}
        </Text>
      </View>
    );
  }
}
