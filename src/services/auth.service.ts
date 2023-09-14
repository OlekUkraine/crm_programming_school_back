import { EActionTokenTypes, EEmailActions } from "../enums";
import { ApiError } from "../errors";
import { Action, Token, User } from "../models";
import { ICredentials, ITokenPair, IUser } from "../types";
import { mailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(data: IUser): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(data.password);

      const user = await User.create({ ...data, password: hashedPassword });

      const actionToken = tokenService.generationActionToken(
        { _id: user._id, email: user.email },
        EActionTokenTypes.Activate,
      );

      if (data.email !== "admin@gmail.com") {
        await Promise.all([
          Action.create({
            actionToken,
            tokenType: EActionTokenTypes.Activate,
            _userId: user._id,
          }),
          mailService.sendMail(data.email, EEmailActions.WELCOME, {
            name: data.name,
            actionToken,
          }),
        ]);
      }
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
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

      await Token.create({
        ...tokensPair,
        _userId: user._id,
      });

      return { ...tokensPair };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
