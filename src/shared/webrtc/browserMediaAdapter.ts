import type { MediaDeviceAdapter } from './mediaAdapter';

export const browserMediaAdapter: MediaDeviceAdapter = {
  async getStream() {
    return navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
  },

  stopStream(stream: MediaStream) {
    stream.getTracks().forEach((track) => track.stop());
  },
};