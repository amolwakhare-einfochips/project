import { useEffect, useRef, useMemo } from 'react';
import { useWebRTCPreview } from '../../../features/webrtc-room/hooks/useWebRTCPreview';
import { browserMediaAdapter } from '../../../shared/webrtc/browserMediaAdapter';
import { useWebRTCConnection } from '../../../features/webrtc-room/hooks/useWebRTCConnection';
import { BrowserWebSocketClient } from '../../../shared/webrtc/realtime/browserWebSocketClient';

export default function WebRTCRoomPage() {
  const wsClient = useMemo(() => {
    return new BrowserWebSocketClient('ws://localhost:3001');
  }, []);

  const {
    connectionState,
    remoteState,
    remoteStream,
    connect,
    disconnect,
  } = useWebRTCConnection(wsClient, 'room-1');

  const { state, stream, error, startPreview, stopPreview } =
    useWebRTCPreview(browserMediaAdapter);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <div className="p-4 text-white">
      
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Realtime Room</h1>

        <div className="flex gap-2">
          {connectionState === 'connected' && (
            <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-xs">
              Connected
            </span>
          )}

          {state === 'running' && (
            <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-xs">
              Stream Active
            </span>
          )}
        </div>
      </div>

      {/* 🎛 CONTROLS */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={startPreview}
          disabled={state !== 'idle'}
          className="px-4 py-2 bg-slate-800 border border-slate-600 rounded hover:bg-slate-700 disabled:opacity-50"
        >
          ▶ Start Preview
        </button>

        <button
          onClick={stopPreview}
          disabled={state !== 'running'}
          className="px-4 py-2 bg-slate-800 border border-slate-600 rounded hover:bg-slate-700 disabled:opacity-50"
        >
          ■ Stop
        </button>

        <button
          onClick={connect}
          disabled={connectionState !== 'idle'}
          className="px-4 py-2 bg-slate-800 border border-slate-600 rounded hover:bg-slate-700 disabled:opacity-50"
        >
          🔗 Connect
        </button>

        <button
          onClick={disconnect}
          disabled={connectionState !== 'connected'}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 disabled:opacity-50"
        >
          ⛔ Disconnect
        </button>
      </div>

      {/*  VIDEO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/*  LOCAL VIDEO */}
        <div className="relative rounded-2xl h-72 flex items-center justify-center overflow-hidden
          bg-gradient-to-br from-slate-900 to-slate-800 border border-green-500/30">

          {stream ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center text-green-400">
              <div className="text-4xl mb-2">👤</div>
              <div>Local Preview</div>
            </div>
          )}

          <div className="absolute bottom-2 left-2 text-xs bg-black/70 px-2 py-1 rounded">
            Local • 720p
          </div>
        </div>

        {/*  REMOTE VIDEO */}
        <div className="relative rounded-2xl h-72 flex items-center justify-center overflow-hidden
          bg-gradient-to-br from-slate-900 to-green-900 border border-green-500/30">

          {remoteStream ? (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center text-green-400">
              <div className="text-4xl mb-2">🙂</div>
              <div>Remote Stream</div>
            </div>
          )}

          <div className="absolute bottom-2 left-2 text-xs bg-black/70 px-2 py-1 rounded">
            Remote • {remoteState === 'receiving' ? 'Receiving' : 'Idle'}
          </div>
        </div>
      </div>

      {state === 'error' && (
        <div className="mt-3 text-red-500">
          {error || 'Camera access failed'}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-400">
        Preview: <strong>{state}</strong>
      </div>

      <div className="text-sm text-gray-400">
        Connection: <strong>{connectionState}</strong>
      </div>

      <div className="text-sm text-gray-400">
        Remote: <strong>{remoteState}</strong>
      </div>

      {/*  MOCK LOG PANEL */}
      <div className="mt-6 bg-black rounded-xl p-4 text-sm text-green-400">
        <div className="mb-2">WebSocket Event Log</div>
        <div>JOINED User_1</div>
        <div>TRACK Remote video track received</div>
        <div>PING Socket alive</div>
      </div>
    </div>
  );
}