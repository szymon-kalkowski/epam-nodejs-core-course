import { UserEntity } from "../schemas/user.entity.js";
import { User, WriteUserEntity } from "../schemas/user.entity.js";

export default {
  findAll: (): Promise<UserEntity[]> => User.find({}),
  findById: (id: string): Promise<UserEntity | null> => User.findById(id),
  findByEmail: (email: string): Promise<UserEntity | null> =>
    User.findOne({ email }),
  create: (user: WriteUserEntity): Promise<UserEntity> => User.create(user),
};
