import type { IWebSocketClient } from './WebSocketClient';
import type { SignalMessage } from './types';

export class BrowserWebSocketClient implements IWebSocketClient {
  private socket: WebSocket | null = null;
  private handler?: (message: SignalMessage) => void;
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      this.handler?.({ type: 'CONNECTED' });
    };

    this.socket.onmessage = (event) => {
      try {
        const data: SignalMessage = JSON.parse(event.data);
        this.handler?.(data);
      } catch {
        this.handler?.({ type: 'ERROR', payload: 'Invalid message' });
      }
    };

    this.socket.onerror = () => {
      this.handler?.({ type: 'ERROR', payload: 'WebSocket error' });
    };
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
  }

  send(message: SignalMessage) {
    this.socket?.send(JSON.stringify(message));
  }

  onMessage(handler: (message: SignalMessage) => void) {
    this.handler = handler;
  }
}