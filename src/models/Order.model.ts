import { model, Schema } from "mongoose";

import { ECourse, ECourseFormat, ECourseType, EStatus } from "../enums";

const orderSchema = new Schema(
  {
    age: {
      type: Number,
      required: true,
    },
    already_paid: {
      type: Number,
      default: null,
    },
    course: {
      type: String,
      enum: ECourse,
      required: true,
    },
    course_format: {
      type: String,
      enum: ECourseFormat,
      required: true,
    },
    course_type: {
      type: String,
      enum: ECourseType,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      default: null,
    },
    msg: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: EStatus,
      default: null,
    },
    sum: {
      type: String,
      default: null,
    },
    surname: {
      type: String,
      default: null,
    },
    utm: {
      type: String,
      default: null,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Order = model("orders", orderSchema);
