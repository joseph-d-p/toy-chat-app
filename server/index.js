const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: [
      "http://localhost:3000",
    ]
  },
});

io.on('connection', (socket) => {
  console.log('Connected: ', socket.id);

  // Join room
  socket.on("join", (room) => {
    console.log(`[JOIN]: socket: ${socket.id}, room: ${room}`);
    socket.join(room);
    socket.emit(`joined:${socket.id}`, room); // ACK join room
  });

  socket.on("message", (room, message) => {
    console.log(`[MESSAGE] room: ${room}, message: ${message}`);
    socket.to(room).emit(`message:${room}`, message);
  });
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});
