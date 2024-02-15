import { Schema, model, Types } from "mongoose";

export interface ProductEntity {
  _id: Types.ObjectId;
  title: string;
  description: string;
  price: number;
}

export interface WriteProductEntity {
  title: string;
  description: string;
  price: number;
}

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

export const Product = model("Product", ProductSchema);
