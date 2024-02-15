import { UserEntity } from "../schemas/user.entity";
import { User, WriteUserEntity } from "../schemas/user.entity";

export default {
  findAll: (): Promise<UserEntity[]> => User.find({}),
  findById: (id: string): Promise<UserEntity | null> => User.findById(id),
  create: (user: WriteUserEntity): Promise<UserEntity> => User.create(user),
};
