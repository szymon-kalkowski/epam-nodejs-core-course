import userRepository from "../repositories/user.repository";
import { UserEntity } from "../schemas/user.entity";

export default {
  getUser: (id: string): UserEntity => {
    const user = userRepository.findById(id);
    if (!user) {
      throw new Error("User is not authorized");
    }

    return user;
  },
};
