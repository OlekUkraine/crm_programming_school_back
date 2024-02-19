import { model, Schema } from "mongoose";

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      default: null,
    },
    orderId: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Comment = model("comment", commentSchema);
