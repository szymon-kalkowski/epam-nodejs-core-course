import { CartEntity } from "schemas/cart.entity";
import { OrderEntity } from "schemas/order.entity";
import { v4 as uuidv4 } from "uuid";
import cartService from "./cart.service";
import orderRepository from "repositories/order.repository";

export default {
  createOrder: (cart: CartEntity): OrderEntity => {
    const total = cartService.getCartTotal(cart);
    const order: OrderEntity = {
      id: uuidv4(),
      userId: cart.userId,
      cartId: cart.id,
      items: cart.items,
      payment: {
        type: "paypal",
        address: undefined,
        creditCard: undefined,
      },
      delivery: {
        type: "post",
        address: undefined,
      },
      comments: "",
      status: "created",
      total,
    };

    return orderRepository.create(order);
  },
};
