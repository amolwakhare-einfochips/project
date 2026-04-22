import type { SignalMessage } from './types';

export interface IWebSocketClient {
  connect(): void;
  disconnect(): void;
  send(message: SignalMessage): void;
  onMessage(handler: (message: SignalMessage) => void): void;
}