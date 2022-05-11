import NormeService from './norme.js';
import { MyWebsocket } from './../websocket.js';
const API_ACTIONS = {
  norme: {
    getAll: 'norme/getAll',
  },
};

function handleRequest(sender, payload) {
  switch (payload.action) {
    case API_ACTIONS.norme.getAll:
      handleNorme(sender, payload);
      break;
    default:
      console.log('Nessun handler per questo paylod');
      console.log(payload);
      MyWebsocket.sendError(sender, {
        msg: 'Nessun handler per questo messaggio',
        payload: payload,
      });
      break;
  }
}

async function handleNorme(target, payload) {
  let result = await NormeService.listaNorme();
  MyWebsocket.sendResponse(target, result);
}

export default {
  handleRequest,
};
