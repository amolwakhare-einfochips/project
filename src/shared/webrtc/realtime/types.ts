export type SignalMessage =
  | { type: 'CONNECT' }
  | { type: 'CONNECTED' }
  | { type: 'DISCONNECT' }
  | { type: 'ERROR'; payload: string }
  | { type: 'join'; roomId: string }
  | { type: 'leave'; roomId: string }
  | { type: 'remote-track'; kind: 'video' };