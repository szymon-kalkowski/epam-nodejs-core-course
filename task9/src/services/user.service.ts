import { userRepository } from "../repositories/index.js";
import { UserEntity, WriteUserEntity } from "../schemas/user.entity.js";

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
  getUserByEmail: (email: string): Promise<UserEntity> =>
    userRepository.findByEmail(email) as Promise<UserEntity>,
  createUser: (user: WriteUserEntity): Promise<UserEntity> => {
    return userRepository.create(user);
  },
};
