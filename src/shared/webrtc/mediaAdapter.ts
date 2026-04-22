export interface MediaDeviceAdapter {
  getStream(): Promise<MediaStream>;
  stopStream(stream: MediaStream): void;
}