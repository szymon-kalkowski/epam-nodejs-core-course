import { UserEntity, user } from "../schemas/user.entity";

let users: UserEntity[] = [user];

export default {
  findById: (id: string): UserEntity | undefined =>
    users.find((user) => user.id === id),
};
