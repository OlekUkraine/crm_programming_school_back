import { User } from "../models";
import { IUser } from "../types";
import { passwordService } from "./password.service";

class CreateAdminService {
  public async create(): Promise<IUser> {
    const hashedPassword = await passwordService.hash("admin");

    return await User.create({
      email: "admin@gmail.com",
      password: hashedPassword,
      is_active: true,
      is_superuser: true,
      is_staff: true,
      last_login: new Date().toISOString(),
    });
  }
}

export const createAdminService = new CreateAdminService();
