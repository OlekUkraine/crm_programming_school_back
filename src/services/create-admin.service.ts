import { User } from "../models";
import { ICredentials, IUser } from "../types";
import { passwordService } from "./password.service";

class CreateAdminService {
  public async create(credential: ICredentials): Promise<IUser> {
    const hashedPassword = await passwordService.hash(credential.password);

    return await User.create({
      email: credential.email,
      password: hashedPassword,
      is_active: true,
      is_superuser: true,
      is_staff: true,
      last_login: new Date().toISOString(),
    });
  }
}

export const createAdminService = new CreateAdminService();
