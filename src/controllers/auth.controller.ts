import { Request, Response } from "express";

import { authService } from "../services";
import { ITokenPair, ITokenPayload, IUser } from "../types";

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

  public async refresh(
    req: Request,
    res: Response,
  ): Promise<Response<ITokenPair>> {
    try {
      const oldTokenPair = req.res.locals.oldTokenPair as ITokenPair;
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;

      const tokenPair = await authService.refresh(oldTokenPair, tokenPayload);

      return res.status(200).json({ ...tokenPair });
    } catch (e) {
      return res
        .status(e.status || 500)
        .json({ error: e.message || "Internal Server Error" });
    }
  }

  public async myData(req: Request, res: Response): Promise<Response<IUser>> {
    try {
      const { tokenPayload } = req.res.locals;
      const user = await authService.userData(tokenPayload);

      return res.status(200).json(user);
    } catch (e) {
      return res
        .status(e.status || 500)
        .json({ error: e.message || "Internal Server Error" });
    }
  }
}

export const authController = new AuthController();
