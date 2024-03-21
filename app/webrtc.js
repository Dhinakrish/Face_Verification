/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  StatusBar,
  Platform,
  Button
} from 'react-native';
import io from 'socket.io-client';
import {useDispatch} from 'react-redux';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
var socket;
let screenSchareRemoteUserId;

import {
  RTCPeerConnection,
  RTCView,
  mediaDevices,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';
import Loading from './components/UI/atoms/Loading';
const Z_INDEX = 10000;
import InCallManager from 'react-native-incall-manager';
import {callButton} from './redux/actions/SignInAction';
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
let newRoomID = '';
let candidate = {};
let screenRoomId;
const WebCall: () => React$Node = () => {
  const dispatch = useDispatch();
  function onBackPress() {
    switchOFF();
    if (cachedLocalPC) {
      cachedLocalPC.removeStream(localStream);
      cachedLocalPC.close();
    }
    // setLocalStream();
    // setRemoteStream();
    setCachedLocalPC();
   
    // Actions.pop();
    // cleanup
  }

  const [stream, setStream] = useState(null);
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

  useEffect(() => {
   
  }, []);


  useEffect(() => {
    // returned function will be called on component unmount
    return () => {
      //onBackPress();
    };
  }, []);

  const getLocalStream = async () => {


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

    setTimeout(() => {
        //emoteUserId = data;
        joinRoom();
      
    }, 2000);
    
  };




  const connectSocketMeet = () => {
    dispatch(
      callButton('saravanan', (callBack) => {
        screenRoomId = callBack.response.roomId;
        newRoomID = callBack.response.roomId;
        setScreenView(true);
        // dispatch(getChatList(callBack.response.roomId));
        connectSocket();
      }),
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
    socket.on('connect', () => {
      console.log('APP CONNECTED RTC');
      getLocalStream();
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

  const startCall = async () => {
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
        console.log('ERROR01---', err);
      }
    } catch (error) {
      console.log('ERROR----', error);
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
    console.log('offer------------------', newOffer);
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

  const joinRoom = () => {
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
      (data) => {
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


  const renderRemote = () => {
    if (localStream) {
      return (

          <RTCView
            style={[{ flex: 1,
              display: 'flex',
              backgroundColor: '#4F4',}]}
            streamURL={localStream && localStream.toURL()}
          
          />
       
      );
    } else {
      return null;
    }
  };

  const start = async () => {
    connectSocketMeet();
    // connectSocket();
    InCallManager.start({media: 'video'});
    InCallManager.setForceSpeakerphoneOn(true);
    console.log('start');
    // if (!stream) {
    //   let s;
    //   try {
    //     s = await mediaDevices.getUserMedia({ video: true });
    //     setStream(s);
    //   } catch(e) {
    //     console.error(e);
    //   }
    // }
  };
  const stop = () => {
    console.log('stop');
    if (stream) {
      stream.release();
      setStream(null);
    }
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.body}>
      {
        remoteStream &&
          <RTCView
            streamURL={remoteStream.toURL()}
            style={styles.stream} />
      }

        <View
          style={styles.footer}>
          <Button
            title = "Start"
            onPress = {start} />
          <Button
            title = "Stop"
            onPress = {stop} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    ...StyleSheet.absoluteFill
  },
  stream: {
    flex: 1
  },
  footer: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
});

export default WebCall;