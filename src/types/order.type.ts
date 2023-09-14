import { Types } from "mongoose";

export interface IOrder {
  _id?: Types.ObjectId;
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  age?: number;
  course?: string;
  course_format?: string;
  course_type?: string;
  sum?: string;
  already_paid?: number;
  created_at?: string;
  utm?: string;
  msg?: string;
  status?: string;
}
