import { useEffect, useRef, useState } from 'react';
import type { MediaDeviceAdapter } from '../../../shared/webrtc/mediaAdapter';
import type { PreviewState } from '../../../shared/webrtc/types';

export function useWebRTCPreview(adapter: MediaDeviceAdapter) {
  const [state, setState] = useState<PreviewState>('idle');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isActiveRef = useRef(true);

  useEffect(() => {
    return () => {
      isActiveRef.current = false;

      if (stream) {
        adapter.stopStream(stream);
      }
    };
  }, [stream, adapter]);

  const startPreview = async () => {
    if (state !== 'idle') return;

    setError(null);
    setState('starting');

    try {
      const mediaStream = await adapter.getStream();

      // If component unmounted during async call
      if (!isActiveRef.current) {
        adapter.stopStream(mediaStream);
        return;
      }

      setStream(mediaStream);
      setState('running');
    } catch (err: unknown) {
      console.error('Camera error:', err);

      let message = 'Unknown error';
      if (
        (err instanceof Error && err.name === 'NotAllowedError') ||
        (typeof err === 'object' &&
          err !== null &&
          'name' in err &&
          (err as { name?: string }).name === 'NotAllowedError')
      ) {
        message = 'Camera permission denied';
      }

      setError(message);
      setState('error');
    }
  };

  const stopPreview = () => {
    if (!stream) return;

    setState('stopping');

    adapter.stopStream(stream);
    setStream(null);

    setState('idle');
  };

  return {
    state,
    stream,
    error,
    startPreview,
    stopPreview,
  };
}