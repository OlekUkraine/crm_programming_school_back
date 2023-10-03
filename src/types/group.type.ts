import { Document } from "mongoose";

export interface IGroup extends Document {
  // _id?: Types.ObjectId;
  groupName?: string;
  orderId?: string[];
}

export interface IAddGroup {
  groupName: string;
  orderId: string;
}
