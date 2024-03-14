import { Document } from "mongoose";

export interface IUser extends Document {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  is_active: boolean;
  is_superuser: boolean;
  is_staff: boolean;
  created_at?: Date;
  updated_at?: Date;
  last_login: Date | null;
}

export type IAddUser = Pick<IUser, "name" | "surname" | "email">;
export type IUserActivate = Pick<IUser, "_id" | "email">;
export type IRegisterUser = Pick<IUser, "password">;
