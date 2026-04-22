import { useEffect, useRef, useState } from 'react';
import type { IWebSocketClient } from '../../../shared/webrtc/realtime/WebSocketClient';
import type { ConnectionState, RemoteState } from '../../../shared/webrtc/types';
import type { SignalMessage } from '../../../shared/webrtc/realtime/types';

export function useWebRTCConnection(
  client: IWebSocketClient,
  roomId: string
) {
  const [connectionState, setConnectionState] =
    useState<ConnectionState>('idle');

  const [remoteState, setRemoteState] =
    useState<RemoteState>('idle');

  const [remoteStream, setRemoteStream] =
    useState<MediaStream | null>(null);

  const isActiveRef = useRef(true);

  useEffect(() => {
    return () => {
      isActiveRef.current = false;
      client.disconnect();
    };
  }, [client]);

  useEffect(() => {
    client.onMessage((msg: SignalMessage) => {
      if (!isActiveRef.current) return;

      switch (msg.type) {
        case 'CONNECTED':
          setConnectionState('connected');
          break;

        case 'ERROR':
          setConnectionState('error');
          break;

        case 'remote-track': {
          setRemoteState('receiving');

          const mockStream = new MediaStream();
          setRemoteStream(mockStream);

          break;
        }

        default:
          break;
      }
    });
  }, [client]);

  const connect = () => {
    if (connectionState !== 'idle') return;

    setConnectionState('connecting');
    setRemoteState('connecting');

    client.connect();

    client.send({
      type: 'join',
      roomId,
    });
  };

  const disconnect = () => {
    client.send({
      type: 'leave',
      roomId,
    });

    client.disconnect();

    setConnectionState('idle');
    setRemoteState('disconnected');
    setRemoteStream(null);
  };

  return {
    connectionState,
    remoteState,
    remoteStream,
    connect,
    disconnect,
  };
}