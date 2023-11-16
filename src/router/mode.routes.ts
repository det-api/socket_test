import {
  addModeHandler,
  deletModeHandler,
  getModeHandler,
} from "../controller/mode.controller";

const modeRoute = require("express").Router();

modeRoute.get("/", getModeHandler);
modeRoute.post("/", addModeHandler);
modeRoute.delete("/", deletModeHandler);

export default modeRoute;
