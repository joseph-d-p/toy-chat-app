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
    console.log(socket.id, ", room: ", room);
    socket.join(room);
  });
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});
