import { Types } from "mongoose";

import { configs } from "../configs";
import { EActionTokenTypes } from "../enums";
import { ApiError } from "../errors";
import { Action, Token, User } from "../models";
import {
  ICredentials,
  IRegisterUser,
  ITokenPair,
  ITokenPayload,
  IUser,
} from "../types";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async login(
    credentials: ICredentials,
    user: IUser,
  ): Promise<ITokenPair> {
    try {
      const isMatched = await passwordService.compare(
        credentials.password,
        user.password,
      );

      if (!isMatched) {
        throw new ApiError("Invalid email or password", 401);
      }

      const tokensPair = tokenService.generateTokenPair({
        _id: user._id,
        email: user.email,
      });

      await User.updateOne({ last_login: new Date().toISOString() });

      await Token.create({
        ...tokensPair,
        _userId: user._id,
      });

      return { ...tokensPair };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async activate(
    data: IRegisterUser,
    jwtPayload: ITokenPayload,
  ): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(data.password);

      await Promise.all([
        User.updateOne(
          { _id: jwtPayload._id },
          { password: hashedPassword, is_active: true, is_staff: true },
        ),
        Action.deleteMany({
          _userId: jwtPayload._id,
          tokenType: EActionTokenTypes.Activate,
        }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(
    oldTokenPair: ITokenPair,
    tokenPayload: ITokenPayload,
  ): Promise<ITokenPair> {
    try {
      const tokensPair = tokenService.generateTokenPair(tokenPayload);

      await Promise.all([
        Token.create({ ...tokensPair, _userId: tokenPayload._id }),
        Token.deleteOne({ refreshToken: oldTokenPair.refreshToken }),
      ]);

      return { ...tokensPair };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async forgotPassword(userId: Types.ObjectId): Promise<string> {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new ApiError("No user found with this id", 400);
      }

      const actionToken = tokenService.generationActionToken(
        { _id: userId, email: user.email },
        EActionTokenTypes.Forgot,
      );

      await Action.create({
        _userId: userId,
        actionToken,
        tokenType: EActionTokenTypes.Forgot,
      });

      return `${configs.FRONT_URL}/${configs.FRONT_PORT}/${actionToken}`;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async setForgotPassword(
    password: string,
    userId: Types.ObjectId,
    actionToken: string,
  ): Promise<void> {
    const hashedPassword = await passwordService.hash(password);

    await Promise.all([
      User.updateOne({ _id: userId }, { password: hashedPassword }),
      Action.deleteOne({ actionToken }),
    ]);
    try {
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async userData(jwtPayload: ITokenPayload): Promise<IUser> {
    try {
      return User.findById(jwtPayload._id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
