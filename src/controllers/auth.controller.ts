import { NextFunction, Request, Response } from "express";

import { authService } from "../services";

class AuthController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      await authService.register(req.body);

      return res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }
  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      const tokenPair = await authService.login(req.body, req.res.locals.user);

      console.log(tokenPair);

      return res.json({ ...tokenPair });
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
