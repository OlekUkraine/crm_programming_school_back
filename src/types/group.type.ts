import { Document } from "mongoose";

export interface IGroup extends Document {
  groupName?: string;
  orderId?: string[];
}

export interface IAddGroup {
  groupName: string;
  orderId: string;
}
