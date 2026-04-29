import type { IWebSocketClient } from "../WebSocketClient";
import type { SignalMessage } from "../types";

export class MockWebSocketClient implements IWebSocketClient {
  private handler?: (message: SignalMessage) => void;

  connect() {
    setTimeout(() => {
      this.handler?.({
        type: "CONNECTED",
      });
    }, 300);
  }

  disconnect() {}

  send(message: SignalMessage) {
    if (message.type === "join") {
      setTimeout(() => {
        this.handler?.({
          type: "remote-track",
        } as SignalMessage);
      }, 1000);
    }

    if (message.type === "leave") {
      setTimeout(() => {
        this.handler?.({
          type: "ERROR",
          payload: "User left the room",
        });
      }, 200);
    }
  }

  onMessage(handler: (message: SignalMessage) => void) {
    this.handler = handler;
  }

  simulateIncoming(message: SignalMessage) {
    this.handler?.(message);
  }
}
