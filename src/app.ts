import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import config from "config";
import cors from "cors";
import fileUpload from "express-fileupload";
import modeRoute from "./router/mode.routes";
import { deleteMode, getMode } from "./service/mode.service";

const app = express();
app.use(express.json());
app.use(fileUpload());
app.use(cors({ origin: "*" }));

const server = require("http").createServer(app);

export const io = require("socket.io")(server);

io.of("/change-mode").on("connection", (socket: any) => {
  socket.on("checkMode", async (data) => {
    let result = await getMode({ stationId: data });
    if (result.length > 0) {
      await deleteMode({ stationId: data });
      console.log("User send data", data);
      socket.emit(data, result[0]);
    }
  });
});

//require data

const port = config.get<number>("port");
const host = config.get<string>("host");
const dbUrl = config.get<string>("dbUrl");

//mongodb connection

mongoose.connect(dbUrl);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("ok");
});

app.use("/mode", modeRoute);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 409;
  res.status(err.status).json({
    con: false,
    msg: err.message,
  });
});

let httpServer = server.listen(port, () =>
  console.log(`server is running in  http://${host}:${port}`)
);
