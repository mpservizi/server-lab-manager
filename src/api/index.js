import { norme_handlers } from './norme.js';
import { MyWebsocket } from './../websocket.js';

//Abbino i metodi ai routes
const API_HANDLER = {
  ...norme_handlers,
};

//Gestisce la richiesta del client
async function handleRequest(sender, payload) {
  //Ricavo handler in base alla richiesta
  let handler = API_HANDLER[payload.action];
  if (!handler) {
    console.log('Nessun handler per questo paylod');
    console.log(payload);
    MyWebsocket.sendError(sender, {
      msg: 'Nessun handler per questo messaggio',
      payload: payload,
    });
    return;
  }
  //Chiamo il handler per eseguire la richiesta
  let result = await handler(sender, payload);
  //Restitusico la risposta al client
  MyWebsocket.sendResponse(sender, result);
}

export default {
  handleRequest,
};
