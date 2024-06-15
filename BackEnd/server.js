const express = require("express");
const path = require("path");
const http = require("http");
const nodemailer = require("nodemailer");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
const allowCrossDomain = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Token, MODE, Environment, OwnerId, EventName, CustomHeader,X-CheckSum"
  );
  next();
};

app.use(allowCrossDomain);
let Rooms = { 123: [1, 2] };
const playerInfo = {};
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["POST", "GET"],
  },
});
io.on("connection", (socket) => {
  socket.on("room", ({ roomNumber }, cb) => {
    console.log(
      "check",
      roomNumber &&
        Rooms.hasOwnProperty(roomNumber) &&
        Object.keys(Rooms[roomNumber]).length >= 2,
      Rooms
    );
    if (
      roomNumber &&
      Rooms.hasOwnProperty(roomNumber) &&
      Object.keys(Rooms[roomNumber]).length >= 2
    ) {
      socket.emit("room", { message: "No more space in room" });
      return;
    }
    if (roomNumber) {
      if (!Rooms.hasOwnProperty(roomNumber)) {
        const newObj = {
          [roomNumber]: [socket.id],
        };
        socket.join(roomNumber);
        Rooms = { ...Rooms, ...newObj };
      } else {
        Rooms[roomNumber].push(socket.id);
        const player1 = {
            turn: "X",
            move: "",
          },
          player2 = {
            turn: "O",
            move: "",
          };
        let obj = {
          p1: player1,
          p2: player2,
        };
        playerInfo[roomNumber] = obj;
        socket.join(roomNumber);
        socket
          .to(roomNumber)
          .emit("room", { players: obj, turn: "X", roomNumber });
        socket.emit("room", { players: obj, roomNumber });
      }
    }
  });
  socket.on(
    "made-move",
    ({ board, tracker, roomNumberValue, prevTurn, nextTurn }) => {
      socket
        .to(roomNumberValue)
        .emit("made-move", { board, tracker, prevTurn, nextTurn });
    }
  );
  socket.on("lost", ({ roomNumberValue }) => {
    socket.to(roomNumberValue).emit("lost");
  });
  socket.on("draw", ({ roomNumberValue }) => {
    socket.to(roomNumberValue).emit("draw");
  });
  socket.on("disconnect", ({ roomNumberValue }) => {
    console.log("called", roomNumberValue, Rooms[roomNumberValue]);
    delete Rooms[roomNumberValue];
  });
});
var transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  host: "smtp.gmail.com",
  auth: {
    user: "rajeshrishant67@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
app.get("/api/worklist", (req, res) => {
  try {
  } catch (error) {
    console.log("Error While getting worklist", e);
  }
});
function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) return res.sendStatus(403);
      console.log(req.body.id, user);
      if (req.body.id === user) next();
    });
  } catch (error) {
    console.log("Error in authenticateToken", error);
  }
}

app.post("/api/email", authenticateToken, async (req, res) => {
  try {
    console.log(req.body);
    const mailOptions = {
      from: {
        name: "Rajesh Portfolio",
        address: req.body.from,
      },
      to: ["rajesh.ae171408@gmail.com"],
      subject: req.body.subject,
      text: `Hi I am ${req.body.name},\n${req.body.message}`,
    };
    const sendEmail = await transporter.sendMail(mailOptions);
    res.status(200).json({ ResponseStatus: "Message Sent Successfully!!" });
  } catch (error) {
    console.log("Error in Post of Email", error);
    // res.status(400).json({ResponseStatus:"Unable to send Email, Please try again later..."})
  }
});
app.get("/", (req, res) => {
  //   app.use(express.static(path.join(__dirname, "../FrontEnd", "build")));
  //   res.sendFile(path.join(__dirname, "../FrontEnd", "index.html"));
  return res.json({ message: "jskdlfkjsadhfkjlasdhlk" });
});
app.post("/token", (req, res) => {
  const user = uuidv4();
  const jwToken = jwt.sign(user, process.env.ACCESS_TOKEN);
  res.json({ accessToken: jwToken, id: user });
});
server.listen(5010);
