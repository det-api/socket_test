import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import config from "config";
import cors from "cors";
import fileUpload from "express-fileupload";

const app = express();
app.use(express.json());
app.use(fileUpload());
app.use(cors({ origin: "*" }));

const server = require("http").createServer(app);


const io = require("socket.io")(server);

io.on("connection", (socket: any) => {
  socket.on('test' , data => {
    console.log("User send data" , data)
    socket.emit("hello this is from server")
  })
})

//require data

const port = config.get<number>("port");
const host = config.get<string>("host");
const dbUrl = config.get<string>("dbUrl");

//mongodb connection

mongoose.connect(dbUrl);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("ok");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 409;
  res.status(err.status).json({
    con: false,
    msg: err.message,
  });
});



let httpServer =server.listen(port, () =>
  console.log(`server is running in  http://${host}:${port}`)
);

