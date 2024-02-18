import { WriteOrderEntity } from "../schemas/order.entity.js";
import { Order } from "../schemas/order.entity.js";

export default {
  create: (order: WriteOrderEntity) => Order.create(order),
};
