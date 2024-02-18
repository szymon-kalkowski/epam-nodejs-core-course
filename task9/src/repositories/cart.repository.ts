import { CartEntity, WriteCartEntity } from "../schemas/cart.entity.js";
import { Cart } from "../schemas/cart.entity.js";

export default {
  findByUserId: (userId: string): Promise<CartEntity | null> =>
    Cart.findOne({ userId }),

  save: async (cart: CartEntity): Promise<CartEntity> => {
    await Cart.updateOne({ _id: cart._id }, cart);
    return cart;
  },

  create: (cart: WriteCartEntity) => Cart.create(cart),
};
