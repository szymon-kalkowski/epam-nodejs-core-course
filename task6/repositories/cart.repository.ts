import { CartEntity, CartItemEntity, cart } from "schemas/cart.entity";
import { v4 as uuidv4 } from "uuid";

let carts: CartEntity[] = [cart];

export default {
  findByUserId: (userId: string): CartEntity | undefined =>
    carts.find((cart) => cart.userId === userId),

  save: (cart: CartEntity): CartEntity => {
    const index = carts.findIndex((c) => c.id === cart.id);
    if (index !== -1) {
      carts[index] = cart;
    }

    return cart;
  },

  create: (userId: string): CartEntity => {
    const cart: CartEntity = {
      id: uuidv4(),
      userId,
      isDeleted: false,
      items: [],
    };
    carts.push(cart);

    return cart;
  },
};
