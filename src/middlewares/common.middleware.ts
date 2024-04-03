import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors";

class CommonMiddleware {
  public isIdValid(field: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params[field];

        if (!isObjectIdOrHexString(id)) {
          throw new ApiError(`Is ${field} not valid`, 400);
        }

        next();
      } catch (e) {
        if (e instanceof ApiError) {
          res
            .status(e.status)
            .json({ error: { message: e.message, status: e.status } });
        } else {
          res
            .status(500)
            .json({ error: { message: "Internal Server Error", status: 500 } });
        }
      }
    };
  }

  public isBodyValid(validator: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error, value } = validator.validate(req.body);

        if (error) {
          throw new ApiError(error.message, 400);
        }

        req.body = value;
        next();
      } catch (e) {
        if (e instanceof ApiError) {
          res
            .status(e.status)
            .json({ error: { message: e.message, status: e.status } });
        } else {
          res
            .status(500)
            .json({ error: { message: "Internal Server Error", status: 500 } });
        }
      }
    };
  }

  public isQueryValid(validator: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error, value } = validator.validate(req.query);

        if (error) {
          throw new ApiError(error.message, 400);
        }

        req.query = value;
        next();
      } catch (e) {
        if (e instanceof ApiError) {
          res
            .status(e.status)
            .json({ error: { message: e.message, status: e.status } });
        } else {
          res
            .status(500)
            .json({ error: { message: "Internal Server Error", status: 500 } });
        }
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
