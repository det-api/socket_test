import mongoose, { Schema } from "mongoose";

export interface modeDocument extends mongoose.Document{
    stationId : string
    mode : string
}

const modeSchema = new Schema(
  {
    stationId: { type: String, required: true, unique: true },
    mode: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const modeModel = mongoose.model<modeDocument>("mode", modeSchema);
export default modeModel;
