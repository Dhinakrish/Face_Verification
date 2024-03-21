import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';

import PropTypes from 'prop-types';

const deviceWidth = Dimensions.get('window').width;

class ChatImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isdownloading: false,
    };
    // To avoid dessign issue when default font size increase or decrease
    if (Text.defaultProps == null) {
      Text.defaultProps = {};
    }
    Text.defaultProps.allowFontScaling = false;
    //end
  }
  static propTypes = {
    item: PropTypes.object,
    loggedInUserDetails: PropTypes.object,
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          // if (Actions.currentScene !== 'previewPopup') {
          //   Actions.previewPopup({item: item.media[0], isFrom: 'chatScreen'});
          // }
        }}>
        <View>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
            }}
            resizeMode="cover"
            style={{
              width: deviceWidth / 2.0,
              height: deviceWidth / 1.9,
              marginVertical: 10,
              position: 'relative',
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default ChatImage;
