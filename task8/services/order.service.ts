import { WriteOrderEntity } from "schemas/order.entity";
import cartService from "./cart.service";
import orderRepository from "repositories/order.repository";
import userService from "services/user.service";

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
