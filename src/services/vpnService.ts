
// This is a mock VPN service to simulate connection/disconnection

// Simulate connection delay for a more realistic experience
const CONNECT_DELAY = 1500;
const DISCONNECT_DELAY = 800;

export const vpnService = {
  connect: () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, CONNECT_DELAY);
    });
  },
  
  disconnect: () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, DISCONNECT_DELAY);
    });
  }
};
