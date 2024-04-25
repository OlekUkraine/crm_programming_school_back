import Joi from "joi";

import { regexConstants } from "../constants";
import {
  ECourse,
  ECourseFormat,
  ECourseType,
  ESortOrder,
  EStatus,
} from "../enums";

export class OrderValidator {
  static page = Joi.number();
  static limitPage = Joi.number().max(100);
  static sortedBy = Joi.valid(...Object.values(ESortOrder));
  static searchObject = Joi.string();

  static age = Joi.number().min(1).max(150);
  static already_paid = Joi.number().min(0).max(30000);
  static course = Joi.allow(null).valid(...Object.values(ECourse));
  static course_format = Joi.allow(null).valid(...Object.values(ECourseFormat));
  static course_type = Joi.allow(null).valid(...Object.values(ECourseType));
  static email = Joi.string().regex(regexConstants.EMAIL).trim();
  static msg = Joi.string().max(500).trim();
  static orderName = Joi.string().max(30).trim();
  static phone = Joi.string().regex(regexConstants.PHONE).trim();
  static status = Joi.allow(null).valid(...Object.values(EStatus));
  static sum = Joi.number().max(60000);
  static surname = Joi.string().max(30).trim();
  static utm = Joi.string().max(20).trim();
  static userId = Joi.string();

  static getAll = Joi.object({
    page: this.page,
    limit: this.limitPage,
    sortedBy: this.sortedBy,
    searchObject: this.searchObject,
    name: this.orderName,
    email: this.email,
    phone: this.phone,
    surname: this.surname,
    age: this.age,
    course: this.course,
    course_format: this.course_format,
    course_type: this.course_type,
    already_paid: this.already_paid,
    status: this.status,
    userId: this.userId,
  });

  static update = Joi.object({
    age: this.age,
    already_paid: this.already_paid,
    course: this.course,
    course_format: this.course_format,
    course_type: this.course_type,
    email: this.email,
    msg: this.msg,
    name: this.orderName,
    phone: this.phone,
    status: this.status,
    sum: this.sum,
    surname: this.surname,
    utm: this.utm,
  });
}
