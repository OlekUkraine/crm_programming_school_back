import { Document } from "mongoose";

export interface IComment extends Document {
  comment?: string;
  orderId?: string;
}

export interface IAddComment {
  comment: string;
  orderId: string;
}
