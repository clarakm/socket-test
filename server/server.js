const path = require("path");
const express = require("express");
const app = express();
const PORT = 3000;
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer(app);
const io = socketIO(server);
const users = {};
//when anyone connects
io.on("connection", client => {
  client.on("username", username => {
    const user = {
      name: username,
      id: client.id
    };
    users[client.id] = user;
    io.emit("connects", user);
    io.emit("users", Object.values(users));
  });

  client.on("send", message => {
    io.emit("message", {
      text: message,
      date: new Date().toISOString(),
      users: users[client.id]
    });
  });
  client.on("disconnect", () => {
    const username = users[client.id];
    delete users[client.id];
    io.emit("disconnect", client.id);
  });
});
server.listen(3000);

// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");
// const axios = require("axios");

// const port = process.env.PORT || 3000;
// const index = require("./routes/index");

// const app = express();
// app.use(index);

// const server = http.createServer(app);

// const io = socketIo(server); // < Interesting!

// const getApiAndEmit = async socket => {
//   try {
//     const res = await axios.get(
//       "https://api.darksky.net/forecast/PUT_YOUR_API_KEY_HERE/43.7695,11.2558"
//     ); // Getting the data from DarkSky
//     socket.emit("FromAPI", res.data.currently.temperature); // Emitting a new message. It will be consumed by the client
//   } catch (error) {
//     console.error(`Error: ${error.code}`);
//   }
// };

// let interval;

// io.on("connection", socket => {
//   console.log("connected!!");
// });

// io.on("connection", socket => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 10000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });
// server.listen(port, () => console.log(`Listening on port ${port}`));
