import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList,
  Text
} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
let socket;
let socketScreen;
let tempObj = {};
let sdp = '';
let screenSchareRemoteUserId;
import io from 'socket.io-client';
import {
  RTCPeerConnection,
  RTCView,
  mediaDevices,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';
import RBSheet from 'react-native-raw-bottom-sheet';
import Loading from './components/UI/atoms/Loading';
const Z_INDEX = 10000;
import InCallManager from 'react-native-incall-manager';
import {callButton, callEnd} from './redux/actions/SignInAction';
var newlocalstream;
const configuration = {
  iceServers : [
    {
        urls: "stun:rtcrelay.proglint.com:80",
    },
    {
        urls: "turn:rtcrelay.proglint.com:80",
        username: "rtcrelayuser",
        credential: "SfGe1Kg9VVz3QgB72n0aIwa103cy0HS0",
    },
    {
        urls: "turn:rtcrelay.proglint.com:443",
        username: "rtcrelayuser",
        credential: "SfGe1Kg9VVz3QgB72n0aIwa103cy0HS0",
    },
    {
        urls: "turns:rtcrelay.proglint.com:443",
        username: "rtcrelayuser",
        credential: "SfGe1Kg9VVz3QgB72n0aIwa103cy0HS0",
    },
    {
        urls: "turn:rtcrelay.proglint.com:443?transport=tcp",
        username: "rtcrelayuser",
        credential: "SfGe1Kg9VVz3QgB72n0aIwa103cy0HS0",
    },
    {
        urls: "turns:rtcrelay.proglint.com:443?transport=tcp",
        username: "rtcrelayuser",
        credential: "SfGe1Kg9VVz3QgB72n0aIwa103cy0HS0",
    },
],
  iceCandidatePoolSize: 10,
};
let remoteUserId;
let senderId;
let connectionDescriptiondata = {};
let newRoomID = '';
let candidate = {};
let screenRoomId;
let setLocalPCStream;
const CallJoinScreen = (navigation) => {
  const dispatch = useDispatch();

  function onBackPress() {
    switchOFF();
    if (cachedLocalPC) {
      cachedLocalPC.removeStream(localStream);
      cachedLocalPC.close();
    }
    // setLocalStream();
    setRemoteStream();
    setCachedLocalPC();
   
    // Actions.pop();
    // cleanup
  }

  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [remoteScreenStream, setRemoteScreenStream] = useState();

  const [cachedLocalPC, setCachedLocalPC] = useState();
  const [remoteID, setremoteID] = useState();
  const [isMuted, setIsMuted] = useState(false);
  const [isShowVideo, setShowVideo] = useState(false);
  const [isScreenView, setScreenView] = useState(false);
  const [screenStream, setscreenStream] = useState();
  const [name, setName] = useState();
  let rbSheet = null;

  useEffect(() => {
    connectSocketMeet();
    // connectSocket();
    InCallManager.start({media: 'video'});
    InCallManager.setForceSpeakerphoneOn(true);
  }, []);

  useEffect(() => {
    // returned function will be called on component unmount
    return () => {
      //onBackPress();
    };
  }, []);

  const onTap = () => {
    startLocalStream();
  };

  const startLocalStream = async () => {

    // isFront will determine if the initial camera should face user or environment
    // const isFront = true;
    // const devices = await mediaDevices.enumerateDevices();

    // const facing = isFront ? 'front' : 'environment';
    // const videoSourceId = devices.find(
    //   (device) => device.kind === 'videoinput' && device.facing === facing,
    // );
    // const facingMode = isFront ? 'user' : 'environment';
    // const constraints = {
    //   audio: true,
    //   video: {
    //     mandatory: {
    //       minWidth: 500, // Provide your own width, height and frame rate here
    //       minHeight: 300,
    //       minFrameRate: 30,
    //     },
    //     facingMode,
    //     optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
    //   },
    // };
    const availableDevices = await mediaDevices.enumerateDevices();
        const {deviceId: sourceId} = availableDevices.find(
          // once we get the stream we can just call .switchCamera() on the track to switch without re-negotiating
          // ref: https://github.com/react-native-webrtc/react-native-webrtc#mediastreamtrackprototype_switchcamera
          device => device.kind === 'videoinput' && device.facing === 'front',
        );
    const newStream1 = await mediaDevices.getUserMedia({
      audio: true,
      video: {
        mandatory: {
          // Provide your own width, height and frame rate here
          minWidth: 500,
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode: 'user',
        optional: [{sourceId}],
      },
    });
   
    
    console.log('user-screen-share111---OLD', newStream1);
    setLocalStream(newStream1);
   
    newlocalstream = newStream1
    setName('sarvanan')

    setTimeout(() => {
       console.log(name, 'SARAVANANANANAN')
        //emoteUserId = data;
        joinRoom();
      
    }, 2000);
    
  };

  const connectSocketMeet = () => {
    dispatch(
      callButton('saravanan', (callBack) => {
        console.log()
        screenRoomId = callBack.response.roomId;
        newRoomID = callBack.response.roomId;
        setScreenView(true);
        // dispatch(getChatList(callBack.response.roomId));
        connectSocket();
        connectScreenSocket();
      }),
    );
    // socket = io.connect('https://socket-meet.proglint.com', {
    //   path: '/socket.io',
    //   transports: ['websocket'],
    // });
    // socket.on('connect', (connection) => {
    //   console.log('APP CONNECTED ');
    // });
    // socket.on('extra-data-updated', (data) => {
    //   console.log('extra-data-updated', data);
    // });

    // socket.on(`screen/${newRoomID}/${'store'}`, (response) => {
    //   console.log('screen share Response', response);
    //   screenRoomId = response.screenRoomId;
    //   if (response.stop) {
    //     setScreenView(false);
    //     socketScreen.close();
    //   } else {
    //     setScreenView(true);
    //     connectScreenSocket();
    //   }
    // });
  };

  const renderChat = () => {
    const {chatListdata} = this.props;

    if (this.props.isChatLoading) {
      return (
        <Loading
          errorMessage={'Please let us know how\n we can help you'}
          actionMessage={''}
          isLoading={this.props.isChatLoading}
          backgroundColor={'transparent'}
          loaderColor={'black'}
          loadingTextColor={'black'}
          errorMessageColor={'black'}
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
            source={require('../app/assets/images/chat.png')}
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

  const renderRBSheet = () => {
    return (
      <RBSheet
        ref={(ref) => {
          rbSheet = ref;
        }}
        height={hp('60%')}
        duration={250}
        animationType={'fade'}
        closeOnDragDown
        dragFromTopOnly
        customStyles={{
          container: {
            borderTopRightRadius: wp('5%'),
            borderTopLeftRadius: wp('5%'),
            backgroundColor: 'white',
          },
          wrapper: {
            // backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#fff',
          },
        }}>
        <Text>Hi</Text>
      </RBSheet>
    );
  };

  const connectSocket = () => {
    let parameters =
      '?userid=' +
      screenRoomId +
      '&sessionid=httpsmeetproglintcomcustomer' +
      screenRoomId +
      '&msgEvent=video-conference-demo&socketCustomEvent=RTCMultiConnection-Custom-Message&autoCloseEntireSession=true&maxParticipantsAllowed=1000&extra={}';
    socket = io.connect('https://devsocket-rtc.proglint.com' + parameters, {
      path: '/socket.io',
      transports: ['websocket'],
    });
    socket.on('connect', (connection) => {
      console.log('APP CONNECTED RTC');
      startLocalStream();
    });
    //video-conference-demo
    socket.on('video-conference-demo', (data) => {
      onMessageEvent(data);
    });
    socket.on('user-connected', (data) => {
      if (!isScreenView) {
        console.log('USER-CONNECTED', data);
        console.log('onMessageEvent', remoteUserId);
        remoteUserId = data;

        setTimeout(() => {
          if (data) {
            //emoteUserId = data;
            startCall('123');
          }
        }, 3000);
      } else {
        screenSchareRemoteUserId = data;
      }
    });
    socket.on('extra-data-updated', (data) => {
      console.log('extra-data-updated', data);
    });
    socket.on('screen-sharing-demo', (data) => {
      console.log('ONsaravananScreenEMIT', data);
      onMessageScreenEvent(data);
    });
    socket.on('endcall/' + screenRoomId + '/store', (data) => {
      console.log('extra-data-updated', data);
    });
    socket.on('endcall/' + screenRoomId + '/customer', (data) => {
      console.log('extra-data-updated123', data);
    });
  };

  const onMessageScreenEvent = (data) => {
    if (data?.message?.type === 'offer') {
      //joinCall(data);
    }
  };

  const connectScreenSocket = () => {
    let parameters =
      '?userid=' +
      Math.floor(100000 + Math.random() * 900000) +
      '&sessionid=httpsmeetproglintcomcustomer' +
      screenRoomId +
      '&msgEvent=screen-sharing-demo&socketCustomEvent=RTCMultiConnection-Custom-Message&autoCloseEntireSession=false&maxParticipantsAllowed=1000&extra=%7B%7D&EIO=4&transport=websocket';
    console.log('1212121', parameters);
    // socketScreen = io.connect(
    //   'https://devsocket-rtc.proglint.com' + parameters,
    //   {
    //     path: '/socket.io',
    //     transports: ['websocket'],
    //   },
    // );
    socketScreen = io.connect('https://devsocket-meet.proglint.com', {
      path: '/socket.io',
      transports: ['websocket'],
    });
    socketScreen.on('connect', (connection) => {
      console.log('APP connectScreenSocket RTC');
      screenEmit();
    });
    socketScreen.on('screen/' + screenRoomId + '/store', (data) => {
      console.log('user-screen-share', data);
    });
    socketScreen.on('user-connected', (data) => {
      console.log('user-connected', data);
    });
    socketScreen.on('screen-sharing-demo', (data) => {
      console.log('ONsaravananScreenEMIT', data);
    });
  };
  // socketScreen.on('endcall/' + screenRoomId + '/store', (data) => {
  //   console.log('endCall', data);
  // });
  // socketScreen.on('endcall/' + screenRoomId + '/customer', (data) => {
  //   console.log('endCall123', data);
  // });
  const screenEmit = () => {
    socketScreen.emit(
      'join-room',
      {
        sessionid: screenRoomId,
        userid: screenRoomId + '121',
        msgEvent: 'screen-sharing-demo',
        socketCustomEvent: 'RTCMultiConnection-Custom-Message',
        autoCloseEntireSession: true,
        maxParticipantsAllowed: 1000,
        transports: ['websocket'],
        session: {
          screen: true,
          oneway: true,
        },
        mediaConstraints: {
          audio: {
            mandatory: {},
            optional: [],
          },
          video: {
            mandatory: {},
            optional: [
              {
                facingMode: 'user',
              },
            ],
          },
          password: '',
          extra: {},
          streams: [],
          SdpConstraints: {
            mandatory: {
              OfferToReceiveAudio: true,
              OfferToReceiveVideo: true,
            },
            optional: [
              {
                VoiceActivityDetection: false,
              },
            ],
          },
        },
      },
      (data) => {
        console.log('JOIN-ROOM SCREEN', data);
        if (data) {
          afterscreen();
        }
      },
    );
  };

  const afterscreen = () => {
    let screenObj = {
      remoteUserId: screenRoomId,
      message: {
        newParticipationRequest: true,
        isOneWay: true,
        isDataOnly: false,
        localPeerSdpConstraints: {
          OfferToReceiveAudio: false,
          OfferToReceiveVideo: true,
        },
        remotePeerSdpConstraints: {
          OfferToReceiveAudio: false,
          OfferToReceiveVideo: false,
        },
      },
      sender: newRoomID,
    };
    console.log(' screen-sharing-demo obj', screenObj);

    socketScreen.emit('screen-sharing-demo', screenObj, (data) => {
      console.log('EMIT - screen-sharing-demo', data);
    });
  };

  const joinCall = async (Screenoffer) => {
    const StreamlocalPC = new RTCPeerConnection(configuration);
    StreamlocalPC.addStream(localStream);

    StreamlocalPC.onicecandidate = (e) => {
      if (!e.candidate) {
        console.log('Got final candidate!');
        return;
      }
    };

    StreamlocalPC.onaddstream = (e) => {
      if (e.stream && remoteStream !== e.stream) {
        console.log('RemotePC received the Screen stream join', e.stream);
        setRemoteScreenStream(e.stream);
      }
    };

    if (Screenoffer?.message?.type === 'offer') {
      await StreamlocalPC.setRemoteDescription(
        new RTCSessionDescription(Screenoffer.message),
      );
    }
    // const offer = roomSnapshot.data().offer;

    const answer = await StreamlocalPC.createAnswer();
    await StreamlocalPC.setLocalDescription(answer);

    console.log('saravanann screen share', answer);
    socketScreen.emit('screen-sharing-demo', answer, async (data) => {
      console.log('emit screen share');
    });
  };

  const startCall = async () => {
    console.log('STARTCAL2!sara', newlocalstream);
    if (!newlocalstream) {
      console.warn('Local stream not initialized');
      return;
    }
   
    const localPC = new RTCPeerConnection(configuration);
    try{
      newlocalstream.getTracks().forEach(track => {
        localPC.addTrack(track, newlocalstream);
  });
    } catch (err){
      console.log('PEER ERROR', err)
    }
    
    
    let offer;
    try {
      offer = await localPC.createOffer();
      console.log('LOCALOFFER', offer);
      try {
        await localPC.setLocalDescription(offer);
      } catch (err) {
        console.log('ERROR01', err);
      }
    } catch (error) {
      console.log('ERROR', error);
    }

    let newOffer = {
      remoteUserId: remoteUserId,
      message: {
        type: 'offer',
        sdp: offer.sdp,
        remotePeerSdpConstraints: {
          OfferToReceiveAudio: true,
          OfferToReceiveVideo: true,
        },
        dontGetRemoteStream: false,
        renegotiatingPeer: false,
        connectionDescription: {
          remoteUserId: remoteUserId,
          message: {
            newParticipationRequest: true,
            isOneWay: false,
            isDataOnly: false,
            localPeerSdpConstraints: {
              OfferToReceiveAudio: true,
              OfferToReceiveVideo: true,
            },
            remotePeerSdpConstraints: {
              OfferToReceiveAudio: true,
              OfferToReceiveVideo: true,
            },
          },
          sender: newRoomID,
        },
      },
      sender: newRoomID,
    };
    console.log('offer', newOffer);
    socket.emit('video-conference-demo', newOffer, (data) => {
      console.log('OFFER-conference-demo----', data);
    });

    localPC.onicecandidate = (e) => {
      if (!e.candidate) {
        console.log('Got final candidate!', e);
        return;
      }

      let candidate01 = {
        remoteUserId: remoteUserId,
        message: {
          candidate: e.candidate.candidate,
          sdpMLineIndex: e.candidate.sdpMLineIndex,
          sdpMid: e.candidate.sdpMid,
        },
        sender: newRoomID,
      };
      console.log('saraVIKI', candidate01);

      socket.emit('video-conference-demo', candidate01, (data) => {
        console.log('candidate', data);
      });

      //callerCandidatesCollection.add(e.candidate.toJSON());
    };
    socket.on('endcall/' + screenRoomId + '/store', (data) => {
      console.log('endCall!!!', data);
    });
    socket.on('endcall/' + screenRoomId + '/customer', (data) => {
      console.log('endCall321', data);
    });

    socket.on('video-conference-demo', async (data) => {
      if (
        !localPC.currentRemoteDescription &&
        data?.message?.type &&
        data?.message?.type === 'answer'
      ) {
        console.log('LISTEN answer', data);
        const rtcSessionDescription = new RTCSessionDescription(data?.message);
        console.log('LISTEN rtcSessionDescription', rtcSessionDescription);

        await localPC.setRemoteDescription(rtcSessionDescription);
      }
      if (data.message?.candidate) {
        console.log('candidate answer', data.message);

        await localPC.addIceCandidate(new RTCIceCandidate(data.message));
      }
    });

    localPC.onaddstream = (e) => {
      console.log('ADDDSTREAM', e);
      if (e.stream && remoteStream !== e.stream) {
        console.log('RemotePC received the stream call', e.stream.toURL());
        setRemoteStream(e.stream);
        console.log('SSSSS__---', localPC._localStreams);
      }
    };

    setCachedLocalPC(localPC);
  };

  const switchOFF = () => {
    console.log('switchoff');
    localStream.getVideoTracks().forEach((track) => {
      console.log('switchoff', track);
      track._enabled = !track._enabled;
    });
  };
  const onMessageEvent = (data) => {
    console.log('onMessageEvent123', data);
    console.log('onMessageEventqqq', data.message.userLeft);

    if (data.message.userLeft) {
      // Actions.pop();
      navigation.pop();
      localStream.getVideoTracks().forEach((track) => {
        track._enabled = !track._enabled;
        // onBackPress();
      });
    }

    if (data.sender) {
      remoteUserId = data.sender;
    }

    if (data.message.newParticipationRequest) {
      remoteUserId = data.sender;
      setremoteID(data.sender);

      userPref(data);
    }

    if (data?.message?.readyForOffer) {
      //startCall('123');
    }

    if (data?.message?.candidate) {
      candidate = {
        candidate: data?.message?.candidate,
        sdpMLineIndex: data?.message?.sdpMLineIndex,
      };
    }

    // if (data?.message?.userLeft) {
    //   localStream?.getVideoTracks()?.forEach((track) => {
    //     track._enabled = !track._enabled;
    //   });

    //   if (cachedLocalPC) {
    //     cachedLocalPC.removeStream(localStream);
    //     cachedLocalPC.close();
    //   }
    //   setLocalStream();
    //   setRemoteStream();
    //   setCachedLocalPC();
    //   Alert.alert(
    //     'Call Ended',
    //     'Call Duration is 01:00:00',
    //     [
    //       {
    //         text: 'ok',
    //         onPress: () => {},
    //         style: 'destructive',
    //       },
    //     ],
    //     {cancelable: false},
    //   );
    //   Actions.pop();
    //   // cleanup
    // }
  };

  const userPref = (data) => {
    let userPreferences = {
      extra: {},
      localPeerSdpConstraints: {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true,
      },
      remotePeerSdpConstraints: {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true,
      },
      isOneWay: true,
      isDataOnly: true,
      connectionDescription: data,
      dontAttachLocalStream: false,
      dontGetRemoteStream: false,
    };
    let obj = {
      remoteUserId: data.sender,
      message: {enablemedia: true, userPreferences},
      sender: newRoomID,
    };

    console.log('FIRST EMIT AFTER ADMIN ATTEND', obj);
    socket.emit('video-conference-demo', obj);
  };

  const joinRoom = (async) => {
    //socket.emit('call_request', { roomId:newRoomID })
    socket.emit(
      'open-room',
      {
        sessionid: newRoomID,
        userid: newRoomID,
        msgEvent: 'video-conference-demo',
        socketCustomEvent: 'RTCMultiConnection-Custom-Message',
        autoCloseEntireSession: true,
        maxParticipantsAllowed: 1000,
        transports: ['websocket'],
      },
      (data, extra) => {
        console.log('AFTER OPEN-ROOM------', data);
        if (data) {
          const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              url: 'call_request',
              data: {roomId: newRoomID, name: "saravanan"},
            }),
          };
          fetch(
            'https://devsocket-meet.proglint.com/api/socket',
            requestOptions,
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            });
        }
      },
    );
    socket.emit('extra-data-updated', {});
  };

  const _renderTransparentLoading = () => {
    if (!remoteStream) {
      return (
        <View style={styles.transparentLoader}>
          <Loading dimOpacity={true} />
        </View>
      );
    } else {
      return null;
    }
  };

  const switchCamera = () => {
    localStream.getVideoTracks().forEach((track) => {
      console.log('121212', track);
      track._switchCamera();
    });
  };

  // Mutes the local's outgoing audio
  const toggleMute = () => {
    console.log('zxcvb', remoteStream);
    if (!remoteStream) {
      return;
    }
    localStream.getAudioTracks().forEach((track) => {
      console.log('TRACKKKK', track);
      // console.log(track._enabled ? 'muting' : 'unmuting', ' local track', track);
      track._muted = !track._muted;
      track._enabled = !track._enabled;
      setIsMuted(!track._enabled);
    });
  };

  const renderLocal = () => {
    if (localStream || remoteStream) {
      // setTimeout(() => {
      return (
        <RTCView
          objectFit={'cover'}
          style={remoteStream ? styles.view1 : styles.view2}
          streamURL={localStream && localStream.toURL()}
          zOrder={1}
        />
      );
      // }, 1000);
    } else {
      <View style={styles.view1}>
        <Text style={{color: 'white'}}>User</Text>
      </View>
    }
  };

  const renderScreenShare = () => {
    if (remoteScreenStream) {
      return (
        <RTCView
          objectFit={'cover'}
          style={styles.view1}
          streamURL={remoteScreenStream && remoteScreenStream.toURL()}
        />
      );
    }
  };

  const renderRemote = () => {
    if (remoteStream) {
      return (
        <View
          style={[
            {
              backgroundColor: 'black',
              borderColor: 'black',
              flex: 1,
              borderWidth: 5,
              borderRadius: 20,
            },
          ]}>
          <RTCView
            objectFit="cover"
            style={[{flex: 1, backgroundColor: 'red'}]}
            streamURL={remoteStream && remoteStream.toURL()}
            zOrder={Z_INDEX}
          />
        </View>
        // <RTCView
        //   objectFit={'cover'}
        //   style={{
        //     flex: 1,
        //     width: '100%',
        //     height: '100%',
        //     zIndex: 2,
        //     alignItems: 'stretch',
        //   }}
        //   streamURL={remoteStream && remoteStream.toURL()}
        // />
      );
    } else {
      return null;
    }
  };

  return (
    <View>
      <View
        style={{
          display: 'flex',
          flex: 1,
          // padding: 10,
          backgroundColor: 'black',
        }}>
        {renderRemote()}
        {renderLocal()}
        {/* <View style={styles.callButtons}>
          <View styles={styles.buttonContainer}>
            <Button title="Click to stop call" onPress={onBackPress} />
          </View>
          <View styles={styles.buttonContainer}>
            {!localStream && (
              <Button
                title="Click to start stream"
                onPress={startLocalStream}
              />
            )}

            <Button title="Click to start screen" onPress={screenEmit} />
            {localStream && (
              <Button
                title="Click to start call"
                onPress={() => startCall()}
                disabled={!!remoteStream}
              />
            )}
          </View>
        </View>
        <Button title="off" onPress={switchOFF} />

        <Button title="AfterScreen" onPress={afterscreen} />
        {remoteStream || !isScreenView ? (
          <View style={styles.rtcview}>
            <RTCView
              objectFit={'cover'}
              streamURL={remoteStream && remoteStream.toURL()}
              style={styles.rtc}
            />
          </View>
        ) : null}

        {/* {isScreenView ? (
          <View style={styles.rtcview}>
            <RTCView
              objectFit={'cover'}
              streamURL={remoteStream && remoteStream.toURL()}
              style={styles.rtc}
            />
          </View>
        ) : null} */}

        {/* <View style={remoteStream ? styles.rtcview11 : styles.rtcview}>
          {remoteStream && (
            <RTCView
              objectFit={'cover'}
              style={styles.rtc}
              streamURL={remoteStream && remoteStream.toURL()}
            />
          )}
          <View style={styles.localView}>
        <View style={remoteStream ? styles.rtcview11 : styles.rtcview}>
      <View>
            <Image
              style={{
                height: wp('14%'),
                width: wp('14%'),
                alignSelf: 'center',
                alignContent: 'center',
                alignItems: 'center',
                tintColor: 'white',
              }}
              source={require('../app/assets/images/default.png')}
              resizeMode="contain"
            />
          </View>
      {localStream && (
            <RTCView
              objectFit={'cover'}
              style={styles.rtc}
              streamURL={localStream && localStream.toURL()}
            />
          )}
      </View>
      </View> */}

        {/* <RTCView
            objectFit={'cover'}
            style={remoteStream ? styles.rtcview : styles.rtc}
            streamURL={localStream && localStream.toURL()}
          /> */}
        {/* {!localStream && (
            <View>
              <View
                style={{
                  borderWidth: 1.5,
                  backgroundColor: 'white',
                  width: wp('15%'),
                  height: wp('15%'),
                  borderRadius: wp('15') / 2,
                  //   marginLeft: wp('2%'),
                  justifyContent: 'center',
                }}>
                <Image
                  style={{
                    height: wp('10%'),
                    width: wp('10%'),
                    alignSelf: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    //   marginHorizontal: wp('4%'),
                    // backgroundColor: Constants.COLOR.FONT_WHITE_COLOR,
                  }}
                  source={require('../app/assets/images/microphone.png')}
                  resizeMode="contain"
                />
              </View>
            </View>
          )} */}
        {/* </View> */}
      </View>
      {_renderTransparentLoading()}
      <View
        style={{
          backgroundColor: 'black',
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}>
        <View>
          <TouchableOpacity
            onPress={() => {
              setIsMuted(!isMuted);
              toggleMute();
            }}>
            <View
              style={{
                borderWidth: 1.5,
                backgroundColor: 'white',
                width: wp('10%'),
                height: wp('10%'),
                borderRadius: wp('10%') / 2,
                // marginLeft: wp('2%'),
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  height: wp('4%'),
                  width: wp('4%'),
                  alignSelf: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  //   marginHorizontal: wp('4%'),
                  // backgroundColor: Constants.COLOR.FONT_WHITE_COLOR,
                }}
                source={
                  isMuted
                    ? require('../app/assets/images/mute.png')
                    : require('../app/assets/images/microphone.png')
                }
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              dispatch(
                callEnd(screenRoomId, (callBack) => {
                  onBackPress();
                  localStream.getVideoTracks().forEach((track) => {
                    track._enabled = !track._enabled;
                    // onBackPress();
                  });
                  // connectScreenSocket();
                }),
              );
            }}>
            <View
              style={{
                borderWidth: 1.5,
                backgroundColor: 'red',
                width: wp('10%'),
                height: wp('10%'),
                borderRadius: wp('10') / 2,
                //   marginLeft: wp('2%'),
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  height: wp('4%'),
                  width: wp('4%'),
                  alignSelf: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  tintColor: 'white',
                  //   marginHorizontal: wp('4%'),
                  // backgroundColor: Constants.COLOR.FONT_WHITE_COLOR,
                }}
                source={require('../app/assets/images/dial.png')}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              localStream.getVideoTracks().forEach((track) => {
                console.log('localTrack', track._enabled);
                track._enabled = !track._enabled;
              });
              setShowVideo(!isShowVideo);
              // switchCamera();
            }}>
            <View
              style={{
                borderWidth: 1.5,
                backgroundColor: 'white',
                width: wp('10%'),
                height: wp('10%'),
                borderRadius: wp('10') / 2,
                //   marginLeft: wp('2%'),
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  height: wp('4%'),
                  width: wp('4%'),
                  alignSelf: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  //   marginHorizontal: wp('4%'),
                  // backgroundColor: Constants.COLOR.FONT_WHITE_COLOR,
                }}
                source={
                  isShowVideo
                    ? require('../app/assets/images/hideVideo.png')
                    : require('../app/assets/images/video.png')
                }
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              // startCall();
              rbSheet.open();
            }}>
            <View
              style={{
                borderWidth: 1.5,
                backgroundColor: 'white',
                width: wp('10%'),
                height: wp('10%'),
                borderRadius: wp('10%') / 2,
                //   marginLeft: wp('2%'),
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  height: wp('4%'),
                  width: wp('4%'),
                  alignSelf: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  //   marginHorizontal: wp('4%'),
                  // backgroundColor: Constants.COLOR.FONT_WHITE_COLOR,
                }}
                source={require('../app/assets/images/chat.png')}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => {
              joinCall();
            }}>
            <View
              style={{
                borderWidth: 1.5,
                backgroundColor: 'white',
                width: wp('15%'),
                height: wp('15%'),
                borderRadius: wp('15') / 2,
                //   marginLeft: wp('2%'),
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  height: wp('8%'),
                  width: wp('8%'),
                  alignSelf: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  //   marginHorizontal: wp('4%'),
                  // backgroundColor: Constants.COLOR.FONT_WHITE_COLOR,
                }}
                source={require('../app/assets/images/chat.png')}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity> */}
        </View>
      </View>
      {renderRBSheet()}
    </View>
  );
};

export default CallJoinScreen;

const styles = StyleSheet.create({
  heading: {
    alignSelf: 'center',
    fontSize: 30,
  },
  rtcview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    margin: 5,
  },
  rtc: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  toggleButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  transparentLoader: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  callButtons: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    margin: 5,
  },
  rtcview11: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    backgroundColor: 'black',
    width: wp('40%'),
    borderColor: 'white',
    borderWidth: 1,
  },
  view1: {
    backgroundColor: 'black',
    position: 'absolute',
    borderRadius: 10,
    left: wp('55%'),
    top: '60%',
    width: '40%',
    height: '28%',
    overflow: 'hidden',
    zIndex: 2,
    elevation: Platform.OS === 'android' ? 50 : 0,
  },
  view2: {
    width: '100%',
    height: '100%',
  },
});
