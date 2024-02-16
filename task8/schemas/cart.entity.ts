import { ProductEntity } from "./product.entity";
import Joi from "joi";
import { Schema, model, Types } from "mongoose";

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface CartEntity {
  _id: Types.ObjectId;
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

export interface WriteCartEntity {
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

export const cartItemSchema = Joi.object({
  productId: Joi.string().pattern(new RegExp("^[a-z0-9]{24}$")).required(),
  count: Joi.number().min(0).required(),
});

export interface CartItemBody {
  productId: string;
  count: number;
}

const CartItemSchema = new Schema(
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
  { versionKey: false }
);

const CartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    items: [CartItemSchema],
  },
  { versionKey: false }
);

export const Cart = model("Cart", CartSchema);
export const CartItem = model("CartItem", CartItemSchema);
