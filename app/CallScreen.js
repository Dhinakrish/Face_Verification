import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, Button, View, ActivityIndicator} from 'react-native';
import io from 'socket.io-client';
import {
  RTCPeerConnection,
  RTCView,
  mediaDevices,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';
import {db} from '../utilities/firebase';
let socket;
let tempObj = {};
let sdp = '';
const configuration = {
  iceServers: [
    {
      urls: 'turn:54.211.48.234:3478',

      username: 'proglintturn',

      credential: 'proglintturn@2022',
    },
  ],
  iceCandidatePoolSize: 10,
};
let remoteUserId;
let senderId;
let connectionDescriptiondata = {};
let newRoomID = Math.floor(100000 + Math.random() * 900000);
let candidate = {};
export default function CallScreen({setScreen, screens, roomId}) {
  function onBackPress() {
    if (cachedLocalPC) {
      cachedLocalPC.removeStream(localStream);
      cachedLocalPC.close();
    }
    setLocalStream();
    setRemoteStream();
    setCachedLocalPC();
    // cleanup
  }

  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [cachedLocalPC, setCachedLocalPC] = useState();
  const [remoteID, setremoteID] = useState();
  const [isMuted, setIsMuted] = useState(false);
  const [isFullLoading, setFullLoading] = useState(false);

  let roomID = '3c1a7884-da81-4b53-85de-1f8e987c55f7';
  useEffect(() => {
    connectSocket();
  }, []);

  const startLocalStream = async () => {
    joinRoom();
    // isFront will determine if the initial camera should face user or environment
    const isFront = true;
    const devices = await mediaDevices.enumerateDevices();

    const facing = isFront ? 'front' : 'environment';
    const videoSourceId = devices.find(
      (device) => device.kind === 'videoinput' && device.facing === facing,
    );
    const facingMode = isFront ? 'user' : 'environment';
    const constraints = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 500, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode,
        optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
      },
    };
    const newStream = await mediaDevices.getUserMedia(constraints);
    setLocalStream(newStream);
  };

  const _renderTransparentLoading = () => {
    if (isFullLoading) {
      return (
        <View
          style={{
            position: 'relative',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}>
          <ActivityIndicator
            animating={isFullLoading}
            color={'Black'}
            size="large"
            style={{width: 80, height: 80}}
          />
        </View>
      );
    } else {
      return null;
    }
  };
  const connectSocket = () => {
    let parameters =
      '?userid=' +
      newRoomID +
      '&sessionid=httpsmeetproglintcomcustomer' +
      newRoomID +
      '&msgEvent=video-conference-demo&socketCustomEvent=RTCMultiConnection-Custom-Message&autoCloseEntireSession=true&maxParticipantsAllowed=1000&extra={}';
    socket = io.connect('https://socket-rtc.proglint.com' + parameters, {
      path: '/socket.io',
      transports: ['websocket'],
    });
    socket.on('connect', (connection) => {
      console.log('APP CONNECTED RTC');
    });
    //video-conference-demo
    socket.on('video-conference-demo', (data) => {
      onMessageEvent(data);
    });
    socket.on('user-connected', (data) => {
      console.log('USER-CONNECTED');
    });
    socket.on('extra-data-updated', (data) => {
      console.log('extra-data-updated', data);
    });
  };

  const onMessageEvent = (data) => {
    console.log('onMessageEvent', data);
    if (data.message.newParticipationRequest) {
      remoteUserId = data.sender;
      setremoteID(data.sender);

      userPref(data);
    }

    if (data?.message?.readyForOffer) {
      startCall();
    }

    if (data?.message?.candidate) {
      candidate = {
        candidate: data?.message?.candidate,
        sdpMLineIndex: data?.message?.sdpMLineIndex,
      };
    }

    if (data?.message?.userLeft) {
      if (cachedLocalPC) {
        cachedLocalPC.removeStream(localStream);
        cachedLocalPC.close();
      }
      setLocalStream();
      setRemoteStream();
      setCachedLocalPC();
      // cleanup
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
        if (data && !remoteUserId) {
          const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              url: 'call_request',
              data: {roomId: newRoomID, name: 'saravanan'},
            }),
          };
          fetch('https://socket-meet.proglint.com/api/socket', requestOptions)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            });
        }
      },
    );
    socket.emit('extra-data-updated', {});
  };
  const startCall = async (id) => {
    const localPC = new RTCPeerConnection(configuration);
    localPC.addStream(localStream);

    const offer = await localPC.createOffer();
    console.log('LOCALOFFER', offer);
    await localPC.setLocalDescription(offer);

    let newOffer = {
      remoteUserId: remoteID,
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
          remoteUserId: remoteID,
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
        remoteUserId: remoteID,
        message: {
          candidate: e.candidate.candidate,
          sdpMLineIndex: e.candidate.sdpMLineIndex,
          sdpMid: e.candidate.sdpMid,
        },
        sender: newRoomID,
      };
      console.log('candidate', candidate01);

      socket.emit('video-conference-demo', candidate01, (data) => {
        console.log('candidate', data);
      });

      //callerCandidatesCollection.add(e.candidate.toJSON());
    };

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
      }
    };

    setCachedLocalPC(localPC);
  };


  const switchCamera = () => {
    localStream.getVideoTracks().forEach((track) => track._switchCamera());
  };

  // Mutes the local's outgoing audio
  const toggleMute = () => {
    if (!remoteStream) {
      return;
    }
    localStream.getAudioTracks().forEach((track) => {
      // console.log(track.enabled ? 'muting' : 'unmuting', ' local track', track);
      track.enabled = !track.enabled;
      setIsMuted(!track.enabled);
    });
  };

  return (
    <>
      <Text style={styles.heading}>Call Screen</Text>
      <Text style={styles.heading}>Room : {roomId}</Text>
      {_renderTransparentLoading()}
      <View style={styles.callButtons}>
        <View styles={styles.buttonContainer}>
          <Button title="Click to stop call" onPress={onBackPress} />
        </View>
        <View styles={styles.buttonContainer}>
          {!localStream && (
            <Button title="Click to start stream" onPress={startLocalStream} />
          )}
          {localStream && (
            <Button
              title="Click to start call"
              onPress={() => startCall(roomId)}
              disabled={!!remoteStream}
            />
          )}
        </View>
      </View>

      {localStream && (
        <View style={styles.toggleButtons}>
          <Button title="Switch camera" onPress={switchCamera} />
          <Button
            title={`${isMuted ? 'Unmute' : 'Mute'} stream`}
            onPress={toggleMute}
            disabled={!remoteStream}
          />
        </View>
      )}

      <View style={{display: 'flex', flex: 1, padding: 10}}>
        <View style={styles.rtcview}>
          {localStream && (
            <RTCView
              style={styles.rtc}
              streamURL={localStream && localStream.toURL()}
            />
          )}
        </View>
        <View style={styles.rtcview}>
          {remoteStream && (
            <RTCView
              style={styles.rtc}
              streamURL={remoteStream && remoteStream.toURL()}
            />
          )}
        </View>
      </View>
    </>
  );
}

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
  callButtons: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    margin: 5,
  },
});
