const socketIO = require('socket.io');
const auth = require('./authentication');
const connectedUsers = {};

module.exports.socketIOConnection = (app) => {
  global.SOCKETIO = socketIO.listen(app);
  global.SOCKETIO.on('connection', (socket) => {
    // While on socket on connection
    socket.on('clientInformation', (data) => {
      // get jwt token in client clientInformation
      // check if token is valid (search in user)
      // set it as objet property
      auth.getUserId(data).then((userId) => {
        auth.getUser(userId, data).then((user) => {
          socket.join('connected');
          connectedUsers[data] = socket.id;
        });
      });
    });

    // While on socket on disconnection
    socket.on('disconnection', (data) => {
      delete connectedUsers[data];
    });
  });
  return global.SOCKETIO;
};

setInterval(function() {
    global.SOCKETIO.sockets
      .to('connected')
      .emit('randomMessage', (new Date()).getTime());
}, 2000);

module.exports.refreshTransfers = (receiverId, message) => {
  return global.SOCKETIO.sockets
    .to(connectedUsers[receiverId])
    .emit('refreshTransfers', message);
};

module.exports.refreshCertifications = (companyId, message) => {
  return global.SOCKETIO.sockets
    .to(companyId)
    .emit('refreshCertifications', message);
};
