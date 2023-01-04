const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const socket = require("socket.io");
const http = require("http");
const userRouters  = require('./router/userRouter')
const messagesRouters  = require('./router/messageRouter')
const path = require("path")

dotenv.config();


const app = express();

const server = http.createServer(app);

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan("common"));

app.use("/api/auth" , userRouters);
app.use("/api/messages" , messagesRouters);

app.get("/", (req, res) => {
    res.json("server running ...");
  })

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect successful");
    server.listen(process.env.PORT || 8080, () => {
      console.log("server is running ...");
    });
  })
  .catch((err) => {
    console.log("============= err", err);
  });


  const io = socket(server,{
    cors : {
      origin : "http://localhost:3000",
      credentials :true
    }
  })
  
  global.onlineUsers = new Map();
  
  io.on("connection",(socket) =>{
    global.chatSocket = socket;
    socket.on("add-user" , userId =>{
      onlineUsers.set(userId , socket.id)
    })

  
    socket.on("send-msg" , data =>{
      const sendUserSocket = onlineUsers.get(data.to)
      if(sendUserSocket){
        socket.to(sendUserSocket).emit("msg-recieve" , data.message);
      }
    })
  
  })
  
  