import { model, Schema } from "mongoose";

const groupSchema = new Schema(
  {
    groupName: {
      type: String,
      default: null,
    },
    orderId: {
      type: [String],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Group = model("group", groupSchema);
