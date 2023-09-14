import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: 20,
      minLength: 1,
      match: /^[a-zA-Zа-яА-ЯіІїЇ]+$/,
    },
    surname: {
      type: String,
      maxLength: 20,
      minLength: 1,
      match: /^[a-zA-Zа-яА-ЯіІїЇ]+$/,
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
    },
    is_active: {
      type: Boolean,
    },
    is_superuser: {
      type: Boolean,
      description:
        "Designates that this user has all permissions without explicitly assigning them.",
    },
    is_staff: {
      type: Boolean,
    },
    // created_at: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updated_at: {
    //   type: Date,
    //   default: Date.now,
    // },
    last_login: {
      type: Date,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const User = model("users", userSchema);
