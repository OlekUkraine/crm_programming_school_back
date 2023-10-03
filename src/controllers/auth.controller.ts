import { Request, Response } from "express";

import { authService } from "../services";
import { ITokenPair } from "../types";

class AuthController {
  public async activate(req: Request, res: Response): Promise<Response<void>> {
    try {
      const { jwtPayload } = req.res.locals;
      await authService.activate(req.body, jwtPayload);

      return res.sendStatus(201);
    } catch (e) {
      return res
        .status(e.status || 500)
        .json({ error: e.message || "Internal Server Error" });
    }
  }

  public async login(
    req: Request,
    res: Response,
  ): Promise<Response<ITokenPair>> {
    try {
      const tokenPair = await authService.login(req.body, req.res.locals.user);
      return res.json({ ...tokenPair });
    } catch (e) {
      return res
        .status(e.status || 500)
        .json({ error: e.message || "Internal Server Error" });
    }
  }
}

export const authController = new AuthController();
