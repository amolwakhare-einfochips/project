import type { Meta, StoryObj } from '@storybook/react-vite';
import WebRTCRoomPage from '../../assignments/week4/webrtc-room';

const meta: Meta<typeof WebRTCRoomPage> = {
  title: 'WEEK4/WebRTC Room',
  component: WebRTCRoomPage,
};

export default meta;

type Story = StoryObj<typeof WebRTCRoomPage>;


export const Idle: Story = {
  args: {
    mockPreview: {
      state: 'idle',
      stream: null,
      error: null,
    },
    mockConnection: {
      connectionState: 'idle',
      remoteState: 'idle',
      remoteStream: null,
    },
  },
};


export const PreviewRunning: Story = {
  args: {
    mockPreview: {
      state: 'running',
      stream: new MediaStream(),
      error: null,
    },
    mockConnection: {
      connectionState: 'idle',
      remoteState: 'idle',
      remoteStream: null,
    },
  },
};


export const PermissionDenied: Story = {
  args: {
    mockPreview: {
      state: 'error',
      stream: null,
      error: 'Camera permission denied',
    },
    mockConnection: {
      connectionState: 'idle',
      remoteState: 'idle',
      remoteStream: null,
    },
  },
};


export const Connecting: Story = {
  args: {
    mockPreview: {
      state: 'idle',
      stream: null,
      error: null,
    },
    mockConnection: {
      connectionState: 'connecting',
      remoteState: 'connecting',
      remoteStream: null,
    },
  },
};


export const ConnectedNoRemote: Story = {
  args: {
    mockPreview: {
      state: 'running',
      stream: new MediaStream(),
      error: null,
    },
    mockConnection: {
      connectionState: 'connected',
      remoteState: 'idle',
      remoteStream: null,
    },
  },
};


export const RemoteReceiving: Story = {
  args: {
    mockPreview: {
      state: 'running',
      stream: new MediaStream(),
      error: null,
    },
    mockConnection: {
      connectionState: 'connected',
      remoteState: 'receiving',
      remoteStream: new MediaStream(),
    },
  },
};


export const SocketError: Story = {
  args: {
    mockPreview: {
      state: 'idle',
      stream: null,
      error: null,
    },
    mockConnection: {
      connectionState: 'error',
      remoteState: 'disconnected',
      remoteStream: null,
    },
  },
};


export const RemoteDisconnected: Story = {
  args: {
    mockPreview: {
      state: 'running',
      stream: new MediaStream(),
      error: null,
    },
    mockConnection: {
      connectionState: 'connected',
      remoteState: 'disconnected',
      remoteStream: null,
    },
  },
};