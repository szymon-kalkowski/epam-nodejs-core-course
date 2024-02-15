import { CartItemEntity } from "./cart.entity";
import { Schema, model, Types } from "mongoose";

type ORDER_STATUS = "created" | "completed";

export interface OrderEntity {
  _id: Types.ObjectId;
  userId: string;
  cartId: string;
  items: CartItemEntity[];
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: ORDER_STATUS;
  total: number;
}

export interface WriteOrderEntity {
  userId: string;
  cartId: string;
  items: CartItemEntity[];
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: ORDER_STATUS;
  total: number;
}

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartId: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        count: {
          type: Number,
          required: true,
        },
      },
    ],
    payment: {
      type: {
        type: String,
        required: true,
      },
      address: {
        type: String,
      },
      creditCard: {
        type: String,
      },
    },
    delivery: {
      type: {
        type: String,
        required: true,
      },
      address: {
        type: String,
      },
    },
    comments: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["created", "completed"],
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

export const Order = model("Order", OrderSchema);
