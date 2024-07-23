import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

class WebSocketService {
  constructor() {
    this.socket = null;
  }

  connect(url) {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      console.error("No access token found");
      return;
    }

    this.socket = new WebSocket(url, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    this.socket.onopen = this.onOpen;
    this.socket.onmessage = this.onMessage;
    this.socket.onclose = this.onClose;
    this.socket.onerror = this.onError;
  }

  onOpen(event) {
    console.log("WebSocket is connected:", event);
  }

  onMessage(event) {
    console.log("Received:", event.data);
  }

  onClose(event) {
    console.log("WebSocket is closed:", event);
  }

  onError(error) {
    console.error("WebSocket error:", error);
  }

  send(data) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.error("WebSocket is not connected");
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export default new WebSocketService();
