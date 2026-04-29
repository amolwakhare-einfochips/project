import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useWebRTCConnection } from "./useWebRTCConnection";
import type { SignalMessage } from "../../../shared/webrtc/realtime/types";
import type { IWebSocketClient } from "../../../shared/webrtc/realtime/WebSocketClient";

class MockMediaStream {
  private tracks: MediaStreamTrack[] = [];

  addTrack(track: MediaStreamTrack) {
    this.tracks.push(track);
  }

  getTracks() {
    return this.tracks;
  }
}

(global as unknown as { MediaStream: typeof MediaStream }).MediaStream =
  MockMediaStream as unknown as typeof MediaStream;

function createMockClient(): IWebSocketClient & {
  simulateMessage: (msg: SignalMessage) => void;
} {
  let handler: ((msg: SignalMessage) => void) | null = null;

  return {
    connect: vi.fn(),
    disconnect: vi.fn(),
    send: vi.fn(),

    onMessage: vi.fn((cb: (msg: SignalMessage) => void) => {
      handler = cb;
    }),

    simulateMessage: (msg: SignalMessage) => {
      handler?.(msg);
    },
  };
}

describe("useWebRTCConnection", () => {
  it("connect calls connect and sends join message", () => {
    const client = createMockClient();

    const mockStream = new MediaStream();

    const { result } = renderHook(() => useWebRTCConnection(client, "room-1", mockStream));

    act(() => {
      result.current.connect();
    });

    expect(client.connect).toHaveBeenCalled();

    expect(client.send).toHaveBeenCalledWith({
      type: "join",
      roomId: "room-1",
    });
  });

  it("handles remote-track message and updates state", () => {
    const client = createMockClient();

    const mockStream = new MediaStream();

    const mockTrack = {
      kind: "video",
      stop: vi.fn(),
    } as unknown as MediaStreamTrack;

    mockStream.addTrack(mockTrack);

    const { result } = renderHook(() => useWebRTCConnection(client, "room-1", mockStream));

    act(() => {
      result.current.connect();
    });

    act(() => {
      client.simulateMessage({
        type: "remote-track",
        kind: "video",
      });
    });

    expect(result.current.remoteState).toBe("receiving");

    expect(result.current.remoteStream).not.toBeNull();
  });

  it("disconnect sends leave and resets state", () => {
    const client = createMockClient();

    const mockStream = new MediaStream();

    const { result } = renderHook(() => useWebRTCConnection(client, "room-1", mockStream));

    act(() => {
      result.current.connect();
    });

    act(() => {
      result.current.disconnect();
    });

    expect(client.send).toHaveBeenCalledWith({
      type: "leave",
      roomId: "room-1",
    });

    expect(client.disconnect).toHaveBeenCalled();

    expect(result.current.connectionState).toBe("idle");

    expect(result.current.remoteState).toBe("disconnected");
  });

  it("does not update state after unmount", () => {
    const client = createMockClient();

    const mockStream = new MediaStream();

    const { result, unmount } = renderHook(() => useWebRTCConnection(client, "room-1", mockStream));

    act(() => {
      result.current.connect();
    });

    unmount();

    act(() => {
      client.simulateMessage({
        type: "remote-track",
        kind: "video",
      });
    });

    expect(result.current.remoteState).not.toBe("receiving");
  });
});
