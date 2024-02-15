import { OrderEntity, order } from "schemas/order.entity";

let orders: OrderEntity[] = [order];

export default {
  create: (order: OrderEntity): OrderEntity => {
    orders.push(order);
    return order;
  },
};
