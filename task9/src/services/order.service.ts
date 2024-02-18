import { WriteOrderEntity } from "../schemas/order.entity.js";
import { orderRepository } from "../repositories/index.js";
import { userService, cartService } from "./index.js";

export default {
  createOrder: async (cart: any) => {
    const total = await cartService.getCartTotal(cart);
    const user = await userService.getUser(cart.userId);
    const order: WriteOrderEntity = {
      userId: cart.userId,
      cartId: cart.id,
      items: cart.items,
      payment: {
        type: "paypal",
        address: user.address,
        creditCard: undefined,
      },
      delivery: {
        type: "post",
        address: user.address,
      },
      comments: "",
      status: "created",
      total,
    };

    return orderRepository.create(order);
  },
};
