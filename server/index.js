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
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});
