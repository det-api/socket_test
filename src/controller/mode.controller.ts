import { Request, Response, NextFunction } from "express";
import { addMode, deleteMode, getMode } from "../service/mode.service";
import fMsg from "../utils/helper";
import { io } from "../app";

export const getModeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await getMode(req.query);
    fMsg(res, "Mode are here", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const addModeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await addMode(req.body);
    console.log(result)
    io.of('/change-mode').emit(result.stationId, result);
    fMsg(res, "New Mode was added", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const deletModeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteMode(req.query);
    fMsg(res, "Mode was deleted");
  } catch (e) {
    next(new Error(e));
  }
};
