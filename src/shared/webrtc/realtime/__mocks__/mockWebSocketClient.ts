import type { IWebSocketClient } from '../WebSocketClient';
import type { SignalMessage } from '../types';

export class MockWebSocketClient implements IWebSocketClient {
  private handler?: (message: SignalMessage) => void;

  connect() {
    setTimeout(() => {
      this.handler?.({ type: 'CONNECTED' });
    }, 10);
  }

  disconnect() {}

  send(message: SignalMessage) {
    // optional: simulate echo or transitions
  }

  onMessage(handler: (message: SignalMessage) => void) {
    this.handler = handler;
  }

  simulateIncoming(message: SignalMessage) {
    this.handler?.(message);
  }
}