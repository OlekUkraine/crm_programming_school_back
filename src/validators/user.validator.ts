import Joi from "joi";

import { regexConstants } from "../constants";

export class UserValidator {
  static firstName = Joi.string().min(3).max(30).trim();
  static surname = Joi.string().min(3).max(30).trim();
  static email = Joi.string().lowercase().regex(regexConstants.EMAIL).trim();
  static password = Joi.string().min(4).max(30).trim();
  static is_active = Joi.boolean();
  static is_superuser = Joi.boolean();
  static is_staff = Joi.boolean();
  static last_login = Joi.string();

  static create = Joi.object({
    name: this.firstName.required(),
    surname: this.surname.required(),
    email: this.email.required(),
  });

  static update = Joi.object({
    name: this.firstName,
    surname: this.surname,
    email: this.email,
    password: this.password,
    is_active: this.is_active,
    is_superuser: this.is_superuser,
    is_staff: this.is_staff,
    last_login: this.last_login,
  });

  static register = Joi.object({
    password: this.password.required(),
  });

  static login = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  static forgotPassword = Joi.object({
    email: this.email.required(),
  });

  static setForgotPassword = Joi.object({
    password: this.password.required(),
  });
}
