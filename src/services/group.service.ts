import { ApiError } from "../errors";
import { Group } from "../models/Group.model";
import { IAddGroup, IGroup } from "../types/group.type";

class GroupService {
  public async create({ groupName, orderId }: IAddGroup): Promise<IGroup> {
    const group: IGroup = await Group.findOne({ groupName });

    if (!group) {
      const orderIdArray = [orderId];
      return await Group.create({ groupName, orderId: orderIdArray });
    }

    const isOrderInGroup = group.orderId.find((value) => value === orderId);

    if (isOrderInGroup) {
      throw new ApiError("Order with this id already exist", 409);
    }

    group.orderId.push(orderId);
    return await Group.findOneAndUpdate({ _id: group._id }, group, {
      new: true,
    });
  }

  public async getAll(): Promise<IGroup[]> {
    return await Group.find();
  }

  public async getById(groupId: string): Promise<IGroup> {
    return await this.getOneByIdOrThrow(groupId);
  }

  private async getOneByIdOrThrow(groupId: string): Promise<IGroup> {
    const group = await Group.findById(groupId);

    if (!group) {
      throw new ApiError("user not found", 422);
    }

    return group;
  }
}

export const groupService = new GroupService();
