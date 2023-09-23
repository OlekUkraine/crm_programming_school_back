import { configs } from "../configs";
import { EActionTokenTypes, EObjectType } from "../enums";
import { ApiError } from "../errors";
import { User } from "../models";
import { IAddUser, IPagination, IQuery, IUser } from "../types";
import { paginationService } from "./pagination.service";
import { tokenService } from "./token.service";

class UserService {
  public async create(data: IAddUser): Promise<IUser> {
    try {
      return await User.create(data);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getActivationLink(userId: string): Promise<string> {
    try {
      const user = await User.findById(userId);
      const token = tokenService.generationActionToken(
        { _id: userId, email: user.email },
        EActionTokenTypes.Activate,
      );

      return `${configs.FRONT_URL}/${token}`;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async findAllWithPagination(
    query: IQuery,
  ): Promise<IPagination<IUser>> {
    return await paginationService.addPaginationForList<IUser>(
      query,
      EObjectType.User,
    );
  }

  public async findById(id: string): Promise<IUser> {
    return await this.getOneByIdOrThrow(id);
  }

  public async updateById(id: string, data: Partial<IUser>): Promise<IUser> {
    await this.getOneByIdOrThrow(id);

    return await User.findOneAndUpdate(
      { _id: id },
      { ...data },
      { returnDocument: "after" },
    );
  }

  public async deleteById(id: string): Promise<void> {
    await User.deleteOne({ _id: id });
  }

  private async getOneByIdOrThrow(userId: string): Promise<IUser> {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError("user not found", 422);
    }
    return user;
  }
}

export const userService = new UserService();
