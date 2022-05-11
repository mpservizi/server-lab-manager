import { Server } from 'socket.io';
import ApiManager from './api/index.js';

const CANALE_SCAMBIO = 'ws_server';

function initWebsocket(httpServer) {
  const io = new Server(httpServer, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log('Connection established');

    //Canale usato per scambiare dati con il client
    socket.on(CANALE_SCAMBIO, (msg) => {
      handleMsgClient(socket, msg);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected');
    });
  });
}

function handleMsgClient(sender, json) {
  try {
    let payload = JSON.parse(json);
    ApiManager.handleRequest(sender, payload);
  } catch (error) {
    console.log('Error parsing client msg');
    console.log(json);
    sendError(sendError, { msg: 'Errore parsing message', payload: json });
  }
}

function sendResponse(target, payload) {
  let result = {
    data: payload,
  };
  let json = JSON.stringify(result);
  target.emit(CANALE_SCAMBIO, json);
}

function sendError(target, payload) {
  let result = {
    err: true,
    data: payload,
  };
  let json = JSON.stringify(result);
  target.emit(CANALE_SCAMBIO, json);
}

export const MyWebsocket = {
  initWebsocket,
  sendResponse,
  sendError,
};
