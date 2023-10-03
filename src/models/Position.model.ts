import { model, Schema } from "mongoose";

const positionSchema = new Schema({
  position: {
    type: String,
    default: null,
  },
  usersId: {
    type: Array,
  },
});

export const Position = model("position", positionSchema);
