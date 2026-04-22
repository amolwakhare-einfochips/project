import type { MediaDeviceAdapter } from '../mediaAdapter';

export const mockMediaAdapter: MediaDeviceAdapter = {
  async getStream() {
    return new MediaStream();
  },

  stopStream() {
  },
};