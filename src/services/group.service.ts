import { ApiError } from "../errors";
import { Group } from "../models";
import { IAddGroup, IGroup } from "../types";

class GroupService {
  public async create({ groupName }: IAddGroup): Promise<IGroup> {
    try {
      const group: IGroup = await Group.findOne({ groupName });

      if (group) {
        throw new ApiError("Group with this name already exist", 409);
      }

      return await Group.create({ groupName, orderId: [] });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getAll(): Promise<IGroup[]> {
    try {
      return await Group.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(groupId: string): Promise<IGroup> {
    try {
      return await this.getOneByIdOrThrow(groupId);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async addUser(groupId: string, newOrder: string): Promise<IGroup> {
    try {
      const group = await this.getOneByIdOrThrow(groupId);
      const isOrderInGroup = group.orderId.find((value) => value === newOrder);

      if (isOrderInGroup) {
        throw new ApiError("Order with this id already exist", 409);
      }

      group.orderId.push(newOrder);

      return await Group.findOneAndUpdate(
        { _id: groupId },
        { orderId: [...group.orderId] },
        { new: true },
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  private async getOneByIdOrThrow(groupId: string): Promise<IGroup> {
    try {
      const group = await Group.findById(groupId);

      if (!group) {
        throw new ApiError("Group not found", 422);
      }

      return group;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const groupService = new GroupService();
