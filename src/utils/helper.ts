import { Response } from "express";

const fMsg = (
  res: Response,
  msg: string = "all success",
  result: any = [],
  totalCount: number | null = null
) => {
  if (totalCount != null) {
    res.status(200).json({ con: true, msg, result, totalCount });
  } else {
    res.status(200).json({ con: true, msg, result });
  }
};

export default fMsg;
