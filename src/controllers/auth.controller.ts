import { NextFunction, Request, Response } from "express";

import { authService } from "../services";
import { ITokenPair } from "../types";

class AuthController {
  public async activate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      const { jwtPayload } = req.res.locals;
      await authService.activate(req.body, jwtPayload);

      return res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ITokenPair>> {
    try {
      const tokenPair = await authService.login(req.body, req.res.locals.user);
      return res.json({ ...tokenPair });
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
