import { model, Schema } from "mongoose";

const orderSchema = new Schema({
  // _id: {
  //   type: Types.ObjectId,
  // },
  age: {
    type: Number,
  },
  already_paid: {
    type: Number,
  },
  course: {
    type: String,
  },
  course_format: {
    type: String,
  },
  course_type: {
    type: String,
  },
  created_at: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
  },
  msg: {
    type: String,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  status: {
    type: String,
  },
  sum: {
    type: String,
  },
  surname: {
    type: String,
  },
  utm: {
    type: String,
  },
});

export const Order = model("orders", orderSchema);
