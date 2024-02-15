import { WriteOrderEntity } from "schemas/order.entity";
import { Order } from "schemas/order.entity";

export default {
  create: (order: WriteOrderEntity) => Order.create(order),
};
