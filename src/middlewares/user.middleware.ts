import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../types";

class UsersMiddleware {
  public isExist<T>(field: keyof T) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const user = await User.findOne({ [field]: req.body[field] }).select(
          "+password",
        );

        if (!user) {
          throw new ApiError("User not found", 422);
        }

        res.locals.user = user;
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public findAndThrow(field: keyof IUser) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const user = await User.findOne({ [field]: req.body[field] }).select(
          "+password",
        );
        if (user) {
          throw new ApiError("User with this email already exist", 409);
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public async isSuperuser(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id: userId } = req.res.locals.tokenPayload;
      const user = await User.findOne({ _id: userId });

      if (!user.is_superuser) {
        throw new ApiError("You do not have access!", 403);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}
export const userMiddleware = new UsersMiddleware();
