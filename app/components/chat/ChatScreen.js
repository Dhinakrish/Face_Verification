import React, {Component} from 'react';
import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  Dimensions,
} from 'react-native';
import StringFile from '../../util/StringFile';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Constants from '../../util/Constants';
import Container from '../common/Container';
import Header from '../common/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Loading from '../common/Loading';
import MyChatListCell from '../../components/chat/MyChatListCell';
import OtherChatListCell from '../../components/chat/OtherChatListCell';
import {
  getChatList,
  addtoChat,
  resetToInitial,
} from '../../redux/actions/ChatAction';
// import {getSubscriptionOrderDetails} from '../../redux/actions/SubscriptionAction';
let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtMessage: '',
      isSendClicked: false,
    };
  }

  componentDidMount() {
    if (this.props.ordersId) {
      this.props.getChatList({
        orderId: this.props.ordersId,
      });
    } else if (this.props.subscriptionsId) {
      this.props.getChatList({
        customerSubscriptionId: this.props.subscriptionsId,
      });
    }
  }

  componentWillUnmount() {
    this.props.resetToInitial();
  }

  _renderItem = ({item, index}) => {
    console.log('itemmmm', item);
    if (item.isCustomer === 2) {
      if (item.isCustomer === 2) {
        return <MyChatListCell item={item} />;
      } else {
        return <MyChatListCell item={item[0]} />;
      }
    } else {
      return <OtherChatListCell item={item} />;
    }
  };

  _renderList = () => {
    const {chatListdata} = this.props;

    if (this.props.isChatLoading) {
      return (
        <Loading
          errorMessage={'Please let us know how\n we can help you'}
          actionMessage={''}
          isLoading={this.props.isChatLoading}
          backgroundColor={'transparent'}
          loaderColor={Constants.COLOR.THEME_COLOR}
          loadingTextColor={Constants.COLOR.THEME_COLOR}
          errorMessageColor={Constants.COLOR.THEME_COLOR}
        />
      );
    } else if (chatListdata?.length === 0 || chatListdata === null) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: wp('40%'),
              width: wp('40%'),
              marginBottom: 10,
            }}
            resizeMode={'contain'}
            source={require('../../assets/images/chaticon.png')}
          />
          <Text>{'Please let us know how\n we can help you'}</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          style={{
            flex: 1,
          }}
          showsVerticalScrollIndicator={false}
          data={chatListdata}
          keyExtractor={(item, index) => item + index}
          renderItem={this._renderItem}
          inverted={true}
          // inverted
        />
      );
    }
  };

  _renderFooter() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          marginVertical: 10,
          paddingVertical: Platform.OS === 'ios' ? 10 : 0,
        }}>
        <TextInput
          underlineColorAndroid={'transparent'}
          placeholder="Type your message ..."
          placeholderTextColor={Constants.COLOR.FONT_HINT}
          scrollEnable={true}
          multiline
          style={{
            flex: 1,
            color: Constants.COLOR.FONT_COLOR,
            fontSize: Constants.FONT_SIZE.M,
            marginHorizontal: 20,
            borderRadius: 10,
            height: wp('10%'),
            borderWidth: 0.5,
            borderColor: 'black',
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 5,
            marginTop: 10,
          }}
          onChangeText={(txtMessage) => {
            this.setState({txtMessage});
          }}
          value={this.state.txtMessage}
          onSubmitEditing={() => {
            if (this.state.txtMessage.length !== 0) {
              if (this.props.ordersId) {
                this.props.addtoChat(
                  {
                    orderId: this.props.ordersId,
                    message: this.state.txtMessage,
                  },
                  true,
                );
              } else if (this.props.subscriptionsId) {
                this.props.addtoChat({
                  message: this.state.txtMessage,
                  customerSubscriptionId: this.props.subscriptionsId,
                });
              } else {
                if (this.props.OrderIds) {
                  this.props.addtoChat({
                    message: this.state.txtMessage,
                    orderId: this.props.OrderIds,
                  });
                } else {
                  this.props.addtoChat(
                    {
                      customerSubscriptionId:
                        this.props.customerSubscriptionIds,
                      message: this.state.txtMessage,
                    },
                    true,
                  );
                }
              }
              this.setState({
                txtMessage: '',
              });
            }
          }}
          returnKeyType={'send'}
        />
        <TouchableOpacity
          style={{paddingRight: wp('3%')}}
          disabled={this.state.isSendClicked}
          onPress={() => {
            console.log('22222', this.props.ordersId);
            console.log('2222SS', this.props.OrderIds);
            if (this.state.txtMessage.length !== 0) {
              if (this.props.ordersId) {
                console.log('ordersId');
                this.props.addtoChat(
                  {
                    orderId: this.props.ordersId,
                    message: this.state.txtMessage,
                  },
                  true,
                );
              } else if (this.props.subscriptionsId) {
                this.props.addtoChat({
                  message: this.state.txtMessage,
                  customerSubscriptionId: this.props.subscriptionsId,
                });
              } else {
                if (this.props.OrderIds !== '') {
                  this.props.addtoChat(
                    {
                      orderId: this.props.OrderIds,
                      message: this.state.txtMessage,
                    },
                    true,
                  );
                } else if (this.props.customerSubscriptionIds !== '') {
                  this.props.addtoChat(
                    {
                      customerSubscriptionId:
                        this.props.customerSubscriptionIds,
                      message: this.state.txtMessage,
                    },
                    false,
                  );
                }
              }
              this.setState({
                txtMessage: '',
              });
            }
          }}>
          <Image
            style={{
              width: wp('6%'),
              height: wp('6%'),
              marginEnd: 1,
            }}
            source={require('../../assets/images/MsgSendIcon.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Header title={StringFile.MESSAGE.CHAT} enableBack isElevated />
        <View
          style={{
            flex: 1,
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null} // For message text input height
            keyboardVerticalOffset={Platform.OS === 'ios' ? hp('15%') : 10} // For message text input height
            style={{
              flex: 1,
              paddingHorizontal: wp('3%'),
            }}>
            {this._renderList()}
            <View>{this._renderFooter()}</View>
          </KeyboardAvoidingView>
        </View>
      </Container>
    );
  }
}

export const mapStateToProps = (state, props) => {
  // props can be called as ownProps
  const {
    chatState: {isChatLoading, chatListdata, OrderIds, customerSubscriptionIds},
    // subscriptionState: {subscriptionOrderDetails},
  } = state;
  return {
    isChatLoading,
    chatListdata,
    OrderIds,
    customerSubscriptionIds,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getChatList,
      addtoChat,
      resetToInitial,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
