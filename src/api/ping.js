// import { DbAdapter } from '../db.js'

//Ogni routes corrisonde al canale websocket
const routes = {
  ping: 'ping',
};

//Abbino gli handler ai routes
export const ping_handlers = {
  [routes.ping]: sendPong,
};

function sendPong() {
  return 'pong';
}
