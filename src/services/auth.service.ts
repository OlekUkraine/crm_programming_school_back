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
          { password: hashedPassword, is_active: true },
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
}

export const authService = new AuthService();
