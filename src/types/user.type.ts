import { Document, Types } from "mongoose";

export interface IUser extends Document {
  id?: Types.ObjectId;
  name?: string;
  surname?: string;
  email: string;
  password: string;
  is_active?: boolean;
  is_superuser?: boolean;
  is_staff?: boolean;
  created_at?: Date;
  updated_at?: Date;
  last_login?: Date;
}
