import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useWebRTCPreview } from './hooks/useWebRTCPreview';

describe('useWebRTCPreview', () => {
  it('starts preview successfully', async () => {
    const mockStream = {
      getTracks: () => [],
    } as unknown as MediaStream;

    const adapter = {
      getStream: vi.fn().mockResolvedValue(mockStream),
      stopStream: vi.fn(),
    };

    const { result } = renderHook(() =>
      useWebRTCPreview(adapter)
    );

    await act(async () => {
      await result.current.startPreview();
    });

    expect(result.current.state).toBe('running');
    expect(result.current.stream).toBe(mockStream);
  });

  it('handles permission denied error', async () => {
    const adapter = {
      getStream: vi.fn().mockRejectedValue({
        name: 'NotAllowedError',
      }),
      stopStream: vi.fn(),
    };

    const { result } = renderHook(() =>
      useWebRTCPreview(adapter)
    );

    await act(async () => {
      await result.current.startPreview();
    });

    expect(result.current.state).toBe('error');
    expect(result.current.error).toBe('Camera permission denied');
  });

  it('stops all tracks when stopPreview is called', async () => {
    const stopSpy = vi.fn();

    const mockStream = {
      getTracks: () => [
        { stop: stopSpy },
        { stop: stopSpy },
      ],
    } as unknown as MediaStream;

    const adapter = {
      getStream: vi.fn().mockResolvedValue(mockStream),
      stopStream: vi.fn((stream: MediaStream) => {
        stream.getTracks().forEach((track: { stop: () => void }) =>
          track.stop()
        );
      }),
    };

    const { result } = renderHook(() =>
      useWebRTCPreview(adapter)
    );

    await act(async () => {
      await result.current.startPreview();
    });

    act(() => {
      result.current.stopPreview();
    });

    expect(stopSpy).toHaveBeenCalled();
  });

  it('stops tracks on unmount', async () => {
    const stopSpy = vi.fn();

    const mockStream = {
      getTracks: () => [
        { stop: stopSpy },
        { stop: stopSpy },
      ],
    } as unknown as MediaStream;

    const adapter = {
      getStream: vi.fn().mockResolvedValue(mockStream),
      stopStream: vi.fn((stream: MediaStream) => {
        stream.getTracks().forEach((track: { stop: () => void }) =>
          track.stop()
        );
      }),
    };

    const { result, unmount } = renderHook(() =>
      useWebRTCPreview(adapter)
    );

    await act(async () => {
      await result.current.startPreview();
    });

    unmount();

    expect(stopSpy).toHaveBeenCalled();
  });
});