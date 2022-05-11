import { Server } from 'socket.io';

function initWebsocket(httpServer) {
  const io = new Server(httpServer, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log('Connection established');

    socket.on('ping', (msg) => {
      console.log('message: ' + msg);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected');
    });
  });
}

export default {
  initWebsocket,
};
