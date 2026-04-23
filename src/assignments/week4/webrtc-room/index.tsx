import { useMemo, useCallback } from 'react';
import { useWebRTCPreview } from '../../../features/webrtc-room/hooks/useWebRTCPreview';
import { browserMediaAdapter } from '../../../shared/webrtc/browserMediaAdapter';
import { useWebRTCConnection } from '../../../features/webrtc-room/hooks/useWebRTCConnection';
import { BrowserWebSocketClient } from '../../../shared/webrtc/realtime/browserWebSocketClient';
import { VideoPanel } from '../../../shared/webrtc/components/VideoPanel';
import { WebRTCStatusBadge } from '../../../shared/webrtc/components/WebRTCStatusBadge';

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

  const handleStartPreview = useCallback(() => {
    startPreview();
  }, [startPreview]);

  const handleStopPreview = useCallback(() => {
    stopPreview();
  }, [stopPreview]);

  const handleConnect = useCallback(() => {
    connect();
  }, [connect]);

  const handleDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <div className="p-6 bg-[#0b0f19] min-h-screen text-white">
      <div className="bg-[#111827] rounded-2xl p-4 border border-slate-700">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm text-gray-400">
            MD — {connectionState}, {remoteState === 'idle' ? 'No Remote' : remoteState}
          </div>

          <div className="flex gap-2">
            {connectionState === 'connecting' && (
              <WebRTCStatusBadge label="Connecting..." type="warning" />
            )}
            {connectionState === 'connected' && (
              <WebRTCStatusBadge label="Connected" type="success" />
            )}
            {state === 'error' && (
              <WebRTCStatusBadge label="Camera Error" type="error" />
            )}
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={handleStartPreview}
            disabled={state !== 'idle'}
            className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50"
          >
            ▶ Start Preview
          </button>

          <button
            onClick={handleStopPreview}
            disabled={state !== 'running'}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            ■ Stop
          </button>

          <button
            onClick={handleConnect}
            disabled={connectionState !== 'idle'}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            🔗 Connect
          </button>

          <button
            onClick={handleDisconnect}
            disabled={connectionState !== 'connected'}
            className="px-4 py-2 bg-red-600 rounded disabled:opacity-50"
          >
            ⛔ Disconnect
          </button>
        </div>

        {/* VIDEO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* LOCAL VIDEO */}
          <VideoPanel
            stream={stream}
            label="Idle — preview not started"
            subLabel="Local • 720p"
            isLocal
            error={state === 'error' ? error : null}
          />

          {/* REMOTE VIDEO */}
          <VideoPanel
            stream={remoteStream}
            label="Waiting for remote..."
            subLabel={`Remote • ${
              remoteState === 'receiving' ? 'Receiving' : 'Idle'
            }`}
            error={
              connectionState === 'error'
                ? 'Socket connection failed'
                : remoteState === 'disconnected'
                ? 'Remote track unavailable'
                : null
            }
          />
        </div>

        {/* LOG PANEL */}
        <div className="mt-4 bg-black rounded-xl p-4 text-sm text-green-400">
          <div className="mb-2 text-gray-300">WebSocket Event Log</div>
          <div>SOCKET Connecting to signaling...</div>
          <div>SOCKET Socket opened</div>
        </div>

        {/* FOOTER */}
        <div className="mt-3 flex gap-2 text-xs">
          <span className="bg-yellow-600/20 px-2 py-1 rounded">connecting</span>
          <span className="bg-gray-600/20 px-2 py-1 rounded">preview idle</span>
          <span className="bg-gray-600/20 px-2 py-1 rounded">no remote</span>
        </div>
      </div>
    </div>
  );
}