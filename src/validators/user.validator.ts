import Joi from "joi";

import { regexConstants } from "../constants";

export class UserValidator {
  static firstName = Joi.string().min(3).max(30).trim();
  static surname = Joi.string().min(3).max(30).trim();
  static email = Joi.string().lowercase().regex(regexConstants.EMAIL).trim();
  // static password = Joi.string().regex(regexConstants.PASSWORD).trim();
  static password = Joi.string().trim();

  static create = Joi.object({
    name: this.firstName.required(),
    surname: this.surname.required(),
    email: this.email.required(),
  });

  static register = Joi.object({
    password: this.password.required(),
  });

  static login = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  static changePassword = Joi.object({
    oldPassword: this.password.required(),
    newPassword: this.password.required(),
  });

  static forgotPassword = Joi.object({
    email: this.email.required(),
  });

  static setForgotPassword = Joi.object({
    password: this.password.required(),
  });
}
