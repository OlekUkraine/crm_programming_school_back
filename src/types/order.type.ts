import { Document } from "mongoose";

export interface IOrder extends Document {
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
  update_at?: string;
  utm?: string;
  msg?: string;
  status?: string;
}

export type ICreateOrder = Record<"created_at" | "update_at", IOrder>;
