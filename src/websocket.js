import { Server } from 'socket.io';
import ApiManager from './api/index.js';

const CANALE_SCAMBIO = 'ws_server';

//Instanza socket io
let io = undefined;
/**
 * Inizializza wesocket server
 * @param {*} httpServer
 */
function initWebsocket(httpServer) {
  io = new Server(httpServer, { cors: { origin: '*' } });

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

/**
 * Elabora la richiesta del client e delega la gestione al API
 * @param {Object} sender
 * @param {String} json
 */
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

/**
 * Wrapper per mandare la risposta al client
 * @param {*} target
 * @param {*} payload
 */
function sendResponse(target, payload) {
  target.emit(CANALE_SCAMBIO, creaRisposta(payload));
}

/**
 * Wrapper per mandare errore al client
 * @param {*} target
 * @param {*} payload
 */
function sendError(target, payload) {
  let result = {
    err: true,
    data: payload,
  };
  let json = JSON.stringify(result);
  target.emit(CANALE_SCAMBIO, json);
}

/**
 * Wrapper per mandare il messaggio a tutti i client tranne il sender
 * @param {*} sender
 * @param {*} payload
 */
function sendToOther(sender, payload) {
  sender.broadcast.emit(CANALE_SCAMBIO, creaRisposta(payload));
}

/**
 * Wrapper per mandare il messaggio a tutti i client
 * @param {*} sender
 * @param {*} payload
 */
function sendToAll(payload) {
  io.emit(CANALE_SCAMBIO, creaRisposta(payload));
}

//Crea la risposta da mandare al client
function creaRisposta(payload) {
  let result = {
    data: payload,
  };
  let json = JSON.stringify(result);
  return json;
}

export const MyWebsocket = {
  initWebsocket,
  sendResponse,
  sendError,
  sendToAll,
  sendToOther,
};
