import userRepository from "../repositories/user.repository";
import { UserEntity, WriteUserEntity } from "../schemas/user.entity";

export default {
  getAllUsers: (): Promise<UserEntity[]> => {
    return userRepository.findAll();
  },
  getUser: (id: string): Promise<UserEntity> => {
    const user = userRepository.findById(id);
    if (!user) {
      throw new Error("User is not authorized");
    }

    return user as Promise<UserEntity>;
  },
  createUser: (user: WriteUserEntity): Promise<UserEntity> => {
    return userRepository.create(user);
  },
};
