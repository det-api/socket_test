import { FilterQuery } from "mongoose";
import modeModel, { modeDocument } from "../model/mode.model";

export const getMode = async (query: FilterQuery<modeDocument>) => {
  try {
    return await modeModel.find(query).lean();
  } catch (e) {
    throw new Error(e);
  }
};

export const addMode = async (body: modeDocument) => {
  try {
    return await new modeModel(body).save();
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteMode = async (query: FilterQuery<modeDocument>) => {
  try {
    return await modeModel.deleteMany(query);
  } catch (e) {
    throw new Error(e);
  }
};
