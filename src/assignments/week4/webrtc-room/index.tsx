import { useMemo, useCallback } from "react";
import { useWebRTCPreview } from "../../../features/webrtc-room/hooks/useWebRTCPreview";
import { browserMediaAdapter } from "../../../shared/webrtc/browserMediaAdapter";
import { useWebRTCConnection } from "../../../features/webrtc-room/hooks/useWebRTCConnection";

import { MockWebSocketClient } from "../../../shared/webrtc/realtime/__mocks__/mockWebSocketClient";

import { VideoPanel } from "../../../shared/webrtc/component/VideoPanel";
import { WebRTCStatusBadge } from "../../../shared/webrtc/component/WebRTCStatusBadge";

export default function WebRTCRoomPage() {
  const wsClient = useMemo(() => {
    return new MockWebSocketClient();
  }, []);

  const { state, stream, error, startPreview, stopPreview } = useWebRTCPreview(browserMediaAdapter);

  const { connectionState, remoteState, remoteStream, connect, disconnect } = useWebRTCConnection(
    wsClient,
    "room-1",
    stream
  );

  // START PREVIEW
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
    <div className="min-h-screen bg-[#0b0f19] text-white px-3 sm:px-6 lg:px-10 py-4">
      <div className="w-full max-w-6xl mx-auto bg-[#111827] rounded-2xl p-4 sm:p-5 md:p-6 border border-slate-700">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
          <div className="text-sm text-gray-400">
            MD — {connectionState}, {remoteState === "idle" ? "No Remote" : remoteState}
          </div>

          <div className="flex flex-wrap gap-2">
            {connectionState === "connecting" && (
              <WebRTCStatusBadge label="Connecting..." type="warning" />
            )}

            {connectionState === "connected" && (
              <WebRTCStatusBadge label="Connected" type="success" />
            )}

            {state === "error" && <WebRTCStatusBadge label="Camera Error" type="error" />}
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 mb-4">
          <button
            onClick={handleStartPreview}
            disabled={state !== "idle"}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 rounded disabled:opacity-50"
          >
            ▶ Start Preview
          </button>

          <button
            onClick={handleStopPreview}
            disabled={state !== "running"}
            className="w-full sm:w-auto px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            ■ Stop
          </button>

          <button
            onClick={handleConnect}
            disabled={connectionState !== "idle"}
            className="w-full sm:w-auto px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            🔗 Connect
          </button>

          <button
            onClick={handleDisconnect}
            disabled={connectionState !== "connected"}
            className="w-full sm:w-auto px-4 py-2 bg-red-600 rounded disabled:opacity-50"
          >
            ⛔ Disconnect
          </button>
        </div>

        {/* VIDEO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <VideoPanel
            stream={stream}
            label="Idle — preview not started"
            subLabel="Local • 720p"
            isLocal
            error={state === "error" ? error : null}
          />

          <VideoPanel
            stream={remoteStream}
            label="Waiting for remote..."
            subLabel={`Remote • ${remoteState === "receiving" ? "Receiving" : "Idle"}`}
            error={
              connectionState === "error"
                ? "Socket connection failed"
                : remoteState === "disconnected"
                  ? "Remote track unavailable"
                  : null
            }
          />
        </div>

        {/* LOG PANEL */}
        <div className="mt-4 bg-black rounded-xl p-4 text-sm text-green-400 max-h-40 overflow-y-auto">
          <div className="mb-2 text-gray-300">WebSocket Event Log</div>

          <div>SOCKET Connecting to signaling...</div>

          <div>SOCKET Socket opened</div>
        </div>

        {/* FOOTER */}
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="bg-yellow-600/20 px-2 py-1 rounded">connecting</span>

          <span className="bg-gray-600/20 px-2 py-1 rounded">preview idle</span>

          <span className="bg-gray-600/20 px-2 py-1 rounded">no remote</span>
        </div>
      </div>
    </div>
  );
}
