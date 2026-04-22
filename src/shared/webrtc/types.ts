export type PreviewState =
  | 'idle'
  | 'starting'
  | 'running'
  | 'error'
  | 'stopping';

export interface PreviewStateModel {
  state: PreviewState;
  error?: string;
}

export type ConnectionState =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'error';

export type RemoteState =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'receiving'
  | 'disconnected'
  | 'error';

export interface RemoteStateModel {
  state: RemoteState;
}

export type SignalMessage =
  | { type: 'CONNECT' }
  | { type: 'CONNECTED' }
  | { type: 'DISCONNECT' }
  | { type: 'ERROR'; payload: string }
  | { type: 'join'; roomId: string }
  | { type: 'leave'; roomId: string }
  | { type: 'remote-track'; kind: 'video' };
