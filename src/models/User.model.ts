import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: 20,
      minLength: 1,
    },
    surname: {
      type: String,
      maxLength: 20,
      minLength: 1,
    },
    email: {
      type: String,
      maxLength: 254,
      minLength: 1,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    password: {
      type: String,
      minLength: 4,
      select: false,
    },
    is_active: {
      type: Boolean,
      default: false,
    },
    is_superuser: {
      type: Boolean,
      description:
        "Designates that this user has all permissions without explicitly assigning them.",
      default: false,
    },
    is_staff: {
      type: Boolean,
      default: false,
    },
    last_login: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const User = model("users", userSchema);
