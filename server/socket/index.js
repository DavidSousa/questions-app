const socketIo = require('socket.io');

const ioEvents = (io) => {
  io.of('/answers').on('connection', (socket) => {
    console.log('Client connected');
    socket.on('newVote', (answerId) => {
      socket.broadcast.emit('newVote', answerId);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

module.exports.listen = (server) => {
  const io = socketIo(server);
  ioEvents(io);
};
