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
          res.status(401).json({ error: "Invalid email or password" });
          return;
        }

        res.locals.user = user;
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

  public async isSuperuser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { _id: userId } = req.res.locals.tokenPayload;
      const user = await User.findOne({ _id: userId });

      if (!user.is_superuser) {
        throw new ApiError("You do not have access!", 403);
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
  }

  public async isActive(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { _id: userId } = req.res.locals.tokenPayload;
      const user = await User.findOne({ _id: userId });

      if (!user.is_active) {
        throw new ApiError("You do not have access!", 403);
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
  }
}
export const userMiddleware = new UsersMiddleware();
