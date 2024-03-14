import { NextFunction, Request, Response } from "express";

import { EActionTokenTypes, ETokenType } from "../enums";
import { ApiError } from "../errors";
import { Action, Token } from "../models";
import { tokenService } from "../services";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");

      if (!accessToken) {
        throw new ApiError("no token", 401);
      }

      const payload = tokenService.checkToken(accessToken, ETokenType.Access);
      const entity = await Token.findOne({ accessToken });

      if (!entity) {
        throw new ApiError("Token not valid", 401);
      }

      res.locals.tokenPayload = payload;
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

  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const refreshToken = req.get("Authorization");

      if (!refreshToken) {
        throw new ApiError("no token", 401);
      }

      const payload = tokenService.checkToken(refreshToken, ETokenType.Refresh);
      const entity = await Token.findOne({ refreshToken });

      if (!entity) {
        throw new ApiError("Token not valid", 401);
      }

      res.locals.oldTokenPair = entity;
      res.locals.tokenPayload = { email: payload.email, _id: payload._id };
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

  public checkActionToken(tokenType: EActionTokenTypes) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const actionToken = req.params.token;

        if (!actionToken) {
          throw new ApiError("Token is not provided", 400);
        }

        const jwtPayload = tokenService.checkActionToken(
          actionToken,
          tokenType,
        );

        const tokenFromDB = await Action.findOne({ actionToken });

        console.log(" tokenFromDB > > > > > ", tokenFromDB);

        if (!tokenFromDB) {
          throw new ApiError("Token is invalid", 400);
        }

        req.res.locals = { jwtPayload, tokenFromDB };
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
export const authMiddleware = new AuthMiddleware();
