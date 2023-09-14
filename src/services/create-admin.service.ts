import { userAdmin } from "../constants";
import { User } from "../models";
import { ICredentials } from "../types";
import { passwordService } from "./password.service";

class CreateAdminService {
  public async create(credential: ICredentials): Promise<any> {
    const hashedPassword = await passwordService.hash(credential.password);

    return await User.create({
      ...userAdmin,
      password: hashedPassword,
    });
  }
}

export const createAdminService = new CreateAdminService();
